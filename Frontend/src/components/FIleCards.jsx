import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from "react-icons/ai";


function FileCards({data,getFiles}) {
//   const [data, setData] = useState([]);

//   const getFiles = async () => {
//     try {
//       const response = await axios.get('http://localhost:8080/api/getdata');
//       console.log("file response", response);
//       setData(response.data.files);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  const handleRemove = async(card)=>{
    try {
        console.log(card , "ddddddddddddddddd")
        await axios.delete(`http://localhost:8080/api/delete`,{ data: { card } })
        getFiles()
    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    getFiles();
  }, []);
  console.log(data)

  return (
    <>
      {data?.map((card, i) => (
        <div key={i} className='border flex-col  m-4 p-2 flex border-black cursor-pointer duration-300'>
          <img className='w-full' src={`http://localhost:8080/${card}`} alt={`Image ${i}`} />
        <div className=''>
        <AiOutlineDelete size={25} onClick={()=>handleRemove(card)}/>

        </div>
        </div>
      ))}
    </>
  );
}

export default FileCards;
