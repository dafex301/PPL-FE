import Head from "next/head";
import { useState } from "react";
import Card from "../../components/Card";

export default function Verifikasi() {
  // State
  const [angkatan, setAngkatan] = useState("");
  const [irs, setIrs] = useState(true);
  const [khs, setKhs] = useState(true);
  const [pkl, setPkl] = useState(true);
  const [skripsi, setSkripsi] = useState(true);

  // Other data
  const currentYear = new Date().getFullYear();
  return (
    <>
      <Head>
        <title>Verifikasi Berkas</title>
      </Head>
      <div className="mx-8 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-left font-bold text-2xl">Verifikasi Berkas</h2>

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
        {/* End of Header */}

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 ">
          <Card
            name="IRS"
            color="cyan"
            status={irs}
            handleStatus={() => setIrs(!irs)}
            data={10}
          />
          <Card
            name="KHS"
            color="sky"
            status={khs}
            handleStatus={() => setKhs(!khs)}
            data={21}
          />
          <Card
            name="PKL"
            color="blue"
            status={pkl}
            handleStatus={() => setPkl(!pkl)}
            data={5}
          />
          <Card
            name="Skripsi"
            color="indigo"
            status={skripsi}
            handleStatus={() => setSkripsi(!skripsi)}
            data={2}
          />
        </div>
        {/* End of Cards */}
      </div>
    </>
  );
}
