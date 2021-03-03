import 'reflect-metadata';
import execute from './execute';
import Scheduled from './interfaces/scheduled';

const scheduledMetadataKey = Symbol('scheduled');

export function enableScheduling() {
  return (target) => {
    const staticScheduled = Reflect.getOwnMetadata(scheduledMetadataKey, target);
    const instanceScheduled = Reflect.getOwnMetadata(scheduledMetadataKey, target.prototype);
    execute(staticScheduled, target);
    execute(instanceScheduled, target);
  };
}

export function scheduled(fixedRate: number, initialDelay: number = 0) {
  return (target, key, _descriptor) => {
    if (typeof target[key] != 'function') {
      throw Error('@scheduled can only be applied to methods');
    }

    const existingScheduled: Array<Scheduled> = Reflect.getOwnMetadata(scheduledMetadataKey, target) || [];
    existingScheduled.push({ fixedRate, initialDelay });
    Reflect.defineMetadata(scheduledMetadataKey, existingScheduled, target);
  };
}
