const Rx = require("rxjs");
const { take, tap, filter, map, reduce } = require("rxjs/operators");

const stream = Rx.from([1, 2, 3, 4]);

// 알 수 있는 점 stream에서 받아온 값을 pipe함수 안에서
// operator를 사용하여 값을 추출, 변환하게 되면 다음 함수에 영향을 끼친다.

// tap
// 데이터를 전달받을 때 마다 특정 로직을 실행
stream
  .pipe(
    tap((data) => {
      console.log("한 번 읽었음. " + data);
    }),
    tap((data) => {
      console.log("두 번 읽었음. " + data);
    })
  )
  .subscribe({
    next: () => {},
  });

console.clear();

// filter
// 받은 데이터 중 조건에 부합하는 데이터만 추출
stream
  .pipe(
    filter((data) => data > 1),
    filter((data) => data < 4)
  )
  .subscribe(console.log);

console.clear();

// map
// 전달받은 데이터를 원하는 데이터로 변환
stream
  .pipe(
    map((data) => data * 2),
    map((data) => data * 2)
  )
  .subscribe(console.log);

console.clear();

// reduce
// 데이터가 올 때마다 전 데이터에 그 데이터를 더함
stream
  .pipe(
    reduce((accu, data) => {
      return accu + data;
    })
  )
  .subscribe(console.log);
