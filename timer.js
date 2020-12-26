const Rx = require("rxjs");
const { take } = require("rxjs/operators");

const stream = Rx.timer(3000, 1000);

stream.pipe(take(10)).subscribe({
  next: console.log,
});
