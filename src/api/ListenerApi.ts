import { MOULDER_CMD_RESPONSE_CAPTURE, MOULDER_CMD_STATUS, RESPONSE_PREPARE, USE_RESPONSE_CAPTURE } from '../constants';
import { eventEmitter } from './EventApi';

const listener = (event) => {
  // if (event.data.type === RESPONSE_PREPARE || event.data.type === USE_RESPONSE_CAPTURE) {
  //   eventEmitter.emit(event.data.requestId, event.data.data);
  // }
  if (event.data.type === MOULDER_CMD_RESPONSE_CAPTURE) {
    eventEmitter.emit(MOULDER_CMD_RESPONSE_CAPTURE, event.data.data);
  }
  if (event.data.type === MOULDER_CMD_STATUS) {
    eventEmitter.emit(MOULDER_CMD_STATUS, event.data.data);
  }
};
// TODO init once
if (typeof window !== 'undefined') {
  if (!window.CONTTER_LISTENER_SETUP) {
    window.CONTTER_LISTENER_SETUP = true;
    window.addEventListener('message', listener);
  }
}
