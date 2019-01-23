import _ from 'lodash';
import {
  CREATE_EVENTS,
  READ_EVENTS,
  DELETE_EVENTS,
  READ_EVENT,
  UPDATE_EVENT
} from '../actions';

export default (events = {}, action) => {
  // eslint-disable-next-line default-case
  switch (action.type) {
    case READ_EVENTS:
      return _.mapKeys(action.response.data, 'id');

    case DELETE_EVENTS:
      delete events[action.id];
      return { ...events };

    case CREATE_EVENTS:
    case READ_EVENT:
    case UPDATE_EVENT:
      const data = action.response.data;
      return { ...events, [data.id]: data };

    default:
      return events;
  }
};
