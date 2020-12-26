const Rx = require("rxjs");
const { take } = require("rxjs/operators");

const stream1 = Rx.from([1, 2, 3, 4, 5]);
const stream2 = Rx.from([6, 7, 8, 9, 10]);

const stream3 = Rx.interval(1000).pipe(take(2));
const stream4 = Rx.interval(1000).pipe(take(2));

// merge 병합하다.
Rx.merge(stream3, stream3).subscribe({
  next: console.log,
});
