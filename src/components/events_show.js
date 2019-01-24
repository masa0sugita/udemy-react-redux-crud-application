import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { getEvent, deleteEvents, putEvent } from '../actions';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

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
          <RaisedButton label="送信" type="submit" style={style} disabled={pristine || submitting || invalid} />
          <RaisedButton label="一覧へ戻る" style={style} containerElement={<Link to="/" />} />
          <RaisedButton label="削除する" style={style} onClick={this.onDeleteClick} />
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
