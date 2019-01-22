import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postEvents } from '../actions';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';

class EventsNew extends Component {
  // componentDidMount() {
  //   this.props.readEvents();
  // }
  constructor(props) {
    super(props)
    this.onSubmit = this.onSubmit.bind(this)
  }
  renderField(field) {
    const { input, label, type, meta: { touched, error } } = field;
    return (
    <div>
      <input {...input} placeholder={label} type={type} />
      { touched && error && <span>{error}</span>}
    </div>)
  };
  async onSubmit(values) {
    await this.props.postEvents(values)
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props
    return (
      <React.Fragment>
        <form onSubmit={handleSubmit(this.onSubmit)}>
        <div>
            <Field label="タイトル" name="title" component="input" type="text" component={this.renderField} />
          </div>
          <div>
            <Field label="本文" name="body" component="input" type="text" component={this.renderField} />
          </div>
          <div>
            <input type="submit" value="Submit" disabled={pristine || submitting} />
            <br />
            <Link to="/">一覧へ戻る</Link>
          </div>
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
  const errors = {}
  if(!values.title) errors.title = "タイトルを入力して下さい";
  if(!values.body) errors.body = "本文を入力して下さい";
  return errors;
}
export default connect(
  null,
  mapDispatchToProps
)(reduxForm({ validate, form: "eventNewForm"})(EventsNew));
