// Next and React Component
import Head from "next/head";
import { useEffect, useState } from "react";

// Import another library
import { getCookie } from "cookies-next";
import useSWR, { useSWRConfig } from "swr";
import FileUpload from "../../components/FileUpload";
import SubmitMessage from "../../components/SubmitMessage";
import SaveFormButton from "../../components/SaveFormButton";

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
  const { mutate } = useSWRConfig();

  // Input State
  const [semester, setSemester] = useState("");
  const [nilai, setNilai] = useState("");
  const [status, setStatus] = useState("belum");

  // File state
  const [filename, setFileName] = useState("");
  const [file, setFile] = useState(null);

  // Success message state
  const [success, setSuccess] = useState(null);
  const [validFile, setValidFile] = useState(true);

  // Handle Submit POST type of multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all input is filled
    if (semester && nilai && filename) {
      let formData = new FormData();
      formData.append("semester", semester);
      formData.append("nilai", nilai);

      if (file) {
        formData.append("file", file);
      }

      try {
        const res = await fetch(`${process.env.BACKEND_API}/pkl`, {
          method: "POST",
          body: formData,
          headers: {
            "x-access-token": token,
          },
        });
        const data = await res.json();
        setSuccess(data.message);
        // Run SWR optimistic update
        mutate(`${process.env.BACKEND_API}/pkl`, {
          semester: semester,
          nilai: nilai,
          file: filename,
        });
      } catch (err) {
        setSuccess(false);
      }
    } else {
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (data) {
      setSemester(data.semester);
      setNilai(data.nilai);
      setStatus(data.status_konfirmasi);
      setFileName(data.file);
    }
  }, [data]);

  useEffect(() => {
    if (file) {
      // Check if the file.name ended with .pdf
      if (file.name.split(".").pop() !== "pdf") {
        setFile(null);
        setValidFile(false);
      } else {
        setFileName(file.name);
        setValidFile(true);
      }
    }
  }, [file]);

  return (
    <>
      <Head>
        <title>PKL Mahasiswa</title>
      </Head>

      <SubmitMessage success={success} name={"pkl"} />
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
        <FileUpload
          status={status}
          filename={filename}
          setFile={setFile}
          validFile={validFile}
        />
        <SaveFormButton status={status} handleSubmit={handleSubmit} />
        {status === "sudah" && (
          <p className="text-green-600 ml-2 text-center">
            *Data sudah diverifikasi, tidak dapat diubah
          </p>
        )}
      </form>
    </>
  );
}
