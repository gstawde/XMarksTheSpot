import { useState } from "react";
import { Input, Button } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import XMarksLogo from "../assets/XMarksLogo.png";
import Cookies from 'js-cookie';

const LoginPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get('auth');
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(true);
  
  if(isAuthenticated) {
    setTimeout(() => {
      navigate('/dashboard');
    }, 0);
    return null;
  } 

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const user = {
      username: username,
      password: password
    };

    fetch("http://127.0.0.1:4000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user)
    })
    .then(response => response.json())
    .then(login => {
      if(login.success) {
        // Expiration time is in 1 hr from when the user logs in
        const expirationTime = new Date(new Date().getTime() + 3600000);
        Cookies.set('auth', JSON.stringify(user), {expires: expirationTime});
        
        // session storage is better for maintaining auth data for the duration of the usr's session
        //sessionStorage.setItem('auth', JSON.stringify(user));

        console.log("Login successful!");
        setLoginSuccess(true);
        navigate("/dashboard");
      } else {
        console.log("Login failed.", login.message)
        setLoginSuccess(false);
      }
    })
    .catch(error => console.log(error));
    
  };

  return (
    <div className="bg-xmts-darkbrown">
      <div className="flex items-center justify-center h-screen overflow-auto">
        <div className="w-full bg-xmts-darkbrown rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="flex flex-col items-center justify-center px-9 py-8">
            <img src={XMarksLogo} alt="Logo" />
            <form>
              <div className="flex flex-col gap-3">
                <p className="font-dynaPuff mb-3 text-4xl text-xmts-yellow">
                  XMARKS THE SPOT LOGIN!
                </p>
                <Input
                  className="w-64 bg-xmts-tan"
                  type="email"
                  color="white"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  label="Username"
                />
                <Input
                  className="w-64 bg-xmts-tan"
                  type="password"
                  color="white"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  label="Password"
                />

              {!loginSuccess && 
                <div className="p-4 text-sm text-red-800 rounded-lg bg-red-50" role="alert">
                  <span className="font-medium">Login unsuccessful!</span> Incorrect username or password.
                </div>
              }
                <div className="flex justify-center">
                  <Button
                    className="font-dynaPuff mt-0 text-xl w-30 h-15 bg-xmts-yellow hover:bg-yellow-500 text-xmts-lightbrown"
                    onClick={handleSubmit}
                  >
                    Log In
                  </Button>
                </div>
                <div className="flex justify-center">
                  <p className="text-sm font-light text-gray-500 py-3">
                    Don't have an Account?{" "}
                    <a
                      href="/signup"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Sign Up
                    </a>
                    <br></br>
                    <a
                      href="/forgot-password"
                      className="font-medium text-primary-600 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </p>
                  
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
