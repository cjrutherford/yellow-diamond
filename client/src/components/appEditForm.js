import React, { Component } from 'react';

import { Form, Input, InputGroup, Label, Button } from 'reactstrap';
import { connect } from 'react-redux';

import { updateApplication, selectApplication } from '../actions/app';

class AppEditForm extends Component {
  constructor() {
    super();
    this.state = {
      appName: '',
      appDescription: '',
      redirectURL: '',
      appBanner: '',
      appIcon: '',
    };

    this.onChange = this.onChange.bind(this);
    this.resetForm = this.resetForm.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  componentWillReceiveProps(nextProps, state) {
    console.log(`New Props: ${nextProps}`);
    console.dir(nextProps);
    const {
      appName,
      appDescription,
      redirectURL,
      appBanner,
      appIcon,
    } = nextProps.app;
    this.setState({
      appName,
      appDescription,
      redirectURL,
      appBanner,
      appIcon,
    });
  }

  onChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  resetForm(e) {
    e.preventDefault();
    this.setState({
      appName: this.props.appName || '',
      appDescription: this.props.appDescription || '',
      redirectURL: this.props.redirectURL || '',
      appBanner: this.props.appBanner || '',
      appIcon: this.props.appIcon || '',
    });
  }

  submitForm(e) {
    e.preventDefault();
    const app = { ...this.state };

    this.props.updateApplication(app);
  }

  render() {
    const previewStyle = {
      height: '400px',
      width: '400px',
    };
    console.log(this.props);
    const { id } = this.props;
    return (
      <Form
        className="container"
        style={{
          display: 'grid',
          gridHeight: '5em',
          gridTemplateColumns: 'repeat(4,1fr)',
          gridSpacing: '1em',
        }}>
        <InputGroup>
          <Label for="appName">App Name:</Label>
          <Input name="appName" type="text" onChange={this.onChange} />
        </InputGroup>
        <InputGroup>
          <Label for="appDescription">App Description:</Label>
          <Input
            name="appDescription"
            type="textarea"
            onChange={this.onChange}
          />
        </InputGroup>

        <InputGroup>
          <Label for="redirectURL">RedirectURL:</Label>
          <Input name="redirectURL" type="text" onChange={this.onChange} />
        </InputGroup>
        <InputGroup />
        <InputGroup>
          <Label for="appIcon">App Icon:</Label>
          <Input name="appIcon" type="text" onChange={this.onChange} />
          <caption>Links will Preview Automatically. (Preferred)</caption>
        </InputGroup>
        <InputGroup>
          <img
            src={this.state.appIcon}
            alt="application icon"
            className="img-thumbnail"
            style={previewStyle}
          />
        </InputGroup>

        <InputGroup>
          <Label for="appBanner">App Banner:</Label>
          <Input name="appBanner" type="text" onChange={this.onChange} />
          <caption>Links will Preview Automatically. (Preferred)</caption>
        </InputGroup>
        <InputGroup>
          <img
            src={this.state.appBanner}
            alt="applcaion banner"
            className="img-thumbnail"
            style={previewStyle}
          />
        </InputGroup>
        <InputGroup>
          <Button onClick={this.resetForm} className="warn">
            Reset
          </Button>
          <Button onClick={this.submitForm} className="primary">
            Submit
          </Button>
        </InputGroup>
      </Form>
    );
  }
}

const mapState = state => ({
  app: state.apps.selectedApp,
});

export default connect(
  mapState,
  { updateApplication, selectApplication },
)(AppEditForm);
