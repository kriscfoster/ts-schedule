import { enableScheduling, scheduled } from "../src";

@enableScheduling()
export default class Foo {
  @scheduled(1000)
  bar(): String {
    return 'hi';
  }
}
