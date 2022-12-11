import { useEffect, useState } from "react";
import Button from "../../components/Button";
import CheckBox from "../../components/CheckBox";
import InputBox from "../../components/InputBox";
const index = () => {
  const [isTrue, setIsTrue] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = () => {
    if (
      email !== "" &&
      password !== "" &&
      email !== null &&
      password !== null
    ) {
      setIsTrue(false);
      // make the request if not empty
    } else {
      // form not filled correctly
      setIsTrue(true);
    }
  };
  const handleSignUp = () => {
    alert("sign up");
  };
  return (
    <>
      <div className="m-0 flex justify-center items-center h-screen ">
        <div className=" p-5 flex  flex-col sm:w-1/2 lg:w-1/4  ">
          <div className=" mb-6">
            <h1 className=" text-darkPurple text-3xl font-bold text-center">
              Event
            </h1>
          </div>
          <InputBox
            type="email"
            id="email"
            placeholder="Email"
            onChange={setEmail}
            errorText="Email is required fill the form correctly."
            error={isTrue}
          />

          <InputBox
            type="password"
            id="password"
            placeholder="Password"
            onChange={setPassword}
            errorText="Password is required fill the form correctly."
            error={isTrue}
          />
          <CheckBox />
          <div className="mb-3">
            <Button
              onClick={handleSignIn}
              text="Sign in"
              style="rounded-none w-full bg-white hover:bg-white hover:text-base hover:text-darkPurple text-lightPurple font-normal py-2 px-4 "
            />
          </div>
          <p className="mt-2 mb-2 text-md text-textDark">
            <span className="font-normal">New here ?</span>
          </p>
          <div className="mb-3 flex">
            <a
              href="/signup"
              className=" text-center rounded-none w-full bg-lightPurple hover:bg-darkPurple text-white font-light py-2 px-4 "
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
