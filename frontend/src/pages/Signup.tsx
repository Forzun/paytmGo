import { useSearchParams } from "react-router-dom"
import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Heading } from "../components/Heading"
import InputBox from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { useState } from "react"
import axios from "axios";


const Signup = () => {
  const [firstName , setFirstName] = useState("");
  const [lastName , setLastName] = useState(""); 
  const [username , setUsername] = useState(""); 
  const [password , setPassword] = useState("");

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className=" rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label="Signup" />
          <SubHeading label={"Enter your information to create an account"} />
          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label="First Name " />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label="Last Name" />
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="example@gmail.com" label="Email" />
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="password" label="Password" /> 
          <div className="pt-4">
            <Button label={"Sign up"} onClick={ async() => { 
                const response = await await axios.post("http://localhost:3000/api/v1/user/signup" , { 
                      firstName: firstName, 
                      lastName: lastName, 
                      username: username, 
                      password: password
                })
                const token = response.data.token; 
                localStorage.setItem("token", token);
            }} />       
          </div>
          <ButtonWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
        </div>
      </div>
    </div>
  )
}

export default Signup
