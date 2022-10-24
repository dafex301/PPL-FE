import React from 'react'
import { useState, useEffect } from "react";

function TotalNum({sudahSkripsi,belumSkripsi,label}) {
  const [selected, setSelected] = useState(true);
  const [selected2, setSelected2] = useState(true);
  
  const selectedStyle =
    "bg-green-500 hover:bg-green-700 text-white flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

  const selectedStyle2 =
    "bg-red-500 hover:bg-red-700 text-white flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

  const unselectedStyle =
    "bg-gray-100 hover:bg-gray-200 flex flex-col items-center justify-center p-5 rounded-2xl cursor-pointer transition duration-100 ease-in-out";

  return (
    <div className="grid grid-cols-2 mx-8 my-3 gap-8 transition-all duration-300 ease-in-out">
    <div
      onClick={() => setSelected(!selected)}
      className={selected ? selectedStyle : unselectedStyle}
    >
      <div className="">Total Mahasiswa Sudah {label}</div>
      <div className="text-8xl font-bold my-3">{sudahSkripsi}</div>
      <div>Mahasiswa</div>
    </div>
    <div
      onClick={() => setSelected2(!selected2)}
      className={selected2 ? selectedStyle2 : unselectedStyle}
    >
      <div className="">Total Mahasiswa Belum {label}</div>
      <div className="text-8xl font-bold my-3">{belumSkripsi}</div>
      <div>Mahasiswa</div>
    </div>
  </div>
  )
}

export default TotalNum