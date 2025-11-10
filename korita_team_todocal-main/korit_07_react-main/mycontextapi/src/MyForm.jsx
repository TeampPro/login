import { useState } from "react";

function MyForm() {
  const [ text, setText ] = useState('');

  // input field에 입력한 것을 submit하면 날려 보낼 수 있도록 하는 함수 작성
  const handleChange = (event) => {
    setText(event.target.value);
    console.log(text);
  }
  const handleInputChange = (event) => {
    alert(`'${text}' 라고 입력 하셨습니다.`);
    event.preventDefault();
  }
  return (
    <form onSubmit={handleInputChange}>
      <input type="text" onChange={event => setText(event.target.value)} value={text}/>
      <br />
      <input type="submit" value='클릭하세요 😊' />
    </form>
  );
}
export default MyForm