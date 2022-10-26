// Next Components
import Head from "next/head";
import { useState, useEffect } from "react";
import useSWR from "swr";

// Import another library
import { getCookie } from "cookies-next";

const token = getCookie("accessToken");
// Fetcher and set header x-access-token with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

export default function HomeDosen() {
  // Get data
  const { data: rekapData, error } = useSWR(
    `${process.env.BACKEND_API}/rekap/dosen`,
    fetcher
  );
  console.log(rekapData);
  return (
    <>
      <Head>
        <title>Home Dosen</title>
      </Head>
      <div id="container" className="mx-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-left font-bold text-2xl">Home Dosen</h2>
        </div>
        {/* End of Header */}

        {/* Cards Status Mahasiswa */}
        <div className="grid grid-cols-12 gap-4">
          <div className="bg-blue-500 col-span-3">Aktif</div>
          <div className="bg-blue-500 col-span-3">Aktif</div>
          <div className="bg-blue-500 col-span-3">Aktif</div>
          <div className="bg-blue-500 col-span-3">Aktif</div>
          <div className="bg-blue-500 col-span-3 col-start-3">Aktif</div>
          <div className="bg-blue-500 col-span-3">Aktif</div>
          <div className="bg-blue-500 col-span-3">Aktif</div>
        </div>
        {/* End of Cards Status Mahasiswa */}
      </div>
    </>
  );
}
