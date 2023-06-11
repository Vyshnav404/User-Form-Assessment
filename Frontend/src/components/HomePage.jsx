import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import FileUpload from './FileUpload'
import FIleCards from './FIleCards'
import axios from 'axios';

function HomePage() {
  const [data, setData] = useState([]);
  const [userId , setUserId] = useState("")
  useEffect(() => {
    const useriId = JSON.parse(localStorage.getItem('user'))?.id;
    setUserId(useriId)
    console.log("user id:", useriId);
  }, []);

  useEffect(()=>{
  getFiles()
  },[userId])
  
  
  const getFiles = async () => {
    try {
      console.log("use-----", userId);
      const response = await axios.get(`http://localhost:8080/api/getdata?userId=${userId}`);
      console.log("file response", response);
      setData(response.data.files);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
<>
<Navbar/>

<FileUpload userId={userId} getFiles={getFiles}/>
<div className='grid grid-cols-4  '>
<FIleCards data={data} getFiles={getFiles} userId={userId}/>
</div>
</>  
  )
}

export default HomePage
