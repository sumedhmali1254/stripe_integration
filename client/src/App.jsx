import axios from 'axios'

function App() {

const buyfunction = async () => {

  let response = await axios.post('http://localhost:3000/buy/payment')

  if(response && response.status === 200 ){

    console.log(response.data)
  }
}



  return (
    <>
      <button onClick={buyfunction}> 
      BUY NOW
      </button>
    </>
  )
}

export default App
