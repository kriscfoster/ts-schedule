import 'reflect-metadata';
import execute from './execute';
import Schedule from './interfaces/schedule';

const scheduledMetadataKey = Symbol('scheduled');

export function enableScheduling() {
  return (target) => {
    const instanceScheduled = Reflect.getOwnMetadata(scheduledMetadataKey, target.prototype);
    const fn = (Function('f', `return function ${target.name}(){ return f.apply(this, arguments) }`))(function () {
      target.apply(this, arguments);
      execute(instanceScheduled, this);
    });

    Object.assign(fn, target)
    fn.prototype = target.prototype;
    copyMetadata(target, fn);
    return fn;
  };
}

function copyMetadata(from, to): void {
  const metadataKeys = Reflect.getMetadataKeys(from);
  metadataKeys.forEach((metadataKey) => {
    const metadata = Reflect.getOwnMetadata(metadataKey, from);
    Reflect.defineMetadata(metadataKey, metadata, to);
  });
}

export function scheduled(fixedRate: number, initialDelay: number = 0) {
  return (target, key, _descriptor) => {
    if (typeof target[key] != 'function') {
      throw Error('@scheduled can only be applied to methods');
    }

    const existingScheduled: Array<Schedule> = Reflect.getOwnMetadata(scheduledMetadataKey, target) || [];
    existingScheduled.push({ key, fixedRate, initialDelay });
    Reflect.defineMetadata(scheduledMetadataKey, existingScheduled, target);
  };
}
