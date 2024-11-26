import { useState } from 'react'


export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginAlert,setLoginAlert] = useState("")


    const fetchData = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch('http://localhost:3000/api/auth/login ', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }),

        })
        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "failed  to login")
        }

        const data = await response.json()
        localStorage.setItem('token', data.token)
        localStorage.setItem("user", JSON.stringify(data.user))// this way i can access the current user data and displaythem
        console.log("logged in")
        console.log(data.token)
        console.log(data.user)
        setLoginAlert("You've Logged in! you bad babyyyy!")
      
      }
      catch (error) {
        console.log(error)
        setLoginAlert(`${error}`)

      }

    }
    return (
      <>
      <h1>Login Form</h1>
        <div>
          <form onSubmit={fetchData}> 
            <div>
              <label>Email:</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label>Password:</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" >Login</button>
            <div>
              <h2>{loginAlert}</h2>
            </div>
          </form>
        </div>
      </>
    )

  }

  