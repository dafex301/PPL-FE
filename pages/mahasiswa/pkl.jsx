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

export default function PklMahasiswa() {
  const { data, error } = useSWR(
    `${process.env.BACKEND_API}/pkl`,
    fetcherWithToken
  );

  const [semester, setSemester] = useState("");
  const [nilai, setNilai] = useState("");
  const [status, setStatus] = useState("belum");
  const [filename, setFileName] = useState("");

  useEffect(() => {
    if (data) {
      setSemester(data.semester);
      setNilai(data.nilai);
      setStatus(data.status_konfirmasi);
      setFileName(data.file);
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>PKL Mahasiswa</title>
      </Head>
      <form>
        <div className="flex">
          <h2 className="text-left font-bold text-2xl pl-5 pt-4">Data PKL</h2>
        </div>
        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="semester_aktif">Semester Aktif</label>
        </div>

        <div className="flex justify-start mx-16 mt-2">
          <select
            id="semester_aktif"
            name="semester_aktif"
            disabled={status === "sudah"}
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            className="w-full h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:outline-gray-500"
            placeholder="Semester"
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
          <label htmlFor="pkl">Nilai PKL</label>
        </div>
        <div className="flex justify-start mx-16 mt-2">
          <select
            disabled={status === "sudah"}
            className="w-full h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:outline-gray-500"
            placeholder="Semester"
            id="pkl"
            name="pkl"
            value={nilai}
            onChange={(e) => setNilai(e.target.value)}
          >
            <option value="" disabled>
              Pilih Nilai PKL
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
            <option value="E">E</option>
          </select>
        </div>
        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="dropzone-file">Scan Berita Acara</label>
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
                {filename ? "" : "PDF, PNG, or JPG up to 10MB"}
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
