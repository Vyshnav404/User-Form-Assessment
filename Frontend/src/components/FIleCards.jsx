import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlineFolderDownload } from 'react-icons/hi';
import { saveAs } from 'file-saver'

function FileCards({ data, getFiles }) {
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationPopup, setShowVerificationPopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState('');
    const [code , setCode] = useState('')

  useEffect(()=>{
    getFiles();
  },[])
  const handleRemove = async (card) => {
    try {
      console.log(card, 'ddddddddddddddddd');
      await axios.delete(`http://localhost:8080/api/delete`, { data: { card } });
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
  
const handleVerificationSubmit = async (card) => {
    if (verificationCode === code) {
      try {
        const downloadUrl = `http://localhost:8080/api/download/${code}`;
  
        // Create a temporary anchor element
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.target = '_blank';
        link.download = card; // Specify the desired filename for the downloaded file
  
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
        <div key={i} className='border flex-col m-4 p-2 flex border-black cursor-pointer duration-300'>
          <img className='w-full' src={`http://localhost:8080/${card}`} alt={`Image ${i}`} />
          <div className='flex justify-around'>
            <AiOutlineDelete size={25} onClick={() => handleRemove(card)} />
            <p>{card}</p>
            <HiOutlineFolderDownload size={25} onClick={() => handleDownload(card)} />
          
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
