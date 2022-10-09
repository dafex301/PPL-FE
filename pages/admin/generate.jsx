// Import navbar
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import { getCookie } from "cookies-next";
import anya from "../../public/anya.jpeg";

export default function GenerateAdmin() {
  const token = getCookie("accessToken");

  const axios = require("axios").default;

  const [name, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [status, setStatus] = useState("aktif");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGenerate = (e) => {
    // Generate account to BACKEND_API/generate
    // Set the request header to x-access-token with token
    // Set the request body to name, nim, angkatan, status
    // If success, show success message
    // If failed, show error message
    e.preventDefault();
    setSuccess("");
    setError("");
    axios
      .post(
        `${process.env.BACKEND_API}/generate`,
        {
          name: name,
          nim: nim,
          angkatan: angkatan,
          status: status,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      )
      .then((response) => {
        setSuccess("Berhasil generate akun!");
        setError("");
        setNama("");
        setNim("");
        setAngkatan("");
        setStatus("aktif");
      })
      .catch((error) => {
        setError("Gagal generate akun!");
        setSuccess("");
      });
  };

  return (
    <>
      <Head>
        <title>Generate Akun</title>
      </Head>
      {/* Show success and error message */}
      {success && (
        <div
          className="bg-green-100 border mx-5 border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">{success}</strong>
        </div>
      )}
      {error && (
        <div
          className="bg-red-100 mx-5 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">{error}</strong>
        </div>
      )}
      <h2 className="text-left font-bold text-2xl pl-5 pt-4">Generate Akun</h2>
      <form>
        <div className="flex ml-16 mt-5 items-start gap-12">
          <div className="flex-col gap-3 flex items-center justify-center">
            <div className="w-32 h-32">
              <Image alt="photo" className="rounded-full" src={anya} />
            </div>
            <label htmlFor="photo">
              <div className="flex items-center gap-3 cursor-pointer hover:font-semibold">
                <p className="">Upload</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-violet-500 hover:text-violet-700"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
              </div>
            </label>
            <input type="file" id="photo" name="photo" hidden />
          </div>
          <div className="w-full mr-16">
            <label className="block text-sm text-gray-700" htmlFor="name">
              Nama Lengkap
            </label>
            <input
              className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full "
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setNama(e.target.value)}
            />
            <label htmlFor="nim" className="block text-sm text-gray-700">
              NIM
            </label>
            <input
              className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full "
              type="number"
              id="nim"
              name="nim"
              value={nim}
              onChange={(e) => setNim(e.target.value)}
            />
            <label htmlFor="angkatan" className="block text-sm text-gray-700">
              Angkatan
            </label>
            <input
              className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full "
              type="number"
              id="angkatan"
              name="angkatan"
              value={angkatan}
              onChange={(e) => setAngkatan(e.target.value)}
            />
            <label htmlFor="status" className="block text-sm text-gray-700">
              Status
            </label>
            <select
              name="status"
              id="status"
              className="border-b-2 py-1 focus:outline-none focus:border-gray-500 w-full "
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="aktif">Aktif</option>
              <option value="cuti">Cuti</option>
              <option value="mangkir">Mangkir</option>
              <option value="do">DO</option>
              <option value="undur_diri">Undur Diri</option>
              <option value="lulus">Lulus</option>
              <option value="meninggal_dunia">Meninggal Dunia</option>
            </select>
            <div className="flex justify-center mt-5">
              <button
                type="button"
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full"
                onClick={handleGenerate}
              >
                Generate
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
