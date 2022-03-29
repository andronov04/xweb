import { RESPONSE_PREPARE } from '../constants';
import { eventEmitter } from './EventApi';

const listener = (event) => {
  if (event.data.type === RESPONSE_PREPARE) {
    eventEmitter.emit(event.data.requestId, event.data.data);
  }
};
if (typeof window !== 'undefined') {
  window.addEventListener('message', listener);
}
