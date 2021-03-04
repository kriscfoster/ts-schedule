import { enableScheduling, scheduled } from '../src';
import { pause } from './testUtils';


test('should enable scheduling for class', async() => {
  @enableScheduling()
  class Foo {
    timesExecuted = 0;

    @scheduled(1000)
    bar() {
      this.timesExecuted += 1;
    }
  }

  const foo = new Foo();
  expect(foo).toBeInstanceOf(Foo);
  expect(foo.timesExecuted).toBe(0);
  await pause(1100);
  expect(foo.timesExecuted).toBe(1);
  await pause(1100);
  expect(foo.timesExecuted).toBe(2);
});

test('should enable scheduling for class with initialDelay', async() => {
  @enableScheduling()
  class Foo {
    timesExecuted = 0;

    @scheduled(1000, 2000)
    bar() {
      this.timesExecuted += 1;
    }
  }

  const foo = new Foo();
  expect(foo).toBeInstanceOf(Foo);
  expect(foo.timesExecuted).toBe(0);
  await pause(1100);
  expect(foo.timesExecuted).toBe(0);
  await pause(1500);
  expect(foo.timesExecuted).toBe(1);
});
