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

