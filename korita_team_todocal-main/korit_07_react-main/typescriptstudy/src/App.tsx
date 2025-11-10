import { useState } from "react"

function App() {
  const [ name, setName ] = useState('');
  const handleChange = (event : React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  }

  const handleSubmit = (event : React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    alert(`Hello ${name} 😊`);
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} onChange={handleChange} />
        <input type="submit" value='제출' />
      </form>
    </>
  )
}

export default App