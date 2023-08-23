import React from 'react';
import './index.css';
import { useState} from 'react';
import { useNavigate } from "react-router-dom";

function Signup({ onDataFromChild } :any) {
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInputValue1] = useState('');
    const [inputValue2, setInputValue2] = useState('');
    const [id,setId] = useState(11);

    const handleInputChange = (event: any) => {
      setInputValue(event.target.value);
    };
  
    const handleInputChange1 = (event: any) => {
      setInputValue1(event.target.value);
    };

    const handleInputChange2 = (event: any) => {
        setInputValue2(event.target.value);
      };
  
    const users :any[]= [];
    const navigate = useNavigate();
  
    const GotoLogin = () => {

        (prevState :any) =>
        {
            setId(prevState+1);
        }

        if(inputValue !== '' && inputValue1 !== '' && inputValue2 !== '')
        {
            users.push({userId:id, username:inputValue, email: inputValue1, password:inputValue2 });
            onDataFromChild(users);
            navigate("/");
        }

        else{
            alert("Invalid Credentials");
        }
    };
  
    return (
      <div className='main'>
        <p>Sign Up</p>
        <div className='boxp'>
          <div className='box'>
            <form>
              <input type="text" placeholder="Username" value={inputValue} onChange={handleInputChange} />
              <div className='space'></div>
              <input type="text" placeholder="Email" value={inputValue1} onChange={handleInputChange1} />
              <div className='space'></div>
              <input type="Password" placeholder="Password" value={inputValue2} onChange={handleInputChange2}/>
              <br />
              <button className='btn2' onClick={GotoLogin}>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    )
  }

  export default Signup;
  