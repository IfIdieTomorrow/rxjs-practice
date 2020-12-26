const Rx = require("rxjs");
// stream만들기

// 어레이로부터 만들기 (from)
const deliveries = ["택배1", "택배2", "택배3"];
const stream = Rx.from(deliveries);

stream.subscribe({
  next: (data) => {
    console.log(data);
  },
  complete: () => {
    console.log("작업완료");
  },
  error: (err) => {
    console.log("에러발생");
  },
});

console.clear();

// 프로미스로부터 만들기 (from)
function makePromise() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("delivery");
    }, 3000);
  });
}

Rx.from(makePromise()).subscribe({
  next: (data) => {
    console.log(data);
  },
  complete: () => {
    console.log("작업완료");
  },
});

console.clear();

// 싱글 여러 데이터로부터 만들기 (of)
Rx.of("delivery1", "delivery2", "delivery3", "delivery4").subscribe({
  next: (data) => {
    console.log(data);
  },
  complete: () => {
    console.log("작업완료");
  },
});
