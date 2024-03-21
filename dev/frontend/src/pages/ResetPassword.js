import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Button } from "@material-tailwind/react";
import Cookies from 'js-cookie';

const ResetPassword = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get('auth');
  
  const queryParameters = new URLSearchParams(window.location.search)
  const token = queryParameters.get("token")
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [resetSuccess, setResetSuccess] = useState(false);
  const [resetFailure, setResetFailure] = useState(false);

  if(isAuthenticated) {
    setTimeout(() => {
      navigate('/dashboard');
    }, 0);
    return null;
  } 

  const handleSubmit = (event) => {
    event.preventDefault();

    const resetData = {
      token: token, 
      password: password 
    };

    fetch("http://127.0.0.1:4000/password/reset", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(resetData)
    })
    .then(response => response.json())
    .then(reset => {
      if(reset.success) {
        setMessage(reset.message);
        setResetSuccess(true);
        setResetFailure(false);
        
        setTimeout(() => {
          window.location.href = "/login";
        }, 5000);
      } else {
        setResetSuccess(false);
        setResetFailure(true);
      }
    })
    .catch(error => console.log(error));
  };

  return (
    <div className="bg-xmts-darkbrown">
      <div className="flex items-center justify-center h-screen overflow-auto">
        <div className="w-full bg-xmts-darkbrown rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="flex flex-col items-center justify-center px-9 py-8">
            <form>
              <div className="flex flex-col gap-3">
                <p className="font-dynaPuff mb-3 text-4xl text-xmts-yellow">Reset Password</p>
                <label htmlFor="email" className="text-xmts-tan text-lgfont-medium">Enter your new password: </label>
                <Input 
                  label="Password" type="password" color="white" required
                  className="w-64 bg-xmts-tan" 
                  onChange={(e) => { setPassword(e.target.value); }} 
                />
                
              
                <div className="flex justify-center">
                  <Button className="font-dynaPuff mt-0 text-xl w-30 h-15 bg-xmts-yellow hover:bg-yellow-500 text-xmts-lightbrown"
                    onClick={ handleSubmit }>Reset Password</Button>
                </div>
              </div>
            </form>

            {resetSuccess && 
              <div className="p-4 max-w-sm mx-auto text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
                <span className="font-medium">{ message } </span> 
                Redirecting you to the login page . . . 
              </div>
            }

            {resetFailure && 
              <div className="p-4 max-w-sm mx-auto text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Password failed to be reset. </span> 
                { message }
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword;