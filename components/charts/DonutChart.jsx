// Next Components
import Head from "next/head";
import { useState, useEffect } from "react";
import useSWR from "swr";
import dynamic from "next/dynamic";

// Import another library
import { getCookie } from "cookies-next";

// Import charts
const PieChartOutline = dynamic(
  () => import("../../components/charts/PieChartOutline"),
  {
    ssr: false,
  }
);
const token = getCookie("accessToken");
// Fetcher and set header x-access-token with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

export default function DonutChart({API,label,angkatan}) {
  // State
  const [dataStatus, setDataStatus] = useState([]);

  // Get data rekap departemen
  const { data: rekapData, error } = useSWR(
    API,
    fetcher
  );
  console.log(rekapData);

  useEffect(() => {
    if (rekapData) {
      angkatan === ''|| angkatan === '#' ? setDataStatus(Object.values(rekapData.status)) : setDataStatus(Object.values(rekapData[angkatan].status));
    }
  }, [rekapData,angkatan]);

  return (
    <>
      <Head>
        <title>Home Dosen</title>
      </Head>
      <div id="container" className="mx-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-left font-bold text-2xl">{label}</h2>
        </div>
        {/* End of Header */}

        {/* Chart Status */}
        <div className="flex justify-center">
          <PieChartOutline data={dataStatus ? dataStatus : []} />
        </div>
        {/* End of Chart Status */}

        {/* Cards Status Mahasiswa */}
        <div className="grid grid-cols-12 gap-4 mt-5">
          <div
            className={
              rekapData && (angkatan === '' || angkatan === '#' ? rekapData.status.aktif : rekapData[angkatan].status.aktif)
                ? `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-green-500 hover:bg-green-400`
                : `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-gray-400 `
            }
          >
            <div className="text-3xl font-bold">
              {rekapData ? (angkatan === '' || angkatan === '#' ? rekapData.status.aktif : rekapData[angkatan].status.aktif) : 0}
            </div>
            <div className="">Aktif</div>
          </div>
          <div
            className={
              rekapData && (angkatan === '' || angkatan === '#' ? rekapData.status.cuti : rekapData[angkatan].status.cuti)
                ? `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-yellow-500 hover:bg-yellow-400`
                : `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-gray-400`
            }
          >
            <div className="text-3xl font-bold">
            {rekapData ? (angkatan === '' || angkatan === '#' ? rekapData.status.cuti : rekapData[angkatan].status.cuti) : 0}
            </div>
            <div>Cuti</div>
          </div>
          <div
            className={
              rekapData && (angkatan === '' || angkatan === '#' ? rekapData.status.mangkir : rekapData[angkatan].status.mangkir)
                ? `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-orange-500 hover:bg-orange-400`
                : `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-gray-400`
            }
          >
            <div className="text-3xl font-bold">
            {rekapData ? (angkatan === '' || angkatan === '#' ? rekapData.status.mangkir : rekapData[angkatan].status.mangkir) : 0}
            </div>
            <div>Mangkir</div>
          </div>
          <div
            className={
              rekapData && (angkatan === '' || angkatan === '#' ? rekapData.status.do : rekapData[angkatan].status.do)
                ? `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-red-500 hover:bg-red-400`
                : `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-gray-400`
            }
          >
            <div className="text-3xl font-bold">
            {rekapData ? (angkatan === '' || angkatan === '#' ? rekapData.status.do : rekapData[angkatan].status.do) : 0}
            </div>
            <div>Drop Out</div>
          </div>
          <div
            className={
              rekapData && (angkatan === '' || angkatan === '#' ? rekapData.status.undur_diri : rekapData[angkatan].status.undur_diri)
                ? `rounded-xl col-span-3 col-start-2 text-center p-4 text-white drop-shadow-lg bg-pink-500 hover:bg-pink-400`
                : `rounded-xl col-span-3 col-start-2 text-center p-4 text-white drop-shadow-lg bg-gray-400`
            }
          >
            <div className="text-3xl font-bold">
            {rekapData ? (angkatan === '' || angkatan === '#' ? rekapData.status.undur_diri : rekapData[angkatan].status.undur_diri) : 0}
            </div>
            <div>Undur Diri</div>
          </div>
          <div
            className={
              rekapData && (angkatan === '' || angkatan === '#' ? rekapData.status.lulus : rekapData[angkatan].status.lulus)
                ? `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-purple-500 hover:bg-purple-400`
                : `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-gray-400`
            }
          >
            <div className="text-3xl font-bold">
            {rekapData ? (angkatan === '' || angkatan === '#' ? rekapData.status.lulus : rekapData[angkatan].status.lulus) : 0}
            </div>
            <div>Lulus</div>
          </div>
          <div
            className={
              rekapData && (angkatan === '' || angkatan === '#' ? rekapData.status.meninggal_dunia : rekapData[angkatan].status.meninggal_dunia)
                ? `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-indigo-500 hover:bg-indigo-400`
                : `rounded-xl col-span-3 text-center p-4 text-white drop-shadow-lg bg-gray-400`
            }
          >
            <div className="text-3xl font-bold">
            {rekapData ? (angkatan === '' || angkatan === '#' ? rekapData.status.meninggal_dunia : rekapData[angkatan].status.meninggal_dunia) : 0}
            </div>
            <div>Meninggal Dunia</div>
          </div>
        </div>
        {/* End of Cards Status Mahasiswa */}

        {/* Card PKL */}

        {/* End of Card PKL */}
      </div>
      <br />
    </>
  );
}
