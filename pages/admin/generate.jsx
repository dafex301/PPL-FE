// Import navbar
import Image from "next/image";
import Navbar from "../../components/Navbar";
import MenuTopLeft from "../../components/MenuTopLeft";
import MenuBotLeftAdmin from "../../components/MenuBotLeftAdmin";
import anya from "../../public/anya.jpeg";
import Head from "next/head";

export default function GenerateAdmin() {
  return (
    <>
      <Head>
        <title>Generate Akun</title>
      </Head>
      <div>
        <Navbar />
        <div className="flex justify-center">
          <div className="flex justify-center gap-5 py-10 w-3/4">
            <div className="w-1/4">
              <MenuTopLeft role="Admin" />
              <MenuBotLeftAdmin />
            </div>
            <div className="w-3/4 pb-3 bg-white rounded-lg shadow-lg">
              <h2 className="text-left font-bold text-2xl pl-5 pt-4">
                Generate Akun
              </h2>
              <form>
                <div className="flex ml-16 mt-5 items-start gap-12">
                  <div className="flex-col gap-3 flex items-center justify-center">
                    <div className="w-32 h-32">
                      <Image alt="photo" className="rounded-full" src={anya} />
                    </div>
                    <label htmlFor="photo">
                      <div className="flex items-center gap-3 cursor-pointer hover:font-semibold">
                        <p className="">Upload</p>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-5 h-5 text-violet-500 hover:text-violet-700"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                          />
                        </svg>
                      </div>
                    </label>
                    <input type="file" id="photo" name="photo" hidden />
                  </div>
                  <div className="w-full mr-16">
                    <label
                      className="block text-sm text-gray-700"
                      htmlFor="nama"
                    >
                      Nama Lengkap
                    </label>
                    <input
                      className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full "
                      type="text"
                      id="nama"
                      name="nama"
                    />
                    <label
                      htmlFor="nim"
                      className="block text-sm text-gray-700"
                    >
                      NIM
                    </label>
                    <input
                      className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full "
                      type="number"
                      id="nim"
                      name="nim"
                    />
                    <label
                      htmlFor="angkatan"
                      className="block text-sm text-gray-700"
                    >
                      Angkatan
                    </label>
                    <input
                      className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full "
                      type="number"
                      id="angkatan"
                      name="angkatan"
                    />
                    <label
                      htmlFor="status"
                      className="block text-sm text-gray-700"
                    >
                      Status
                    </label>
                    <select
                      name="status"
                      id="status"
                      className="border-b-2 py-1 focus:outline-none focus:border-gray-500 w-full "
                    >
                      <option value="aktif">Aktif</option>
                      <option value="cuti">Cuti</option>
                      <option value="mangkir">Mangkir</option>
                      <option value="do">DO</option>
                      <option value="undur_diri">Undur Diri</option>
                      <option value="lulus">Lulus</option>
                      <option value="meninggal_dunia">Meninggal Dunia</option>
                    </select>
                    <div className="flex justify-center mt-5">
                      <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
                        Simpan
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
