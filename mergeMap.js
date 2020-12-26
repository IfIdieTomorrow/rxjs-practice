const Rx = require("rxjs");
const { mergeMap, map, take, mergeAll } = require("rxjs/operators");

// const stream = Rx.from(["택배1", "택배2", "택배3", "택배4"]);
const stream = Rx.interval(1000).pipe(
  take(4),
  map((v) => `택배${v + 1}`)
);

function openBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, "상품 개봉");
      resolve(data);
    }, 2000);
  });
}

function checkBox(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, "상품 검사");
      resolve(data);
    }, 2000);
  });
}

// 프로미스를 반환
function useProduct(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(data, "상품 사용");
      resolve(data);
    }, 2000);
  });
}

async function userTask(data) {
  await openBox(data);
  await checkBox(data);
  await useProduct(data);
}

// mergeMap
// Rx.from(stream)
//   .pipe(mergeMap((data) => Rx.from(userTask(data))))
//   .subscribe();

// mergeAll
const stream1 = Rx.interval(1000).pipe(take(3));
const stream2 = Rx.interval(1000).pipe(take(3));
const stream3 = Rx.interval(1000).pipe(take(3));
const stream4 = Rx.interval(1000).pipe(take(3));
const stream5 = Rx.interval(1000).pipe(take(3));

const stream6 = Rx.of(stream1, stream2, stream3, stream4, stream5);
stream6.pipe(mergeAll(2)).subscribe(console.log);
