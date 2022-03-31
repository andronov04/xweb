import { EventEmitter } from 'events';
import { waitUntil } from 'async-wait-until';

export const eventEmitter = new EventEmitter();

export const eventOnceWaitFor = async (eventName: string, options?: any) => {
  let dt;
  eventEmitter.once(eventName, (data) => {
    dt = data;
  });
  return await waitUntil(
    // Here, we specify a function that will be repeatedly called from time to time
    // Let's call this kind of function a `predicate`
    () => dt,
    // Here, we can specify a timeout in milliseconds. Once it passes,
    // we'll stop waiting and throw an exception
    { timeout: options?.timeout ?? 10000 }
  );
};
