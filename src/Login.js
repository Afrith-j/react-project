
import { useState } from "react";
import config from "./config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function signInHandler() {
    setMessage(config.messages.loading);

    const emailDomain = email.split("@")[1];

    if (email.length < 5 || email.length > 254) {
      setMessage(config.messages.emailLength);
      return;
    }

    if (password.length < 8 || password.length > 64) {
      setMessage(config.messages.passwordLength);
      return;
    }

    if (!config.passwordRegex.test(password)) {
      setMessage(config.messages.passwordStrength);
      return;
    }

    if (!config.allowedDomains.includes(emailDomain)) {
      setMessage(config.messages.invalidDomain);
      return;
    }

    if (email === config.credentials.email && password === config.credentials.password) {
      setTimeout(() => setMessage(config.messages.success), 3000);
    } else {
      setTimeout(() => setMessage(config.messages.invalid), 3000);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      /><br />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      /><br />
      <button onClick={signInHandler}>Signin</button>
      {message && <p>{message}</p>}
    </div>
  );
}