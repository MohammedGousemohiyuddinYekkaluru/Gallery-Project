import React, { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
   
  const [userData, setUserData] = useState([])
  const [index, setIndex] = useState(1)

  const getData = async () => {
    const response = await axios.get(`https://picsum.photos/v2/list?page=${index}&limit=18`)

    setUserData(response.data)
  }

  useEffect(function(){
    getData()
  },[index])

  let printUserData = <h3 className='text-gray-500 text-2xl'>Loading....</h3>

  if(userData.length > 0) {
    printUserData = userData.map((item, idx) => {
      return(
        <a href={item.url} target='_blank'>
          <div  key={idx}>
          <div className='h-45 w-50 bg-white rounded-xl overflow-hidden'>
          <img className='h-full w-full object-cover' src={item.download_url} />
        </div>
        <h2 className='font-bold text-lg'>{item.author}</h2>
        </div>
        </a>
      )
    })
  }


  return (
    <div className='bg-black overflow-auto h-screen p-4 text-white'>

      <div className='flex flex-wrap justify-center gap-4 p-2'>
        {printUserData}
      </div>

      <div className='flex items-center justify-center gap-4'>
        <button
          style={{ opacity: index == 1 ? 0.6 : 1 }}
          onClick={() => {
            if(index > 1){
              setIndex(index - 1)
              setUserData([])
            }
          }}
          className='bg-amber-500 text-black px-5 py-2 rounded cursor-pointer active:scale-95 text-sm font-semibold'>
          Prev
        </button>
        <h1>Page {index}</h1>
        <button 
          onClick={() => {
              setIndex(index + 1)
              setUserData([])
          }}
          className='bg-amber-500 text-black px-5 py-2 rounded cursor-pointer active:scale-95 text-sm font-semibold'>
            Next
        </button>
      </div>
    </div>
  )
}

export default App
