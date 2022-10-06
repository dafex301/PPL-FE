// Import navbar
import Navbar from "../../components/Navbar";
import MenuTopLeft from "../../components/MenuTopLeft";
import MenuBotLeftMhs from "../../components/MenuBotLeftMahasiswa";
import Head from "next/head";

export default function HomeMahasiswa() {
  return (
    <>
      <Head>
        <title>PKL Mahasiswa</title>
      </Head>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex justify-center gap-5 py-10 w-3/4">
          <div className="w-1/4">
            <MenuTopLeft />
            <MenuBotLeftMhs />
          </div>
          <div className="w-3/4 pb-3 bg-white rounded-lg shadow-lg">
            <form>
              <div className="flex">
                <h2 className="text-left font-bold text-2xl pl-5 pt-4">
                  Data IRS
                </h2>
              </div>
              <div className="flex justify-start ml-16 mt-5">
                <p>Semester Aktif</p>
              </div>
              {/* dropdown menu */}
              <div className="flex justify-start mx-16 mt-2">
                <select
                  className="w-full h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:outline-gray-500"
                  placeholder="Semester"
                >
                  {/* Loop from index 1 to 14 */}
                  <option value="" selected disabled>
                    Pilih Semester
                  </option>
                  {Array.from(Array(14).keys()).map((i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-start ml-16 mt-5">
                <label for="irs">Jumlah SKS</label>
              </div>
              <div className="flex justify-start mx-16 mt-2">
                <input
                  id="irs"
                  name="irs"
                  type="number"
                  max={24}
                  className="w-full p-1 text-base border-b-2 focus:outline-none focus:border-gray-500 transition duration-500"
                />
              </div>
              <div className="flex justify-start ml-16 mt-5">
                <p>Scan IRS</p>
              </div>
              <div className="flex justify-start mx-16 mt-2">
                {/* dropzone file */}
                <label
                  for="dropzone-file"
                  class="flex flex-col items-center justify-center w-full h-64 border rounded-xl cursor-pointer hover:bg-gray-100 "
                >
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                      ></path>
                    </svg>
                    <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span class="font-semibold">Click to upload</span> or drag
                      and drop
                    </p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">
                      PDF, PNG, or JPG up to 10MB
                    </p>
                  </div>
                  <input id="dropzone-file" type="file" class="hidden" />
                </label>
              </div>
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="mb-2 px-10 h-10 text-white transition-colors duration-150 bg-violet-500 rounded-full shadow-lg focus:shadow-outline hover:bg-violet-600"
                >
                  Simpan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
