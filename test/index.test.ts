import { enableScheduling, scheduled } from "../src";
import Foo from './foo';

describe('@enableScheduling >', () => {
  test('should enable scheduling for class', () => {
    const foo = new Foo();
    expect(foo).toBeInstanceOf(Foo);
    expect(foo.bar()).toBe('hi');
  });
});

describe('@scheduled >', () => {
  test('should schedule function', () => {

  });
});
