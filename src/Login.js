import { useState } from "react"

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

function signInHandler() {
  setMessage("loading...");

  const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
  const emailDomain = email.split("@")[1];

  // ✅ Email length check
  if (email.length < 5 || email.length > 254) {
    setMessage("Email must be between 5 and 254 characters");
    return;
  }

  // ✅ Password length check
  if (password.length < 8 || password.length > 64) {
    setMessage("Password must be between 8 and 64 characters");
    return;
  }

   // ✅ Strong password check using RegEx
 const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%?&])[A-Za-z\d@$!%?&]{8,}$/;

if (!strongPasswordRegex.test(password)) {
  setMessage("Password must contain uppercase, lowercase, number, and special character");
  return;
}

  // ✅ Email domain validation
  if (!allowedDomains.includes(emailDomain)) {
    setMessage("Invalid email domain");
    return;
  }

  // ✅ Credentials check
  if (email === "afrith12@gmail.com" && password === "AFRITHmohammed123@") {
    setTimeout(() => {
      setMessage("Successfully Logged in!");
    }, 3000);
  } else {
    setTimeout(() => {
      setMessage("Invalid credentials");
    }, 3000);
  }
}

    return <div>
        <h1>Login</h1>
        <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value) }  /><br/>
        <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value) }/><br/>
        <button onClick={signInHandler}>Signin</button>
        {message && <p>{message}</p>}
    </div>
}