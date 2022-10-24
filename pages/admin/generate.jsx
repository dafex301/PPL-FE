// Import next/react components
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import useSWR from "swr";

// Import components
import FileUpload from "../../components/FileUpload";

// Import assets
import anya from "../../public/anya.jpeg";
import Link from "next/link";

const token = getCookie("accessToken");

export default function GenerateAdmin() {
  const fetcher = async (url, headers) =>
    await fetch(url, { method: "GET", headers }).then((res) => res.json());

  const dosen_url = `${process.env.BACKEND_API}/list-dosen`;
  const headers = {
    "x-access-token": token,
  };

  const { data: dosen } = useSWR([dosen_url, headers], fetcher);

  const axios = require("axios").default;

  const [name, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [kodeWali, setKodeWali] = useState("");
  const [status, setStatus] = useState("aktif");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // File state
  const [filename, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [validFile, setValidFile] = useState(true);

  // Handle file upload
  useEffect(() => {
    if (file) {
      if (file.name.split(".").pop() !== "csv") {
        setFile(null);
        setValidFile(false);
      } else {
        setFileName(file.name);
        setValidFile(true);
      }
    }
  }, [file]);

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
          kodeWali: kodeWali,
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
        setKodeWali("");
        setStatus("Aktif");
      })
      .catch((error) => {
        setError("Gagal generate akun!");
        setSuccess("");
      });
  };

  const handleGenerateBatch = async (e) => {
    // Generate batch account to BACKEND_API/generate-batch
    // Set the request header to x-access-token with token
    // Set the request body to file
    // If success, show success message
    // If failed, show error message
    if (file) {
      e.preventDefault();
      setSuccess("");
      setError("");
      const formData = new FormData();
      formData.append("file", file);
      // Fetch with POST method
      try {
        const res = await fetch(`${process.env.BACKEND_API}/batch-generate`, {
          method: "POST",
          headers: {
            "x-access-token": token,
          },
          body: formData,
        });
        const data = await res.json();
        if (data.status === "success") {
          setSuccess("Berhasil generate akun!");
          setError("");
          setFile(null);
          setFileName("");
        } else {
          setError("Gagal generate akun!");
          setSuccess("");
        }
      } catch (error) {
        setError("Gagal generate akun!");
        setSuccess("");
      }
    }
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
              className="border-b-2 mb-5 py-1 focus:outline-none focus:border-gray-500 w-full "
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Aktif">Aktif</option>
              <option value="Cuti">Cuti</option>
              <option value="Mangkir">Mangkir</option>
              <option value="Drop Out">Drop Out</option>
              <option value="Undur Diri">Undur Diri</option>
              <option value="Lulus">Lulus</option>
              <option value="Meninggal Dunia">Meninggal Dunia</option>
            </select>
            <label htmlFor="status" className="block text-sm text-gray-700">
              Kode Wali
            </label>
            {/* make select option with value of id kode wali */}
            <select
              name="kodeWali"
              id="kodeWali"
              className="border-b-2 mb-5 py-1 focus:outline-none focus:border-gray-500 w-full "
              value={kodeWali}
              onChange={(e) => setKodeWali(e.target.value)}
            >
              <option value={""}>Pilih Dosen</option>
              {/* show dosen  */}
              {dosen &&
                dosen.map((dosen) => (
                  <option key={dosen._id} value={dosen._id}>
                    {dosen.name} - {dosen.nip}
                  </option>
                ))}
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
      <div className="mx-5 my-5">
        <div className="flex items-center mt-5">
          <div className="w-full mr-5 bg-gray-300 h-0.5"></div>
          <div className="text-gray-500">atau</div>
          <div className="w-full ml-5 bg-gray-300 h-0.5"></div>
        </div>
        <div className="flex items-center justify-between">
          <h2 className="text-left font-bold text-2xl my-2">
            Generate Akun Batch
          </h2>
          <Link href="">
            <a className="text-violet-700 hover:text-violet-900">
              Download Template
            </a>
          </Link>
        </div>
        <FileUpload
          filename={filename}
          setFile={setFile}
          validFile={validFile}
          filetype={"csv"}
        />
        <div className="flex justify-center mt-5">
          <button
            type="button"
            className={
              filename
                ? "bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full"
                : "bg-gray-300 text-white font-bold py-2 px-4 rounded-full cursor-not-allowed"
            }
            onClick={handleGenerateBatch}
          >
            Generate
          </button>
        </div>
      </div>
    </>
  );
}
