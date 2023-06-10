import React, { useState } from 'react'
import Navbar from './Navbar'
import FileUpload from './FileUpload'
import FIleCards from './FIleCards'
import axios from 'axios';

function HomePage() {
  const [data, setData] = useState([]);

  const getFiles = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/getdata');
      console.log("file response", response);
      setData(response.data.files);
    } catch (error) {
      console.error(error);
    }
  };

  return (
<>
<Navbar/>

<FileUpload getFiles={getFiles}/>
<div className='grid grid-cols-4  '>
<FIleCards data={data} getFiles={getFiles}/>
</div>
</>  
  )
}

export default HomePage
