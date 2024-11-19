export default function DataPost() {

  const handleClick = () => {
    const body ={
      title: 'title test',
      body: 'post body',
      author: 'Larry K'
    }
    fetch('https://jsonplaceholder.typicode.com/posts',{
      method: 'POST',
      headers: {
        "Content-Type": 'application/json',
      },
      body: JSON.stringify(body)})
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }
  return (
    <>
    <button onClick={handleClick}>Click here to POST</button>
    </>
  )
}




