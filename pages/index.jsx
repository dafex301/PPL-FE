import Head from "next/head";
import { useState } from "react";
import { setCookie, getCookie } from "cookies-next";

export default function Login(params) {
  const axios = require("axios").default;

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    // Fetch login API to http://localhost:8080/signin
    // If success, redirect to /admin
    // If failed, show error message
    e.preventDefault();
    axios
      .post(`${process.env.BACKEND_API}/signin`, {
        username: username,
        password: password,
      })
      .then((response) => {
        setCookie("accessToken", response.data.accessToken, {
          maxAge: 60 * 60,
        });
        window.location.href = `/${response.data.roles}`;
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div className="relative min-h-screen flex ">
        <div className="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div className="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
            <div className="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
            <div className="w-full  max-w-md z-10">
              <div className="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                Selamat Datang
              </div>
              <div className="sm:text-sm xl:text-md text-gray-200 font-normal">
                {" "}
                Silakan masuk untuk lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Excepturi harum autem ad sapiente qui
                blanditiis doloremque laborum, consequatur doloribus facere
                laudantium eveniet repudiandae expedita, sunt ipsam repellendus
                architecto dignissimos? Ratione!
              </div>
            </div>
            <ul className="circles">
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
              <li></li>
            </ul>
          </div>
          <div className="md:flex md:items-center md:justify-center  sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
            <div className="max-w-md w-full space-y-8">
              <h1 className="text-3xl font-semibold">Login Page</h1>
              <div className="relative">
                <div className="absolute right-3 mt-4"></div>
                <label
                  htmlFor="username"
                  className="ml-3 text-sm font-bold text-gray-700 tracking-wide"
                >
                  Username
                </label>
                <input
                  className=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                  type="text"
                  name="username"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mt-8 content-center">
                <label
                  htmlFor="password"
                  className="ml-3 text-sm font-bold text-gray-700 tracking-wide"
                >
                  Password
                </label>
                <input
                  className="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSubmit(e);
                    }
                  }}
                />
              </div>
              <div className="flex items-center justify-between"></div>
              <div>
                <button
                  type="button"
                  className="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  onClick={handleSubmit}
                >
                  Masuk
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
