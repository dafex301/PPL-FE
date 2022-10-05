// Import navbar
import Image from "next/image";
import Navbar from "../../components/Navbar";
import MenuTopLeft from "../../components/MenuTopLeft";
import MenuBotLeftMhs from "../../components/MenuBotLeftMahasiswa";
import anya from "../../public/anya.jpeg";

export default function HomeMahasiswa() {
  return (
    <div>
      <Navbar />
      <div className="flex justify-center">
        <div className="flex justify-center gap-5 py-10 w-3/4">
          <div className="w-1/4">
            <MenuTopLeft />
            <MenuBotLeftMhs />
          </div>
          <div className="w-3/4 pb-3 bg-white rounded-lg shadow-lg">
            <div className="flex my-8 items-start mx-12">
              <h2 className="text-left font-bold w-1/4 text-2xl">Profil</h2>
              <div className="w-32 h-32 relative">
                <Image
                  className="rounded-full"
                  src={anya}
                  alt="photo-profile"
                />
                <div className="absolute bottom-0 right-0">
                  <div className="w-8 h-8 bg-gray-300 hover:bg-gray-400 hover:cursor-pointer rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-20 my-8 items-start mx-12">
              <h2 className="text-left font-bold text-2xl">Basic Info</h2>
              <div className="w-8/12">
                <label className="block" for="first">
                  Nama Lengkap
                </label>
                <input
                  className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full"
                  type="text"
                  id="first"
                  name="first"
                />
                <label for="nim" className="block">
                  NIM
                </label>
                <input
                  className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full"
                  type="number"
                  id="nim"
                  name="nim"
                />
                <label for="angkatan" className="block">
                  Angkatan
                </label>
                <input
                  className="border-b-2 p-1 focus:outline-none focus:border-gray-500 w-full"
                  type="number"
                  id="angkatan"
                  name="angkatan"
                />
              </div>
            </div>
            <div className="flex gap-20 my-8 items-start mx-12">
              <h2 className="text-left font-bold text-2xl">Address</h2>
              <div className="w-8/12 ml-5">
                <label className="block mb-1" for="alamat">
                  Alamat
                </label>
                <textarea
                  id="alamat"
                  className="border-2 mb-5 w-full rounded-xl focus:outline-none focus:border-gray-500 p-2"
                ></textarea>
                <label for="provinsi" className="block">
                  Provinsi
                </label>
                <select
                  id="provinsi"
                  name="kabupaten"
                  className=" w-full mb-5 h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:shadow-outline"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
                <label for="kabupaten" className="block">
                  Kabupaten
                </label>
                <select
                  id="kabupaten"
                  name="kabupaten"
                  className="w-full h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:shadow-outline"
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                  <option>6</option>
                  <option>7</option>
                  <option>8</option>
                </select>
              </div>
            </div>
            <div className="flex gap-20 my-8 items-start mx-12">
              <h2 className="text-left font-bold text-2xl">Contact</h2>
              <div className="w-8/12 ml-5">
                <label className="block" for="email">
                  Email
                </label>
                <input
                  className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full"
                  type="email"
                  id="email"
                  name="email"
                />
                <label className="block" for="phone">
                  No. HP
                </label>
                <input
                  className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full"
                  type="tel"
                  id="phone"
                  name="phone"
                />
                <div className="flex justify-end">
                  <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
                    Simpan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
