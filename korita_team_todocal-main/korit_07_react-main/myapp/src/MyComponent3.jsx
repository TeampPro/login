import { useState } from "react";

function MyComponent3() {
  const [ count, setCount ] = useState(0);
  const [ count2, setCount2 ] = useState(0);
  return (
  <>
    <p> 현재 값: {count} ⭐ {count2} </p>
    <button onClick={() => setCount(count + 1)}> 증가 </button>
  </>
)
}
export default MyComponent3