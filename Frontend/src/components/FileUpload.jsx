import React, { useState } from 'react';
import axios from 'axios';

function FileUpload({getFiles}) {
  const [file, setFile] = useState(null);
  const [code, setCode] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };


  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
console.log(formData)
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      getFiles()

      if (response.status === 200) {
        const data = response.data;
        setCode(data.code);
      } else {
        console.error('Upload failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (  
    <div className='flex justify-center m-16'>
      <form encType='multipart/form-data'>
        <input type='file' onChange={handleFileChange} className='p-2 border-2 rounded-md' placeholder='Upload file' />
        <button type='button' onClick={handleUpload} className='bg-blue-300 hover:bg-blue-400 text-white rounded px-2 mx-1'>
          Upload
        </button>
      </form>
    </div>
  );
}

export default FileUpload;
