import { useState } from "react";
import XMarksLogo from "../assets/XMarksLogo.png";

const SignupPage = () => {
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

  const [usernameExists, setUsernameExists] = useState(false);
  const [emailExists, setEmailExists] = useState(true);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPW(!showConfirmPW);
  };

  const validatePassword = (e) => {
    const pw = e.target.value;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(pw)) {
      setPasswordError(true);
    } else {
      setPassword(pw);
      setPasswordError(false);
      confirmPassword(e);
    }
  };

  const confirmPassword = (e) => {
    const pw = e.target.value;
    if (pw !== password) {
      setConfirmPasswordError(true);
    } else {
      setConfirmPW(pw);
      setConfirmPasswordError(false);
      setPasswordsMatch(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPW) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);

      const newAccount = {
        firstName: firstName,
        lastName: lastName,
        username: username,
        email: email,
        password: password,
      };

      fetch("http://127.0.0.1:4000/check/username", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      })
        .then((response) => response.json())
        .then((usernameCheck) => {
          console.log(usernameCheck);
          if (usernameCheck.success) {
            console.log(usernameCheck.message);
            setUsernameExists(true);
          } else {
            console.log(usernameCheck.message);
            setUsernameExists(false);
          }
        })
        .catch((error) => console.log(error));

      fetch("http://127.0.0.1:4000/check/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAccount),
      })
        .then((response) => response.json())
        .then((emailCheck) => {
          console.log(emailCheck);
          if (emailCheck.success) {
            console.log(emailCheck.message);
            setEmailExists(true);
          } else {
            console.log(emailCheck.message);
            setEmailExists(false);
          }
        })
        .catch((error) => console.log(error));

      if (!emailExists && !usernameExists) {
        console.log("hello");

        fetch("http://127.0.0.1:4000/add_user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAccount),
        })
          .then((response) => response.json())
          .then((account) => {
            console.log(account);
            console.log(account.status);

            if (account.status === 200) {
              console.log(account.message);
            } else {
              console.log(account.message);
            }
          })
          .catch((error) => console.log(error));
      }
    }
  };

  return (
    <div class="bg-xmts-darkbrown flex items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 overflow-auto">
      <div class="w-full md:mt-0 sm:max-w-md xl:p-0 overflow-auto">
        <div class="flex justify-center h-24">
          <img class="max-h-full w-auto" src={XMarksLogo} alt="Image Logo" />
        </div>

        <h1 class="text-xmts-yellow text-5xl text-center">
          Let's Get to Know You a Bit!
        </h1>
        <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
          <form class="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="fname" class="text-xmts-tan text-lgfont-medium">
                First Name
              </label>
              <input
                type="fname"
                name="fname"
                id="fname"
                placeholder="First Name"
                required
                class="bg-xmts-tan rounded-lg w-full p-2"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="lname" class="text-xmts-tan text-lgfont-medium">
                Last Name
              </label>
              <input
                type="lname"
                name="lname"
                id="lname"
                placeholder="Last Name"
                required
                class="bg-xmts-tan rounded-lg w-full p-2"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label
                htmlFor="username"
                class="text-xmts-tan text-lgfont-medium"
              >
                Username
              </label>
              <input
                type="username"
                name="username"
                id="username"
                placeholder="Username"
                required
                class="bg-xmts-tan rounded-lg w-full p-2"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label htmlFor="email" class="text-xmts-tan text-lgfont-medium">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                class="bg-xmts-tan rounded-lg w-full p-2"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <div>
              <label
                htmlFor="password"
                class="text-xmts-tan text-lgfont-medium"
              >
                Password
              </label>
              <div class="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  required
                  class="bg-xmts-tan rounded-lg w-full p-2 pr-10"
                  onChange={validatePassword}
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}"
                />
                <label class="swap swap-rotate absolute inset-y-0 right-0 flex items-center mr-3">
                  <input
                    type="checkbox"
                    onClick={togglePasswordVisibility}
                    className="hidden"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    class="fill-current w-5 h-5 swap-off"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="w-5 h-5 fill-none swap-on"
                  >
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
              </div>
              {passwordError && (
                <p class="text-xmts-red text-sm py-2">
                  Password must contain 8 letters, 1 uppercase letter, 1 number,
                  and 1 special character.
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="confirm-password"
                class="text-xmts-tan text-lgfont-medium"
              >
                Confirm password
              </label>

              <div class="relative">
                <input
                  type={showConfirmPW ? "text" : "password"}
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="Password"
                  required
                  class="bg-xmts-tan rounded-lg w-full p-2"
                  onChange={confirmPassword}
                />
                <label class="swap swap-rotate absolute inset-y-0 right-0 flex items-center mr-3">
                  <input
                    type="checkbox"
                    onClick={toggleConfirmPasswordVisibility}
                    className="hidden"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 16 16"
                    class="fill-current w-5 h-5 swap-off"
                  >
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"></path>
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"></path>
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"></path>
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 24 24"
                    fill="none"
                    class="w-5 h-5 fill-none swap-on"
                  >
                    <path
                      d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle
                      cx="12"
                      cy="12"
                      r="3"
                      stroke="#000000"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </label>
              </div>
              {confirmPasswordError && (
                <p class="text-xmts-red text-sm py-2">Passwords must match.</p>
              )}
            </div>

            {!passwordsMatch && (
              <div
                class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                role="alert"
              >
                <span class="font-medium">Check your information again!</span>{" "}
                Inputted passwords do not match.
              </div>
            )}

            {(emailExists || usernameExists) && (
              <div
                className="p-4 text-sm text-red-800 rounded-lg bg-red-50"
                role="alert"
              >
                {emailExists ? (
                  <>
                    <span className="font-medium">Registration Failed!</span> -
                    Email already exists.
                  </>
                ) : (
                  <>
                    <span className="font-medium">Registration Failed!</span> -
                    Username already exists.
                  </>
                )}
              </div>
            )}

            <div class="flex flex-col items-center justify-center">
              {/*When user signs up, they should be redirected to user dashboard*/}
              <button
                type="submit"
                class="bg-xmts-yellow w-1/3 font-medium rounded-lg px-5 py-2.5 text-center"
              >
                Sign Up
              </button>
              <p class="text-sm font-light text-gray-500 py-3">
                Already have an account?{" "}
                <a
                  href="/login"
                  class="font-medium text-primary-600 hover:underline"
                >
                  Login here
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default SignupPage;
