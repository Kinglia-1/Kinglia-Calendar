import http from "k6/http";
import { check, sleep } from "k6";
export let options = {
  stages: [
  {target: 2000, duration: "30s"},
]};

export default function() {
  const placeid = Math.floor(Math.random * 9999999)+1;
  http.get(`http://localhost:3001/api/place/${placeid}`);
  sleep(1);
}