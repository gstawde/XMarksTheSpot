import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Input, Button } from "@material-tailwind/react";
import XMarksLogo from "../assets/XMarksLogo.png";
import Cookies from 'js-cookie';

const SignupPage = () => {
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get('auth');
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPW, setConfirmPW] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPW, setShowConfirmPW] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  if(isAuthenticated) {
    setTimeout(() => {
      navigate('/dashboard');
    }, 0);
    return null;
  } 

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPW(!showConfirmPW);
  };

  const validatePassword = (e) => {
    const pw = e.target.value;
    console.log(pw);
    setPassword(pw);

    const passwordRegex = /^.{8,}$/;

    console.log(passwordRegex.test(pw));
    if (!passwordRegex.test(pw)) {
      setPasswordError(true);
    } else {
      setPasswordError(false);
    }
  };

  const confirmPassword = (e) => {
    const pw = e.target.value;
    setConfirmPW(pw);
    console.log(password, confirmPW);

    if (pw !== password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPasswordError(false);
      setPasswordsMatch(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (firstName.trim() === '' || lastName.trim() === '' || username.trim() === '' || email.trim() ==='' || password.trim() === '') {
      setError(true);
      setErrorMessage(["Check your information again!", "Make sure all the required information is filled out."]);
      return;
    } else if (password.length + 1 <= 8) {
      setError(true);
      setErrorMessage(["Check your information again!", "Password must be at least 8 characters."]);
      return;
    } else if (confirmPW !== password) {
      setPasswordsMatch(false);
      setError(true);
      setErrorMessage(["Check your information again!", "Inputted passwords do not match."]);
      return;
    } else {
      setError(false);
      setPasswordsMatch(true);

      const newAccount = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      };

      fetch("http://127.0.0.1:4000/users/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      })
      .then((response) => response.json())
      .then((account) => {
        if (account.success) {
          setError(false);
          navigate("/login");
        } else {
          setError(true);
          setErrorMessage(["Registration Failed!", account.message]);
        }
      })
      .catch((error) => console.log(error));
    }
  };

  return (
    <div className="bg-xmts-darkbrown flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 overflow-auto">
      <div className="w-full md:mt-0 sm:max-w-md xl:p-0 overflow-auto">
        
        <div className="flex justify-center h-24">
          <img className="max-h-full w-auto" src={XMarksLogo} alt="Image Logo" />
        </div>

        <h1 className="text-xmts-yellow text-5xl text-center">
          Let's Get to Know You a Bit!
        </h1>
        
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form className="flex flex-col gap-6">
            <div>
              <Input
                type="fname" label="First Name" required
                className="w-64 bg-xmts-tan" color="white"
                onChange={(e) => { setFirstName(e.target.value); }}   
              />
            </div>
            <div>
              <Input
                type="lname" label="Last Name" required
                className="w-64 bg-xmts-tan" color="white"
                onChange={(e) => { setLastName(e.target.value); }}   
              />
            </div>
            <div>
              <Input
                type="username" label="Username" required
                className="w-64 bg-xmts-tan" color="white"
                onChange={(e) => { setUsername(e.target.value); }}
              />
            </div>
            <div>
              <Input
                type="email" label="Email" required 
                className="w-64 bg-xmts-tan" color="white"
                onChange={(e) => { setEmail(e.target.value); }}   
              />
            </div>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"} label="Password" required
                className="w-64 bg-xmts-tan" color="white"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                onChange={ validatePassword }   
              />
              
              {passwordError && (
                <p class="text-xmts-red text-sm py-2">
                  Password must contain at least 8 characters.
                </p>
              )}
            </div>
            <div className="relative">
              <Input
                type={showConfirmPW ? "text" : "password"} label="Confirm Password" required
                className="w-64 bg-xmts-tan" color="white"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                onChange={ confirmPassword }   
              />
              
              {confirmPasswordError && (
                <p className="text-xmts-red text-sm py-2">Passwords must match.</p>
              )}
            </div>

            {error && (
              <div
                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                <span className="font-medium">{errorMessage[0]}</span>{" "}
                {errorMessage[1]}
              </div>
            )}
            
            <div className="flex justify-center">
              <Button
                className="font-dynaPuff mt-0 text-xl w-30 h-15 bg-xmts-yellow hover:bg-yellow-500 text-xmts-lightbrown"
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            </div>

            <div>
              <p className="text-center text-sm font-light text-gray-500">
                Already have an account?{" "}
                <a href="/login" className="font-medium text-primary-600 hover:underline">
                  Login</a>
              </p>  
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
