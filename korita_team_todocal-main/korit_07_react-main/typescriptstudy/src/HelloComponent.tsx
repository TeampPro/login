import  HelloProps  from "./types/types"
function HelloComponent({name, age} : HelloProps) {    // 이건 객체 구조분해 봐야함.
  return (
    <>
      Hello, {name}, you are {age} years old
    </>
  )
}

export default HelloComponent