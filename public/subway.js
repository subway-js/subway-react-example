var Subway = (function () {
  'use strict';

  const _aggregateStores = new Map();

  const createAggregate = (aggregateName, initialState = {}) => {
    if (_aggregateStores.has(aggregateName)) {
      throw Error(`Aggregate '${aggregateName}' already exists`);
    }
    _aggregateStores.set(aggregateName, initialState);
  };

  const getAggregateState = aggregateName => {
    if (!aggregateExists(aggregateName)) {
      throw Error(`Aggregate '${aggregateName}' does not exist`);
    }
    return _aggregateStores.get(aggregateName) || {};
  };

  const updateAggregateState = (aggregateName, nextState) => {
    // console.log('TODO', 'implement SAM validation on updateAggregateState?') // TODO
    _aggregateStores.set(aggregateName, nextState);
    if (_aggregateStoreObservers.has(aggregateName)) {
      Array.from(_aggregateStoreObservers.get(aggregateName)).forEach(observer =>
        observer.next({ aggregate: aggregateName, nextState })
      );
    }
  };

  const aggregateExists = aggregateName =>
    _aggregateStores.has(aggregateName);

  const _aggregateStoreObservers = new Map();

  const observeState = aggregateName => next => {
    if (!_aggregateStoreObservers.has(aggregateName)) {
      _aggregateStoreObservers.set(aggregateName, new Set([next]));
    } else {
      _aggregateStoreObservers.get(aggregateName).add(next);
    }
    return {
      currentState: aggregateExists(aggregateName)
        ? _aggregateStores.get(aggregateName)
        : {},
      unsubscribe: () => {
        _aggregateStoreObservers.get(aggregateName).delete(next);
        if (_aggregateObservers.get(aggregateName).size === 0) {
          _aggregateObservers.delete(aggregateName);
        }
      }
    };
  };

  const _topicCommandHandlers = new Map();
  const _topicEventHandlers = new Map();

  const setHandler = (topicHandlersMap, aggregateName) => {
    return (messageType, run, onError = null) => {
      if (!topicHandlersMap.has(aggregateName)) {
        topicHandlersMap.set(aggregateName, new Map());
      }
      // console.log('TODO', 'enforce ONE handler per cmd/evt? NO e.g. logger, or views') // TODO
      if (!topicHandlersMap.get(aggregateName).has(messageType)) {
        topicHandlersMap
          .get(aggregateName)
          .set(messageType, new Set([{ run, onError }]));
      } else {
        topicHandlersMap
          .get(aggregateName)
          .get(messageType)
          .add({ run, onError });
      }

      return () => {
        // TODO identify by ID or something
        _topicCommandHandlers
          .get(aggregateName)
          .get(messageType)
          .delete({ run, onError });
        if (
          _topicCommandHandlers.get(aggregateName).get(messageType).size === 0
        ) {
          _topicCommandHandlers.get(aggregateName).delete(messageType);
        }
      };
    };
  };

  const setCommandHandler = aggregateName => {
    // TODO NO SIDE EFFECTS in command handlers
    return setHandler(_topicCommandHandlers, aggregateName);
  };

  const setEventHandler = aggregateName => {
    return setHandler(_topicEventHandlers, aggregateName);
  };

  const runHandler = (
    isCommand,
    _topicHandlers,
    triggerEvent,
    aggregateName,
    messageType,
    payload
  ) => {
    // console.log('TODO', 'change messageType for ID?') // TODO
    // NOTE command:
    // 1. validate command
    // 2. validate in the current state of the aggregate
    // 3. trigger events
    // 4. store events
    if (_topicHandlers.has(aggregateName)) {
      if (_topicHandlers.get(aggregateName).has(messageType)) {
        // console.log('TODO', 'add MODEL and PRESENT to command handler') // TODO
        // const present = ({ modelProposal }) => {
        // 	_presentState({aggregateName, messageType, modelProposal})
        // }
        const handlers = Array.from(
          _topicHandlers.get(aggregateName).get(messageType)
        );
        handlers.forEach(handler => {
          const topicState = getAggregateState(aggregateName);

          try {
            const { proposal = null, events = null } =
              handler.run(topicState, payload) || {};
            if (isCommand && proposal)
              throw Error("Command cannot change aggregate state");
            // TODO save state if accepted
            // TODO save events in event store?
            // TODO topic name should be TO or FROM?
            proposal && updateAggregateState(aggregateName, proposal);
            setTimeout(() => {
              events &&
                events.forEach(e => triggerEvent(aggregateName, e.id, e.payload));
            }, 0);
          } catch (error) {
            const errorPayload = {
              type: "COMMAND_REJECTED",
              aggregateName,
              messageType,
              error
            };

            if (handler.onError) {
              handler.onError(errorPayload);
            } else {
              throw Error(errorPayload);
            }
          }
        });
      }
    }
  };

  const runCommandHandlers = (
    triggerEvent,
    aggregateName,
    messageType,
    payload
  ) => {
    return runHandler(
      true,
      _topicCommandHandlers,
      triggerEvent,
      aggregateName,
      messageType,
      payload
    );
  };

  const runEventHandlers = (
    triggerEvent,
    aggregateName,
    messageType,
    payload
  ) => {
    return runHandler(
      false,
      _topicEventHandlers,
      triggerEvent,
      aggregateName,
      messageType,
      payload
    );
  };

  const ALL_MESSAGES_CHAR = "*";
  const CMD_TYPE = "Command";
  const EVT_TYPE = "Event";

  const _aggregateObservers$1 = new Map([[ALL_MESSAGES_CHAR, new Set()]]);

  const spy = aggregateName => (
    messageType,
    { next /*, error, complete*/ }
  ) => {
    if (!_aggregateObservers$1.has(aggregateName)) {
      _aggregateObservers$1.set(aggregateName, new Map());
    }
    if (!_aggregateObservers$1.get(aggregateName).has(messageType)) {
      _aggregateObservers$1.get(aggregateName).set(messageType, new Set([next]));
    } else {
      _aggregateObservers$1
        .get(aggregateName)
        .get(messageType)
        .add(next);
    }

    return () => {
      _aggregateObservers$1
        .get(aggregateName)
        .get(messageType)
        .delete(next);
      if (_aggregateObservers$1.get(aggregateName).get(messageType).size === 0) {
        _aggregateObservers$1.get(aggregateName).delete(messageType);
      }
    };
  };

  const _send = (isCommand, aggregateName, messageType, payload) => {
    // TODO inject model and present func
    const sendFn = isCommand ? runCommandHandlers : runEventHandlers;
    sendFn(sendEvent, aggregateName, messageType, payload);
    if (_aggregateObservers$1.has(aggregateName)) {
      if (_aggregateObservers$1.get(aggregateName).has(messageType)) {
        const subscribers = Array.from(
          _aggregateObservers$1.get(aggregateName).get(messageType)
        );
        subscribers.forEach(next => next(payload));
      }

      if (_aggregateObservers$1.get(aggregateName).has(ALL_MESSAGES_CHAR)) {
        const subscribers = Array.from(
          _aggregateObservers$1.get(aggregateName).get(ALL_MESSAGES_CHAR)
        );
        subscribers.forEach(next =>
          next({
            type: isCommand ? CMD_TYPE : EVT_TYPE,
            messageId: messageType,
            payload
          })
        );
      }
    }
  };

  const sendCommand = aggregateName => (messageType, payload) => {
    _send(true, aggregateName, messageType, payload);
  };

  const sendEvent = (aggregateName, messageType, payload) => {
    _send(false, aggregateName, messageType, payload);
  };

  const loadJsScript = (id, src, cb) => {
    const existingScript = document.getElementById(id);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      // document.body.appendChild(script);
      document.getElementsByTagName("head")[0].appendChild(script);

      script.onload = () => {
        if (cb) cb(id);
      };
    }

    if (existingScript && cb) cb(id);
  };

  const injectMicrofrontends = mfArray => {
    mfArray.forEach(({ id, src }) => loadJsScript(id, src));
  };

  const AGGREGATE = {
    MF_ROOT: "MF_ROOT"
  };

  const CMD = {
    CONNECT_MF: "CONNECT_MF"
  };

  const EVT = {
    MF_CONNECTED: "MF_CONNECTED",
    ALL_MFS_CONNECTED: "ALL_MFS_CONNECTED",
    MF_ACK_SENT: mfId => `MF_{mfId}_ACK_SENT`
  };

  let unsubscribeFnsSet = new Set();

  const init = mfConfig => {
    const rootAggregate = createAggregate(AGGREGATE.MF_ROOT, {
      initialized: false,
      loaded: [],
      pending: [...mfConfig.mfs]
    });

    const unsubCmdConnectMf = setCommandHandler(AGGREGATE.MF_ROOT)(
      CMD.CONNECT_MF,
      (topicState, { id }) => {
        if (topicState.initialized)
          throw Error("Microfrontends have already been initialized.");
        if (topicState.loaded.filter(mf => mf.id === id).length > 0)
          throw Error(`Microfrontend "${id}" has already been initialized.`);

        const targetMf = topicState.pending.filter(mf => mf.id === id)[0];
        return {
          events: [{ id: EVT.MF_CONNECTED, payload: targetMf }]
        };
      },
      error => {
        console.log(JSON.stringify(error, undefined, 4));
      }
    );

    unsubscribeFnsSet.add(unsubCmdConnectMf);

    const unsubEvtMfConnected = setEventHandler(AGGREGATE.MF_ROOT)(
      EVT.MF_CONNECTED,
      (topicState, targetMf) => {
        const returnValue = {
          proposal: {
            ...topicState,
            loaded: topicState.loaded.concat(targetMf),
            pending: topicState.pending.filter(mf => mf.id !== targetMf.id)
          }
        };
        if (returnValue.proposal.pending.length === 0) {
          returnValue.events = [{ id: EVT.ALL_MFS_CONNECTED, payload: targetMf }];
        }
        return returnValue;
      },
      error => {
        console.log(JSON.stringify(error, undefined, 4));
      }
    );
    unsubscribeFnsSet.add(unsubEvtMfConnected);

    const unsubEvtMfNotified = setEventHandler(AGGREGATE.MF_ROOT)(
      EVT.ALL_MFS_CONNECTED,
      topicState => {
        let events = [];

        topicState.loaded.forEach(mf => {
          events = events.concat({ id: EVT.MF_ACK_SENT(mf.id), payload: mf });
        });

        // TODO Array.from(unsubscribeFnsSet).forEach(fn => fn())
        unsubscribeFnsSet = null;

        return {
          proposal: {
            ...topicState,
            initialized: true
          },
          events
        };
      },
      error => {
        console.log(JSON.stringify(error, undefined, 4));
      }
    );
    unsubscribeFnsSet.add(unsubEvtMfNotified);

    injectMicrofrontends([...mfConfig.mfs].filter(mf => mf.src));
  };

  const connect = (microFrontendId, onConnected) => {
    const unsubscribe = spy(AGGREGATE.MF_ROOT)(EVT.MF_ACK_SENT(microFrontendId), {
      next: payload => {
        // TODO unsubscribe();
        onConnected(payload);
      }
    });

    sendCommand(AGGREGATE.MF_ROOT)(CMD.CONNECT_MF, { id: microFrontendId });
  };

  const getApi = aggregateName => ({
    spy: spy(aggregateName),
    // TODO return state on first subscribe
    observeState: observeState(aggregateName),
    sendCommand: sendCommand(aggregateName),
    setCommandHandler: setCommandHandler(aggregateName),
    setEventHandler: setEventHandler(aggregateName)
  });

  const selectAggregate = aggregateName => {
    if (!aggregateExists(aggregateName)) {
      throw Error(`Topic '${aggregateName}' does not exist`);
    }
    return {
      ...getApi(aggregateName)
    };
  };

  const createAggregate$1 = (aggregateName, model = {}) => {
    createAggregate(aggregateName, model);
    return {
      ...getApi(aggregateName)
    };
  };

  const Subway = {
    createAggregate: createAggregate$1,
    selectAggregate,
    helpers: {
      composeMicroFrontends: init,
      installMicroFrontend: connect
    }
  };

  return Subway;

}());
