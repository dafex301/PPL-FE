import Head from "next/head";
import { useState } from "react";
import dynamic from "next/dynamic";

const StackedBar = dynamic(() => import("../../components/charts/StackedBar"), {
  ssr: false,
});

export default function SkripsiDosen() {
  const [angkatan, setAngkatan] = useState("");
  const currentYear = new Date().getFullYear();

  return (
    <>
      <Head>
        <title>Data Skripsi</title>
      </Head>
      <div className="flex items-center mx-8 justify-between">
        <h2 className="text-left font-bold text-2xl">Data Skripsi</h2>

        <div className="">
          <label htmlFor="angkatan">Angkatan:</label>
          <select
            onChange={(e) => {
              setAngkatan(e.target.value);
            }}
            id="angkatan"
            className="cursor-pointer ml-1"
          >
            <option value="">Semua</option>
            {[...Array(5)].map((_, i) => (
              <option key={currentYear - i} value={currentYear - i}>
                {currentYear - i}
              </option>
            ))}
          </select>
        </div>
      </div>
      <StackedBar />
    </>
  );
}
