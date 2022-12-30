import { FormEventHandler, useContext, useState, useEffect } from "react";
import { NextPage } from "next";
import InputBox from "../../components/InputBox";
import CheckBox from "../../components/CheckBox";
import AuthContext from "../../context/AuthProvider";
import { useRouter } from "next/router";
interface Props { }
const SignIn: NextPage = (Props): JSX.Element => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [noteShow, setNoteShow] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");
  const authContext = useContext(AuthContext);

  useEffect(() => {
    if (note !== "") {
      setNoteShow(true);
      setTimeout(() => { setNoteShow(false); setNote("") }, 2000);

    } else {
      setNoteShow(false);
    }
  }, [note])
  const handleSignIn: FormEventHandler<HTMLFormElement> = async (e) => {
    try {
      e.preventDefault();
      const res = await fetch("http://localhost:3500/auth", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
        }),
        credentials: 'include',
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setNote(data.note);
      if (data.accessToken) {
        authContext?.setAuth({
          accessToken: data.accessToken,
          email: data.email,
          roles: data.roles,
          username: data.username,
        });
        setTimeout(() => { router.push('/dashboard') }, 2000);

      } else {
        console.log(data.note);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <div className="m-0 flex flex-col justify-center items-center h-screen">
        <div className=" p-5 flex  flex-col sm:w-1/2 lg:w-1/4  ">
          <form method="post" onSubmit={handleSignIn}>
            <div className=" mb-6">
              <h1 className=" text-darkPurple text-3xl font-bold text-center">
                Event
              </h1>
            </div>
            <InputBox
              type="email"
              id="email"
              placeholder="Email"
              setter={setEmail}
              errorText="Email is required fill the form correctly."
              error={false}
            />

            <InputBox
              type="password"
              id="password"
              placeholder="Password"
              setter={setPassword}
              errorText="Password is required fill the form correctly."
              error={false}
            />
            <CheckBox />
            <div className="mb-3">
              <input
                type="submit"
                value="Sign in"
                className=" rounded-none w-full cursor-pointer bg-white hover:bg-white hover:text-base hover:text-darkPurple text-lightPurple font-normal py-2 px-4 "
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
          </form>
        </div>
        {noteShow ? (
          <div className="flex absolute bottom-0 md:transition ease-in-out z-10 flex-row justify-end w-full p-5">
            <div className="px-1 py-6 w-3/12 opacity-70 bg-gray-200 border border-lightPurple ">
              <p className="text-darkPurple text-center capitalize font-medium">
                {note === "welcome" ? note + " " + authContext?.auth?.username : note}

              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default SignIn;
