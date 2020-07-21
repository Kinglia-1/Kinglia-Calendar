import http from "k6/http";
import { sleep } from "k6";
export const options = {
  stages: [
    { target: 1600, duration: '1s' },
    { target: 1600, duration: '30s' }
]};

export default function() {
  const placeid = Math.floor(Math.random() * 10000000)+1;
  http.get(`http://localhost:3001/api/place/100`);
  sleep(1);
}