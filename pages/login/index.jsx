import Head from "next/head";

export default function Login(params) {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <div class="relative min-h-screen flex ">
        <div class="flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-start flex-auto min-w-0 bg-white">
          <div class="sm:w-1/2 xl:w-3/5 h-full hidden md:flex flex-auto items-center justify-center p-10 overflow-hidden bg-purple-900 text-white bg-no-repeat bg-cover relative">
            <div class="absolute bg-gradient-to-b from-indigo-600 to-blue-500 opacity-75 inset-0 z-0"></div>
            <div class="w-full  max-w-md z-10">
              <div class="sm:text-4xl xl:text-5xl font-bold leading-tight mb-6">
                Selamat Datang
              </div>
              <div class="sm:text-sm xl:text-md text-gray-200 font-normal">
                {" "}
                Silakan masuk untuk lorem ipsum dolor, sit amet consectetur
                adipisicing elit. Excepturi harum autem ad sapiente qui
                blanditiis doloremque laborum, consequatur doloribus facere
                laudantium eveniet repudiandae expedita, sunt ipsam repellendus
                architecto dignissimos? Ratione!
              </div>
            </div>
            <ul class="circles">
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
          <div class="md:flex md:items-center md:justify-center  sm:w-auto md:h-full w-2/5 xl:w-2/5 p-8  md:p-10 lg:p-14 sm:rounded-lg md:rounded-none bg-white">
            <div class="max-w-md w-full space-y-8">
              <form class="mt-8 space-y-6" action="#" method="POST">
                <input type="hidden" name="remember" value="true" />
                <div class="relative">
                  <div class="absolute right-3 mt-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      class="h-6 w-6 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Email
                  </label>
                  <input
                    class=" w-full text-base px-4 py-2 border-b border-gray-300 focus:outline-none rounded-2xl focus:border-indigo-500"
                    type=""
                    placeholder="mail@gmail.com"
                    value="mail@gmail.com"
                  />
                </div>
                <div class="mt-8 content-center">
                  <label class="ml-3 text-sm font-bold text-gray-700 tracking-wide">
                    Password
                  </label>
                  <input
                    class="w-full content-center text-base px-4 py-2 border-b rounded-2xl border-gray-300 focus:outline-none focus:border-indigo-500"
                    type=""
                    placeholder="Enter your password"
                    value="*****|"
                  />
                </div>
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <input
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      class="h-4 w-4 bg-blue-500 focus:ring-blue-400 border-gray-300 rounded"
                    />
                    <label
                      for="remember_me"
                      class="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <div class="text-sm">
                    <a href="#" class="text-indigo-400 hover:text-blue-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    class="w-full flex justify-center bg-gradient-to-r from-indigo-500 to-blue-600  hover:bg-gradient-to-l hover:from-blue-500 hover:to-indigo-600 text-gray-100 p-4  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-500"
                  >
                    Masuk
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
