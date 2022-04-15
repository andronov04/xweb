import { RESPONSE_PREPARE, USE_RESPONSE_CAPTURE } from '../constants';
import { eventEmitter } from './EventApi';

const listener = (event) => {
  if (event.data.type === RESPONSE_PREPARE || event.data.type === USE_RESPONSE_CAPTURE) {
    eventEmitter.emit(event.data.requestId, event.data.data);
  }
};
if (typeof window !== 'undefined') {
  window.addEventListener('message', listener);
}
