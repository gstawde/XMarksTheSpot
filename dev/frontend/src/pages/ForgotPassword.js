import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Button } from "@material-tailwind/react";
import Cookies from 'js-cookie';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get('auth');
  
  const [email, setEmail] = useState("");
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [emailFailure, setEmailFailure] = useState(false);

  if(isAuthenticated) {
    setTimeout(() => {
      navigate('/dashboard');
    }, 0);
    return null;
  } 

  const handleSubmit = (event) => {
    event.preventDefault();

    const userEmail = { email: email };

    fetch("http://xmarksthespot.pythonanywhere.com/api/password/forgot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userEmail)
    })
    .then(response => response.json())
    .then(email => {
      if(email.success) {
        setEmailSuccess(true);
        setEmailFailure(false);
      } else {
        setEmailSuccess(false);
        setEmailFailure(true);
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
                <p className="font-dynaPuff mb-3 text-4xl text-xmts-yellow">Forgot Password?</p>
                <label htmlFor="email" className="text-xmts-tan text-lgfont-medium">Enter the email associated with your account: </label>
                <Input 
                  label="Email" type="email" color="white" required
                  className="w-64 bg-xmts-tan" 
                  onChange={(e) => { setEmail(e.target.value); }} 
                />
                
              
                <div className="flex justify-center">
                  <Button className="font-dynaPuff mt-0 text-xl w-30 h-15 bg-xmts-yellow hover:bg-yellow-500 text-xmts-lightbrown"
                    onClick={ handleSubmit }>Send Email</Button>
                </div>
              </div>
            </form>

            {emailSuccess && 
              <div className="p-4 max-w-sm mx-auto text-sm text-yellow-800 rounded-lg bg-yellow-50" role="alert">
                <span className="font-medium">Email sent! </span> 
                Check your email and follow the instructions in it to continue resetting your password.
              </div>
            }

            {emailFailure && 
              <div className="p-4 max-w-sm mx-auto text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                <span className="font-medium">Email failed to be sent. </span> 
                The email you entered is not associated with any user in our records.
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;