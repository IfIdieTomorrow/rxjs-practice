const Rx = require("rxjs");
const { take, filter, map } = require("rxjs/operators");

const stream1 = Rx.from([1, 2, 3, 4, 5]);
const stream2 = Rx.from([6, 7, 8, 9, 10]);
const num = [];
// concat 이어 붙이다.
Rx.concat(stream1, stream2)
  .pipe(
    filter((v) => {
      if (v % 2 == 0) {
        return v;
      }
    })
  )
  .subscribe({
    next: console.log,
  });
