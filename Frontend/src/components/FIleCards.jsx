import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineFolderDownload } from 'react-icons/hi';
import { saveAs } from 'file-saver'

function FileCards({ data, getFiles,userId }) {
 
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
    const [code , setCode] = useState('')

  useEffect(()=>{
    getFiles();
  },[])
  const handleRemove = async (card) => {
    try {
      await axios.delete(`http://localhost:8080/api/delete`, { data: { card , userId} });
      getFiles();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDownload = (card) => {
    console.log(card,"ccccaard");
    setCode(card)
    setSelectedCard(card);
    setShowVerificationPopup(true);
  };

//   const handleVerificationSubmit = async (card) => {
//     if (verificationCode === code) {
//       try {
//         const codes =`http://localhost:8080/${card}`
//         saveAs(codes, '135483.jpg');
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       console.error('Verification failed');
//     }
  
//     // Reset the verification state
//     setShowVerificationPopup(false);
//     setSelectedCard('');
//     setVerificationCode('');
//   };
  
// const handleVerificationSubmit = async (card) => {
//     if (verificationCode === code) {
//       try {
//         const downloadUrl = `http://localhost:8080/api/download/${code}`;
  
//         // Create a temporary anchor element
//         const link = document.createElement('a');
//         link.href = downloadUrl;
//         link.target = '_blank';
//         link.download = card; // Specify the desired filename for the downloaded file
  
//         // Programmatically click the anchor element to initiate the download
//         link.click();
//       } catch (error) {
//         console.error(error);
//       }
//     } else {
//       console.error('Verification failed');
//     }
  
//     // Reset the verification state
//     setShowVerificationPopup(false);
//     setSelectedCard('');
//     setVerificationCode('');
//   };
  
const handleVerificationSubmit = async (card) => {
    const verificationCodeOnly = verificationCode.trim().slice(0, 6); // Trim any whitespace and extract the first 6 digits
    
    if (verificationCodeOnly.length === 6 && /^\d+$/.test(verificationCodeOnly)) {
      try {
        const downloadUrl = `http://localhost:8080/api/download/${card}`;
    
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_blank';
        link.download = `${verificationCodeOnly}.${card.split('.').pop()}`; // Append the code and the original file extension
    
        // Programmatically click the anchor element to initiate the download
        link.click();
      } catch (error) {
        console.error(error);
      }
    } else {
      console.error('Verification failed');
    }
  
    // Reset the verification state
    setShowVerificationPopup(false);
    setSelectedCard('');
    setVerificationCode('');
  };
  

  return (
    <>
      {data?.map((card, i) => (
        <div key={i} className='border rounded flex-col m-4 p-2 flex border-black cursor-pointer duration-300'>
          <img className='w-full rounded hover:scale-95 duration-500    h-80 object-fill ' src={`http://localhost:8080/${card}`} alt={`Image ${i}`} />
          <div className='flex justify-around'>
          <div onClick={() => handleDownload(card)}  className='bg-blue-400 hover:bg-blue-300 duration-300 w-full py-2 flex justify-center mt-2 rounded  px-4 text-white'>
          <HiOutlineFolderDownload size={25} />
            </div> 
            <p className='hover:bg-gray-300 duration-300 py-2 mx-2 px-3 mt-2 rounded'>
  {card.slice(0, 6)}
</p>
            <div  onClick={() => handleRemove(card)}  className='bg-red-500 hover:bg-red-300 duration-300 py-2 flex justify-center w-full  mt-2 rounded  px-4 text-white'>
            <AiOutlineDelete size={25}/>
                </div>
          
                {showVerificationPopup && (
                  <div className='fixed inset-0 flex justify-center items-center  bg-opacity-50'>
                    <div className='bg-white p-4 rounded shadow'>
                      <h2>Enter Verification Code</h2>
                      <input
                        type='text'
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        placeholder='Verification Code'
                        className='border p-2 mt-2'
                      />
                      <button
                        type='submit'
                        onClick={()=>handleVerificationSubmit(card)}
                        className='bg-blue-500 text-white p-2 mt-4 rounded'
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}
          </div>
        </div>
      ))}
    </>
  );
}

export default FileCards;
