type HelloProps = {
  name: string;   // 얘넨 Java에서의 field처럼 느껴짐
  age: number;
  fn : () => void;  // 얜 Java에서 method 처럼 보이면 좋겠네.
  fn2? : (msg: string) => void; // 얜 매개변수로 string dat를 받고 return 타입이 없다
}
export default HelloProps ;

// 여기 내에 모든 type들을 다 모아두는 편.