import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postEvents } from '../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class EventsNew extends Component {
  // componentDidMount() {
  //   this.props.readEvents();
  // }
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }
  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error }
    } = field;
    return (
      <TextField
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        fullWidth={true}
      />
    );
  }
  async onSubmit(values) {
    await this.props.postEvents(values);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
    const style = {
      margin: 12,

    }
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
          <div>
            <Field
              label="タイトル"
              name="title"
              type="text"
              component={this.renderField}
            />
          </div>
          <div>
            <Field
              label="本文"
              name="body"
              type="text"
              component={this.renderField}
            />
          </div>
          <RaisedButton label="Submit" type="submit" style={style} disabled={pristine || submitting || invalid} />
          <RaisedButton label="Cancel" style={style} containerElement={<Link to="/" />} />
        </form>
      </React.Fragment>
    );
  }
}

// const mapStateToProps = state => ({ events: state.events });
// const mapDispatchToProps = dispatch = ({
//   increment: () => dispatch(increment()),
//   decrement: () => dispatch(decrement()),
// })
const mapDispatchToProps = { postEvents };
const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'タイトルを入力して下さい';
  if (!values.body) errors.body = '本文を入力して下さい';
  return errors;
};
export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: 'eventNewForm' })(EventsNew));
