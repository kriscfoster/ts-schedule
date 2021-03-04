import Schedule from './interfaces/schedule';

export default function execute(scheduled: Array<Schedule>, target) {
  if (!Array.isArray(scheduled)) {
    return;
  }

  scheduled.forEach((s: Schedule) => {
    const fn = target[s.key];
    if (s.initialDelay) {
      setTimeout(() => {
        fn.call(target);
        createSchedule(target, s);
      }, s.initialDelay);
    } else {
      createSchedule(target, s);
    }
  });
}

function createSchedule(target, scheduled: Schedule) {
  const fn = target[scheduled.key];
  setInterval(() => {
    fn.call(target);
  }, scheduled.fixedRate);
}
