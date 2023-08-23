import React from 'react';
import './index.css';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";


function Login({data , onDataFromChild} :any ) {
    const [inputValue, setInputValue] = useState('');
    const [inputValue1, setInputValue1] = useState('');
    const [userlog, setuserLog] = useState <any[]>([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
          .then(response => response.json())
          .then(data => setuserLog(data))
          .catch(error => console.error('Error fetching data:', error));
      }, []);

      const users :any[]= [];   

      let i = 0;
      let k = 0;
      let m = 0;

      userlog.map((user) => {
        while(i < 1)
        {
          m++;
          users.push({ userId: user.userId, username: 'user' + m, password: 'user' + 
          m + m });
          i++;  
          k++;
        }

          k++
          if(k === 11)
          {
            i = 0;
            k = 0;
          }
        
      });

      users.push(data[0]);

    const handleInputChange = (event: any) => {
      setInputValue(event.target.value);
    };
  
    const handleInputChange1 = (event: any) => {
      setInputValue1(event.target.value);
    };
  
    const navigate = useNavigate();
  
    const Gotosignup = () => {
      navigate("/Signup");
    };
  
    const navigate1 = useNavigate();
    const Gotoposts = () => {
        let i = 1;
        let j = 1;
    if(inputValue !== '' && inputValue1 === '')
    {
        alert("Please, Enter your Password");
    }

    else if(inputValue === '' && inputValue1 !== '')
    {
        alert("Please, Enter your UserName");
    }
   
    else if(inputValue !== '' && inputValue1 !== '')
    {
        users.map((user)=>{
          if(user !== undefined)
          {
            if(user.username === inputValue && user.password === inputValue1)
            {
                navigate1("/PostList");     
                onDataFromChild(user); 
            }
            else if(user.username === inputValue && user.password !== inputValue1)
            {
               i = 2;
                return;
            }
            else if(user.password === inputValue1 && user.username !== inputValue)
            {
                j = 2;
                return;
            }
          }
        })

        if(i == 2)
        {
            alert("Incorrect Password");
        }
    
        if(j == 2)
        {
            alert("Incorrect Username");
        }
    }

    else
    {
        alert("Please, Login to Continue");
    }

    };

    
  
    return (
      <div className='main'>
        <p>Login</p>
        <div className='boxp'>
          <div className='box'>
            <form>
              <input type="text" id="User" placeholder="Username" value={inputValue} onChange={handleInputChange} />
              <div className='space'></div>
              <input type="Password" id = "Pass" placeholder="Password" value={inputValue1} onChange={handleInputChange1} />
              <br />
              <button className='btn' onClick={Gotoposts}>Login</button>
            </form>
            <p>Dont Have an Account Yet? <button className='btn1' onClick={Gotosignup} >Sign Up</button></p>
          </div>
        </div>
      </div>
    )
  }

  export default Login;