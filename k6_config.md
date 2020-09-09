## K6 Config

import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  stages: [
    { duration: '8s', target: 200 },
    { duration: '20s', target: 1000 },
    { duration: '10s', target: 100 },
  ]
};

export default function() {
  let res = http.get('http://localhost:2250/reviews');
  check(res, { 'status was 200': r => r.status == 200 });
  sleep(1);
}

## K6 Result


          /\      |‾‾|  /‾‾/  /‾/
     /\  /  \     |  |_/  /  / /
    /  \/    \    |      |  /  ‾‾\
   /          \   |  |‾\  \ | (_) |
  / __________ \  |__|  \__\ \___/ .io

  execution: local
     script: stages.js
     output: -

  scenarios: (100.00%) 1 executors, 1000 max VUs, 1m8s max duration (incl. graceful stop):
           * default: Up to 1000 looping VUs for 38s over 3 stages (gracefulRampDown: 30s, gracefulStop: 30s)


running (1m08.2s), 0000/1000 VUs, 236 complete and 904 interrupted iterations
default ✓ [======================================] 0080/1000 VUs  38s


    ✗ status was 200
     ↳  0% — ✓ 0 / ✗ 241

    checks.....................: 0.00% ✓ 0      ✗ 241
    data_received..............: 42 MB 618 kB/s
    data_sent..................: 99 kB 1.5 kB/s
    http_req_blocked...........: avg=1.1ms    min=4µs      med=572µs  max=40.94ms p(90)=1.64ms p(95)=2.27ms
    http_req_connecting........: avg=701.04µs min=0s       med=361µs  max=36.49ms p(90)=991µs  p(95)=1.31ms
    http_req_duration..........: avg=29.24s   min=328.32ms med=26.92s max=58.76s  p(90)=52.77s p(95)=55.74s
    http_req_receiving.........: avg=1.36ms   min=377µs    med=965µs  max=14.22ms p(90)=1.9ms  p(95)=2.94ms
    http_req_sending...........: avg=245.21µs min=19µs     med=116µs  max=8.92ms  p(90)=347µs  p(95)=687µs
    http_req_tls_handshaking...: avg=0s       min=0s       med=0s     max=0s      p(90)=0s     p(95)=0s
    http_req_waiting...........: avg=29.24s   min=314.26ms med=26.91s max=58.76s  p(90)=52.77s p(95)=55.74s
    http_reqs..................: 241   3.53221/s
    iteration_duration.........: avg=29.63s   min=1.34s    med=27.63s max=58.38s  p(90)=52.77s p(95)=55.53s
    iterations.................: 236   3.458928/s
    vus........................: 101   min=22   max=1000
    vus_max....................: 1000  min=1000 max=1000