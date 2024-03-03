import { useState, useEffect } from "react";
import { Input, Button } from "@material-tailwind/react";
import XMarksLogo from "../assets/XMarksLogo.png";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://127.0.0.1:5000/users")
      .then((response) => response.json())
      .then((users) => {
        console.log(users);
        const userExists = users.find((user) => user[4] === username);
        if (userExists) {
          const passwordCheck = users.find((user) => user[5] === password);
          if (passwordCheck) {
            console.log("Login successful!");
            navigate("/dashboard");
          } else {
            console.log("Incorrect Password!");
          }
        } else {
          console.log("Account does not exist!");
        }
      })
      .catch((error) => console.error("Error fetching user data:", error));
  };

  return (
    <div className="bg-[#211B11]">
      <div className="flex items-center justify-center h-screen">
        <div className="w-full bg-[#211B11]rounded-lg shadow md:mt-0 sm:max-w-xl xl:p-0">
          <div className="flex flex-col items-center justify-center px-9 py-8">
            <img src={XMarksLogo} alt="Logo" />
            <form>
              <div className="flex flex-col gap-3">
                <p className="font-dynaPuff mb-3 text-4xl text-[#F5B900]">
                  XMARKS THE SPOT LOGIN!
                </p>
                <Input
                  className="w-64 bg-[#D7BC95] font-dynaPuff"
                  type="email"
                  color="white"
                  onChange={(event) => {
                    setUsername(event.target.value);
                  }}
                  label="Username"
                />
                <Input
                  className="w-64"
                  type="password"
                  color="white"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  label="Password"
                />
                <div className="flex justify-center">
                  <Button
                    className="font-dynaPuff mt-0 text-xl w-30 h-15 bg-[#F5B900] hover:bg-yellow-500 text-[#7D633F]"
                    onClick={handleSubmit}
                  >
                    Log In
                  </Button>
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
