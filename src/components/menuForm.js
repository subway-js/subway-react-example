import React, { Component } from "react";
import { Form, Checkbox } from "semantic-ui-react";

class MenuForm extends Component {
  state = {
    name: "",
    email: "",
    check1: "",
    submittedName: "",
    submittedEmail: ""
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handleSubmit = () => {
    const { name, email, check1 } = this.state;

    this.setState({ submittedName: name, submittedEmail: email, check1 });
  };

  render() {
    const { name, email, check1, submittedName, submittedEmail } = this.state;

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Input
              placeholder="Name"
              name="name"
              value={name}
              onChange={this.handleChange}
            />
            <Form.Input
              placeholder="Email"
              name="email"
              value={email}
              onChange={this.handleChange}
            />
            <Form.Field>
              <Checkbox
                name="check1"
                value={check1}
                onChange={this.handleChange}
                label="I agree to the Terms and Conditions"
              />
            </Form.Field>
            <Form.Button content="Submit" />
          </Form.Group>
        </Form>
        <strong>onChange:</strong>
        <pre>{JSON.stringify({ name, email }, null, 2)}</pre>
        <strong>onSubmit:</strong>
        <pre>{JSON.stringify({ submittedName, submittedEmail }, null, 2)}</pre>
      </div>
    );
  }
}

export default MenuForm;
