const Rx = require("rxjs");

const { take } = require("rxjs/operators");

const stream = Rx.interval(1000);

// take operator는 스트림에서 흘러오는 데이터 중 원하는 개수만 받겠다.
stream.pipe(take(2)).subscribe({
  next: (data) => {
    console.log(data);
  },
});
