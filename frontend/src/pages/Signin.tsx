import { Button } from "../components/Button"
import { ButtonWarning } from "../components/ButtonWarning"
import { Heading } from "../components/Heading"
import InputBox from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"

const Signin = () => {

  return (
    <div className='h-screen flex justify-center items-center bg-gray-500'>
      <div className="flex p-4 flex-col pb-9 w-1/5 items-center rounded-md gap-3 bg-gray-100">
        <div>
          <Heading label="Sign in" />
      </div>
      <div className="w-5/6 text-center">
        <SubHeading label="Enter your credentials to access you account" />
      </div>
      <div className="w-full flex flex-col gap-2">
      <InputBox label="Email" placeholder="example@gmail.com" />
      <InputBox label="password" placeholder="Enter you password" />
      </div>
      <div className="w-full">
        <Button label="Sign in" />
      </div>
      <div>
        <ButtonWarning label="Don't have an account?" buttonText="Sign in" to="/signup" /> 
      </div>
      </div>
    </div>
  )
}

export default Signin
