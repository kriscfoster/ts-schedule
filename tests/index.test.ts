import { enableScheduling, scheduled } from "../src";

describe('@enableScheduling >', () => {
  test('should enable scheduling for class', () => {
    expect(enableScheduling()).toBe(1);
  });
});

describe('@scheduled >', () => {
  test('should schedule function', () => {
    expect(scheduled()).toBe(2);
  });
});
