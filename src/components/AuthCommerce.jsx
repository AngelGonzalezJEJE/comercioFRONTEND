import { useState } from 'react'


export default function AuthToken() {

  const [token, setToken] = useState('')
  const [loginAlert,setLoginAlert] = useState("")


    const fetchData = async (e) => {
      e.preventDefault()
      try {
        const response = await fetch('http://localhost:3000/api/auth/commerce ', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({token}),

        })
        if (!response.ok) {
          const message = await response.text();
          throw new Error(message || "failed  auth")
        }

        const data = await response.json()
        localStorage.setItem('id', data._id)
        localStorage.setItem('cif', data.cif)// this way i can access the current user data and displaythem
        console.log("logged in")
        console.log(data._id)
        console.log(data.cif)
        setLoginAlert(data.cif)
      
      }
      catch (error) {
        console.log(error)
        setLoginAlert(`${error}`)

      }

    }
    return (
      <>
        <div>
          <form onSubmit={fetchData}> 
            <div>
              <label>Token:</label>
              <input type="text" value={token} onChange={(e) => setToken(e.target.value)} />
            </div>
            <button type="submit" >Token Auth</button>
            <div>
              <h2>{loginAlert}</h2>
            </div>
          </form>
        </div>
      </>
    )

  }