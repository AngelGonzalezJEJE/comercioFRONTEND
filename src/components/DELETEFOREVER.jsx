import {useState} from "react"

export default function DELETE_FOREVER() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [Alert,setAlert] = useState("")

  const handleSubmit = async () => {

    if (!user || !token) {
      setAlert("Missing token information")
      return
    }

    try{
      const response =  await fetch(`http://localhost:3000/api/usuarios/${user._id}?physical=true`, {
        method: 'DELETE',
        headers:{ 
          "Authorization": `Bearer ${token}`
        }
    })
        if (response.ok) {
          setAlert("User Deleted");
        } else {
          setAlert('Error')};
  }
    catch(error){
      console.error(error)
      setAlert("error deleting user")
    }

  }

  return (
    <>
    <div>
      <h3>Delete Account</h3>
      <p>do you reaaaaaaally want to leave?</p>
      <p>{Alert}</p>
      <button onClick={handleSubmit}>Delete Forever</button>
    </div>
    </>
  )
}