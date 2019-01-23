import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { getEvent, deleteEvents, putEvent } from '../actions';

class EventsShow extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDeleteClick = this.onDeleteClick.bind(this);
  }
  componentDidMount() {
    const {id} = this.props.match.params;
    if (id) this.props.getEvent(id)
  }
  renderField(field) {
    const {
      input,
      label,
      type,
      meta: { touched, error }
    } = field;
    return (
      <div>
        <input {...input} placeholder={label} type={type} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
  async onSubmit(values) {
    await this.props.putEvent(values)
    this.props.history.push('/');
  }
  async onDeleteClick() {
    const { id } = this.props.match.params;
    await this.props.deleteEvents(id);
    this.props.history.push('/');
  }
  render() {
    const { handleSubmit, pristine, submitting, invalid } = this.props;
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
          <div>
            <input
              type="submit"
              value="Submit"
              disabled={pristine || submitting || invalid}
            />
            <br />
            <Link to="/">一覧へ戻る</Link>
            <br />
            <Link to="/" onClick={this.onDeleteClick}>
              削除
            </Link>
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
const mapStateToProps = (state, ownProps) => {
  const event = state.events[ownProps.match.params.id]
  return { initialValues: event, event }
};
const mapDispatchToProps = { deleteEvents, getEvent, putEvent };
const validate = values => {
  const errors = {};
  if (!values.title) errors.title = 'タイトルを入力して下さい';
  if (!values.body) errors.body = '本文を入力して下さい';
  return errors;
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(reduxForm({ validate, form: 'eventShowForm', enableReinitialize: true })(EventsShow));
