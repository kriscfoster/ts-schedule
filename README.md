# ts-schedule

| Statements                  | Branches                | Functions                 | Lines                |
| --------------------------- | ----------------------- | ------------------------- | -------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-90.24%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-80%25-yellow.svg) | ![Functions](https://img.shields.io/badge/Coverage-92.86%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-89.74%25-yellow.svg)    |

Allows scheduling functionality in TypeScript using decorators.

`npm install ts-schedule`

```ts
@enableScheduling()
class Foo {
  @scheduled(1000) // bar1 will run every 1000ms
  bar1() {
    console.log('bar1');
  }

  @scheduled(1000, 5000) // bar2 will run every 1000ms after an intial 5000ms delay
  bar2() {
    console.log('bar2');
  }
}

new Foo();
```

Output
```
bar1
bar1
bar1
bar1
bar2
bar1
bar2
bar1
```
