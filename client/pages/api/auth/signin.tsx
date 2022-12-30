import { useState } from "react";
import { signIn } from "next-auth/react";
import { NextPage } from "next";
const index:NextPage = (props):JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", { email: email, password: password });
    console.log(res);
  
  };
  const handleSignUp = () => {
    alert("sign up");
  };
  return (
    <>
      <div className="m-0 flex flex-col justify-center items-center h-screen">
        <div className=" p-5 flex  flex-col sm:w-1/2 lg:w-1/4  ">
          <form>
            <div className=" mb-6">
              <h1 className=" text-darkPurple text-3xl font-bold text-center">
                Event
              </h1>
            </div>
            <input type="email" name="email" onChange={(e)=>setEmail(e.target.value)} id="" />
            <input type="password" name="password" onChange={(e)=>setPassword(e.target.value)}  id="" />
            <div className="mb-3">
           <button onClick={(e)=>handleSignIn(e)}>login</button>
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
          </form>
        </div>

      
      </div>
    </>
  );
};

export default index;
