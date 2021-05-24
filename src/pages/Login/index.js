import { useState } from 'react'
import { useHistory } from 'react-router-dom'

import './style.css'
import api from '../../service/api'

const Login = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log({ username, password })

    try {
      const { data } = await api.post("/authenticate", { username, password });

      const { token } = data;

      localStorage.setItem("@events-npds/token", token);

      history.push("/home");

    } catch (e) {
      console.log({ username, password })
      setPassword("")
      alert(e.response.data.message)

    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>Username</label>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  )
}

export default Login;