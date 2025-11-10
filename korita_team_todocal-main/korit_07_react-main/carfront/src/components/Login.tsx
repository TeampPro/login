import { Button, TextField, Stack, Snackbar } from "@mui/material";
import axios from "axios";
import { ChangeEvent, useState } from "react";
import Carlist from "./Carlist";


type User = {
  username: string;
  password: string;
}
function Login() {
  const [ user, setUser] = useState<User>({
    username: '',
    password: ''
  });

  const [ isAuthenticated, setAuth] = useState(false);
  const [ open, setOpen ] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [event.target.name]: event.target.value});
  }
  const handleLogin = async () => {
    // 일부러 템플릿 리터럴로 안썼다.
    axios.post(import.meta.env.VITE_API_URL + "/login", user, {
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => {
      const jwtToken = response.headers.authorization;
      if(jwtToken !== null) {
        sessionStorage.setItem("jwt", jwtToken);
        setAuth(true);
      }
    })
    .catch(error => {
      console.log(error);
    });
    // axios.post(`${import.meta.env.VITE_API_URL}/api/login`, user, {
    //   headers: {
    //     'Content-Type': 'application/json',}
    //   })
  }
  if(isAuthenticated) {
    return <Carlist />
  }

  else {
    return (
      <Stack spacing={2} alignItems={"center"} mt={5}>
        <TextField
          name="username"
          label="Username"
          onChange={handleChange}
        />
        <TextField
          name="password"
          label="Password"
          type="password"
          onChange={handleChange}
        />
        <Button
        variant="contained"
        color="primary"
        onClick={handleLogin}
        >
          Login
        </Button>
        <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        message="ID 혹은 비밀번호가 틀렸습니다."
        />
      </Stack>
    )
  }

}

export default Login;