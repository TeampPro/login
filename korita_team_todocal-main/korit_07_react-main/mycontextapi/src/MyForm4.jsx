import { useState } from "react";

function MyForm4() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  // 잘 생각해보면 alert을 띄우는건 학습 상황이라 그렇지 실제 얘가 하는 역할은 form 태그의 preventDefault()를 쓰기 위해서에 가깝다.
  const handleSubmit = (event) => {
    alert(`Hello ${firstName} ${lastName}`);
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>First Name : </label>
      <input type="text"  onChange={event => setFirstName(event.target.value)} />
      <br />
      <label>Last Name : </label>
      <input type="text" onChange={event => setLastName(event.target.value)} />
      <br />
      <label>Email : </label>
      <input type="email" onChange={event => setEmail(event.target.value)} />
      <br />
      <input type="submit" />
    </form>
  );
}
export default MyForm4