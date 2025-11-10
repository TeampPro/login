function MyForm2() {
  // Form이 제출될 때 호출될 수 있도록 작성

  const handleSubmit = (event) => {
    event.preventDefault(); // md파일에서 작성한 기본 동작 방지 메서드
    // 그럼 onSubmit에 딸려있는 default는 양식 제출이다. -> DB나 백엔드로
    alert('제출 시에 나오는 경고창 입니다.')
  }
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input type="submit" value="제출!" />
      </form>
    </>
  );
}
export default MyForm2