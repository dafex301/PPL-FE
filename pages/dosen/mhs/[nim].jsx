// Next
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";

// Asset
import anya from "../../../public/anya.jpeg";

export default function DetailMhs() {
  const router = useRouter();
  const { nim } = router.query;

  return (
    <>
      <Head>
        <title>Detail Mahasiswa</title>
      </Head>
      <div className="grid grid-cols-4 mx-12 my-5">
        <h2 className="text-left font-bold w-1/4 text-2xl">Profil</h2>
        <div className="w-32 h-32 relative col-span-3">
          <Image
            layout="fill"
            className="rounded-full"
            src={anya}
            alt="photo-profile"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 mx-12 my-5">
        <h2 className="text-left font-bold text-2xl">Info</h2>
        <div className="col-span-3">
          <label className="block" htmlFor="nama">
            Nama Lengkap
          </label>
          <input
            className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white "
            type="text"
            id="nama"
            name="nama"
            value="Anya Forger"
            disabled
          />
          <label htmlFor="nim" className="block">
            NIM
          </label>
          <input
            className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white "
            type="number"
            id="nim"
            name="nim"
            value="24060120110001"
            disabled
          />
          <label htmlFor="angkatan" className="block">
            Angkatan
          </label>
          <input
            className="border-b-2 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white "
            type="number"
            id="angkatan"
            name="angkatan"
            value={2020}
            disabled
          />
        </div>
      </div>
      <div className="grid grid-cols-4 mx-12 my-5">
        <h2 className="text-left font-bold text-2xl">Semester</h2>
        <div className="col-span-3 grid grid-cols-4 gap-y-3">
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            1
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            2
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            3
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            4
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            5
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-pink-700 cursor-pointer shadow-lg bg-pink-500 text-white text-center text-2xl">
            6
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            7
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-orange-700 cursor-pointer shadow-lg bg-orange-500 text-white text-center text-2xl">
            8
          </div>
          <div className="py-4 w-10/12 rounded-xl  cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            9
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            10
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            11
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            12
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            13
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            14
          </div>
        </div>
        <div className="col-start-2 col-span-full mt-8">
          <p>Keterangan</p>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-violet-500 " />
            <p>Sudah diisikan (IRS dan KHS)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-pink-500 " />
            <p>Sudah lulus PKL</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-orange-500 " />
            <p>Sudah lulus skripsi</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-violet-900 " />
            <p>Belum diisikan</p>
          </div>
        </div>
      </div>
    </>
  );
}
