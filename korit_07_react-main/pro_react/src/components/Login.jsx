import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // 🔹 일반 로그인
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id || !password) {
      alert('아이디와 비밀번호를 모두 입력해주세요.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      const data = await response.text();
      if (response.ok) {
        alert(data);
        navigate('/schedule');
      } else {
        alert(data);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 연결에 실패했습니다.');
    }
  };

  // 🔹 비회원 로그인
  const handleGuestLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/belogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (response.ok) {
        alert(
          `✅ 비회원으로 가입되었습니다.\n\n아이디: ${data.id}\n비밀번호: ${data.password}`
        );
        navigate('/schedule');
      } else {
        alert('비회원 로그인에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 연결에 실패했습니다.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>로그인</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="아이디"
            style={styles.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            style={styles.input}
          />
          <button type="submit" style={styles.loginButton}>
            로그인
          </button>
        </form>

        <button onClick={handleGuestLogin} style={styles.guestButton}>
          비회원 로그인
        </button>

        <p style={styles.footerText}>
          계정이 없으신가요?{' '}
          <span style={styles.link} onClick={() => navigate('/signup')}>
            회원가입
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#ffffff',
  },
  card: {
    background: '#fff',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
    width: '350px',
    textAlign: 'center',
  },
  title: { marginBottom: '30px', color: '#333' },
  form: { display: 'flex', flexDirection: 'column' },
  input: {
    padding: '12px 15px',
    marginBottom: '15px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  loginButton: {
    padding: '12px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginBottom: '10px',
  },
  guestButton: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  footerText: { marginTop: '20px', color: '#666' },
  link: { color: '#2575fc', cursor: 'pointer', fontWeight: 'bold' },
};

export default Login;
