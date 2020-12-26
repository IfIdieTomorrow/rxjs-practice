/**
 * 10초에 한 번 주식 거래를 시작
 *
 * 한 번의 주식 저래에서는 1000번의 API call을 수행한다.
 * 1000번의 API call을 함에 있어서 동시 요청은 10회 이하로 제한한다.
 * 10회의 요청이 끝 날 때마다 5ms휴식을 한다.
 * 1000번의 요청 중에 에러가 발생하면 요청을 다시 시작하되 최대 2번까지 반복한다.
 *
 * 주식 거래를 성공한 뒤에는 10개씩 나누어 결과를 저장하되,
 * 주식 거래 행위에 영향을 주지 않도록 비동기로 저장한다.
 */

const Rx = require("rxjs");
const {
  map,
  mergeAll,
  delay,
  retry,
  mergeMap,
  bufferCount,
  reduce,
} = require("rxjs/operators");
const { default: axios } = require("axios");

function startTrade$(tradeNumber) {
  Rx.range(0, 1000).pipe(
    map(() => apiCall$().pipe(delay(5))),
    mergeAll(10),
    retry(2),
    reduce((accu, data) => {
      return tradeNumber;
    })
  );
}

function apiCall$() {
  return Rx.from(axios.get("https://api.github.com/users"));
}

function saveResult$() {
  /**
   * .... fs.write
   * .... 데이터베이스 입출력
   */
}

Rx.interval(10 * 1000)
  .pipe(
    mergeMap((tradeNumber) => startTrade$(tradeNumber)),
    bufferCount(10),
    mergeMap((results) => saveResult$(results))
  )
  .subscribe();
