import http from "k6/http";
import { sleep } from "k6";
export const options = {
  stages: [
    { duration: '1s', target: 500 },
    { duration: '10s', target: 2000 },
    { duration: '60s', target: 2000 },
]};

export default function() {
  const placeid = Math.floor(Math.random() * 10000000)+1;
  http.get(`http://localhost:3001/api/place/${placeid}`);
  sleep(1);
}