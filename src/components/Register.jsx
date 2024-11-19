import { useState} from "react"

export default function Register() {

  const [nombre,setNombre] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [edad,setEdad] = useState('')
  const [ciudad,setCiudad] = useState('')
  const [intereses,setIntereses] = useState([])
  const [permiteRecibirOfertas,setPermitirOfertas]= useState(false)
  const [loginAlert,setLoginAlert] = useState("")
  


  const filterItereses = (e) => {

    const value = e.target.value

    setIntereses(value.split('/').map((item) => item.trim()))

  }

  const submit = async (e) => {
    e.preventDefault()

  const formData = {
    nombre,
    email,
    password,
    edad,
    ciudad,
    intereses,
    permiteRecibirOfertas
  }

    try{
      const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify(formData)

      })
      if (!response.ok){
        const message = response.text()
        throw new Error(message || "failed to register")
      }

      const data = await response.json()
      console.log(data)
      localStorage.setItem("token",data.token)
      console.log(data.token)
      setLoginAlert("Welcome to the club b*tch!")
  
    } catch(error){
      console.log(error)
      setLoginAlert(`${error}`)

    }

  }

  return (
    <>
    <div>
      <form onSubmit={submit}>
        <div>
          <label>Name</label>
          <input type="text" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <div>
          <label>Email</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <label>Password</label>
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div>
          <label>Age</label>
          <input type="text" value={edad} onChange={(e) => setEdad(e.target.value)}/>
        </div>
        <div>
          <label>City</label>
          <input type="text" value={ciudad} onChange={(e) => setCiudad(e.target.value)}/>
        </div>
        <div>
          <label>Iterests (seraparate with '/' pls i'm a noob developer)</label>
          <input type="text" value={intereses.join('/ ')} onChange={filterItereses}/>
        </div>
        <div>
          <label>Allow offers from merchants based on your interests???</label>
          <input type="checkbox" checked={permiteRecibirOfertas} onChange={(e)=>setPermitirOfertas(e.target.checked)} />
        </div>
        <button type="submit">Register</button>
      </form>
      <div>
      <h2>{loginAlert}</h2>
      </div>

    </div>
    </>
  )

}