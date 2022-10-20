// Next and React Component
import Head from "next/head";
import { useEffect, useState } from "react";

// Import another library
import { getCookie } from "cookies-next";
import useSWR from "swr";
import axios from "axios";

// Get token from cookies
const token = getCookie("accessToken");

// Fetcher with header x-access-token
const fetcherWithToken = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

export default function KhsMahasiswa() {
  const { data, error } = useSWR(
    `${process.env.BACKEND_API}/khs`,
    fetcherWithToken
  );

  const [semester, setSemester] = useState("");
  const [sksSemester, setSksSemester] = useState("");
  const [sksKumulatif, setSksKumulatif] = useState("");
  const [ipSemester, setIpSemester] = useState("");
  const [ipKumulatif, setIpKumulatif] = useState("");
  const [filename, setFileName] = useState("");
  const [status, setStatus] = useState("belum");

  useEffect(() => {
    if (data) {
      const khs = data.find((item) => item.semester_aktif == semester);
      if (khs) {
        setSksSemester(khs.sks);
        setSksKumulatif(khs.sks_kumulatif);
        setIpSemester(khs.ip);
        setIpKumulatif(khs.ip_kumulatif);
        setFileName(khs.file);
        setStatus(khs.status_konfirmasi);
      } else {
        setSksSemester("");
        setSksKumulatif("");
        setIpSemester("");
        setIpKumulatif("");
        setFileName("");
        setStatus("belum");
      }
    }
  }, [data, semester]);

  return (
    <>
      <Head>
        <title>KHS Mahasiswa</title>
      </Head>
      <form>
        <div className="flex">
          <h2 className="text-left font-bold text-2xl pl-5 pt-4">Data KHS</h2>
        </div>
        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="semester_aktif">Semester Aktif</label>
        </div>

        <div className="flex justify-start mx-16 mt-2">
          <select
            id="semester_aktif"
            name="semester_aktif"
            className="w-full h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:outline-gray-500"
            placeholder="Semester"
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
          >
            {/* Loop from index 1 to 14 */}
            <option value="" disabled>
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
          <label htmlFor="sks_semester">SKS Semester</label>
        </div>

        <div className="flex justify-start mx-16 mt-2">
          <input
            id="sks_semester"
            name="sks_semester"
            type="number"
            max={24}
            className="w-full p-1 disabled:bg-white text-base border-b-2 focus:outline-none focus:border-gray-500 transition duration-500"
            value={sksSemester}
            disabled={status === "sudah"}
            onChange={(e) => setSksSemester(e.target.value)}
          />
        </div>

        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="irs">Jumlah SKS</label>
        </div>
        <div className="flex justify-start mx-16 mt-2">
          <input
            id="sks"
            name="sks"
            type="number"
            max={24}
            className="w-full p-1 disabled:bg-white text-base border-b-2 focus:outline-none focus:border-gray-500 transition duration-500"
            value={sksSemester}
            disabled={status === "sudah"}
            onChange={(e) => setSksKumulatif(e.target.value)}
          />
        </div>

        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="irs">SKS Kumulatif</label>
        </div>
        <div className="flex justify-start mx-16 mt-2">
          <input
            id="sks_kumulatif"
            name="sks_kumulatif"
            type="number"
            max={24}
            className="w-full p-1 disabled:bg-white text-base border-b-2 focus:outline-none focus:border-gray-500 transition duration-500"
            value={sksKumulatif}
            disabled={status === "sudah"}
            onChange={(e) => setSksKumulatif(e.target.value)}
          />
        </div>

        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="ip_semester">IP Semester</label>
        </div>
        <div className="flex justify-start mx-16 mt-2">
          <input
            id="ip_semester"
            name="ip_semester"
            type="number"
            className="w-full p-1 disabled:bg-white text-base border-b-2 focus:outline-none focus:border-gray-500 transition duration-500"
            value={ipSemester}
            disabled={status === "sudah"}
            onChange={(e) => setIpSemester(e.target.value)}
          />
        </div>

        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="ip_kumulatif">IP Kumulatif</label>
        </div>
        <div className="flex justify-start mx-16 mt-2">
          <input
            id="ip_kumulatif"
            name="ip_kumulatif"
            type="number"
            className="w-full p-1 disabled:bg-white text-base border-b-2 focus:outline-none focus:border-gray-500 transition duration-500"
            value={ipKumulatif}
            disabled={status === "sudah"}
            onChange={(e) => setIpKumulatif(e.target.value)}
          />
        </div>

        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="dropzone-file">Scan KHS</label>
        </div>
        <div className="flex justify-start mx-16 mt-2">
          {/* dropzone file */}
          <label
            htmlFor="dropzone-file"
            className={
              status === "sudah"
                ? "flex flex-col items-center justify-center w-full h-64 border rounded-xl hover:bg-gray-100 "
                : "flex flex-col items-center justify-center w-full h-64 border rounded-xl cursor-pointer hover:bg-gray-100 hover:border-blue-500"
            }
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-10 h-10 mb-3 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                ></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  {filename ? filename : "Upload file"}
                </span>
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {filename ? "" : "PDF up to 10MB"}
              </p>
            </div>
            <input
              disabled={status == "sudah"}
              id="dropzone-file"
              type="file"
              className="hidden"
            />
          </label>
        </div>
        <div className="flex justify-center mt-5">
          <button
            disabled={status === "sudah"}
            type="submit"
            className="disabled:bg-violet-300 disabled:cursor-not-allowed mb-2 px-10 h-10 text-white transition-colors duration-150 bg-violet-500 rounded-full shadow-lg focus:shadow-outline hover:bg-violet-600"
          >
            Simpan
          </button>
        </div>
        {status === "sudah" && (
          <p className="text-green-600 ml-2 text-center">
            *Data sudah diverifikasi, tidak dapat diubah
          </p>
        )}
      </form>
    </>
  );
}
