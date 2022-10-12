import Head from "next/head";
import { useState } from "react";

export default function PKLDosen() {
  const [selected, setSelected] = useState(true);
  const selectedStyle =
    "bg-violet-500 hover:bg-violet-700 text-white flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer";
  const unselectedStyle =
    "bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer";

  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Data PKL</title>
      </Head>
      <div className="flex items-center mx-8 justify-between">
        <h2 className="text-left font-bold text-2xl">Data IRS</h2>
        <div className="flex items-center gap-1">
          <label htmlFor="angkatan">Angkatan</label>
          <select id="angkatan">
            {[...Array(5)].map((_, i) => (
              <option key={currentYear - i} value={currentYear - i}>
                {currentYear - i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 mx-8 my-3 gap-8">
        <div
          onClick={() => setSelected(true)}
          className={selected ? selectedStyle : unselectedStyle}
        >
          <div className="">Total Mahasiswa Sudah PKL</div>
          <div className="text-8xl font-bold my-3">45</div>
          <div>Mahasiswa</div>
        </div>
        <div
          onClick={() => setSelected(false)}
          className={selected ? unselectedStyle : selectedStyle}
        >
          <div className="">Total Mahasiswa Belum PKL</div>
          <div className="text-8xl font-bold my-3">69</div>
          <div>Mahasiswa</div>
        </div>
      </div>
    </>
  );
}
