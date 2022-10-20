// React and Next library
import Head from "next/head";
import { useState, useEffect } from "react";

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

export default function SkripsiMahasiswa() {
  // Fetch data if it's already exist
  const { data, error } = useSWR(
    `${process.env.BACKEND_API}/skripsi`,
    fetcherWithToken
  );
  
  // Maintain state
  const [semester, setSemester] = useState("");
  const [nilai, setNilai] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [filename, setFileName] = useState("");
  const [status, setStatus] = useState("belum");
  const [file, setFile] = useState(null);

  // Handle Submit POST type of multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("semester", semester);
    formData.append("nilai", nilai);
    formData.append("tanggal", tanggal);
    formData.append("file", file);

    try {
      const res = await fetch(`${process.env.BACKEND_API}/skripsi`, {
        method: "POST",
        body: formData,
        headers: {
          "x-access-token": token,
        },
      });
      const data = await res.json();
    } catch (err) {
      alert("Data gagal disimpan");
    }
  };

  useEffect(() => {
    if (data) {
      setSemester(data.semester);
      setNilai(data.nilai);
      setStatus(data.status_konfirmasi);
      setTanggal(new Date(data.tanggal).toISOString().split("T")[0]);
      setFileName(data.file);
    }
  }, [data]);

  useEffect(() => {
    if (file) {
      setFileName(file.name);
    }
  }, [file]);

  return (
    <>
      <Head>
        <title>Skripsi Mahasiswa</title>
      </Head>
      <form encType="multipart/form-data">
        <div className="flex">
          <h2 className="text-left font-bold text-2xl pl-5 pt-4">
            Data Skripsi
          </h2>
        </div>

        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="semester">Lama Studi (Semester)</label>
        </div>
        <div className="flex justify-start mx-16 mt-2">
          <select
            id="semester"
            name="semester"
            className="w-full h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:outline-gray-500"
            placeholder="Semester"
            value={semester}
            disabled={status === "sudah"}
            onChange={(e) => setSemester(e.target.value)}
          >
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
          <label htmlFor="nilai">Nilai Skripsi</label>
        </div>
        {/* dropdown menu */}
        <div className="flex justify-start mx-16 mt-2">
          <select
            id="nilai"
            name="nilai"
            className="w-full h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:outline-gray-500"
            placeholder="Semester"
            value={nilai}
            onChange={(e) => setNilai(e.target.value)}
            disabled={status === "sudah"}
          >
            <option value="" disabled>
              Pilih Nilai
            </option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="tgl_sidang">Tanggal Sidang</label>
        </div>
        <div className="flex justify-start mx-16 mt-2">
          <input
            id="tgl_sidang"
            name="tgl_sidang"
            type="date"
            max={24}
            className="w-full p-1 text-base border-b-2 focus:outline-none focus:border-gray-500 disabled:bg-white transition duration-500"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
            disabled={status === "sudah"}
          />
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
                {filename ? "" : "PDF up to 10MB"}
              </p>
            </div>
            <input
              disabled={status == "sudah"}
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </label>
        </div>
        <div className="flex justify-center mt-5">
          <button
            disabled={status === "sudah"}
            type="submit"
            className="disabled:bg-violet-300 disabled:cursor-not-allowed mb-2 px-10 h-10 text-white transition-colors duration-150 bg-violet-500 rounded-full shadow-lg focus:shadow-outline hover:bg-violet-600"
            onClick={handleSubmit}
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
