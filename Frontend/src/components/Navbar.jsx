import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const [userToken, setUserToken] = useState("");
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("user");
    setUserToken(JSON.parse(token));
  }, []); 

  const handleLogout = ()=>{
    localStorage.removeItem("user")
    navigate("login")
  }
  return (
    <div className='flex justify-around bg-blue-100 py-6'>
      <div>
        {userToken && <h1 className='text-black font-bold'>{userToken.username}</h1>}
      </div>
      <div>
        <button onClick={handleLogout} className=' border bg-white p-2 rounded-lg hover:bg-blue-200 font-medium hover:scale-100    duration-300 ease-in-out ' >Logout</button>
      </div>
    </div>
  );
}

export default Navbar;
