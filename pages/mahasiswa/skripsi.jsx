// React and Next library
import Head from "next/head";
import { useState, useEffect } from "react";

// Import another library
import { getCookie } from "cookies-next";
import useSWR, { useSWRConfig } from "swr";
import SubmitMessage from "../../components/SubmitMessage";
import FileUpload from "../../components/FileUpload";
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

export default function SkripsiMahasiswa() {
  // Maintain state
  const [semester, setSemester] = useState("");
  const [nilai, setNilai] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [status, setStatus] = useState("belum");

  // File state
  const [filename, setFileName] = useState("");
  const [file, setFile] = useState(null);

  // Success message state
  const [success, setSuccess] = useState(null);
  const [validFile, setValidFile] = useState(true);

  // Fetch data if it's already exist, refetch after change page
  const { data, error } = useSWR(
    `${process.env.BACKEND_API}/skripsi`,
    fetcherWithToken
  );
  const { mutate } = useSWRConfig();

  // Handle Submit POST type of multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if all input is filled
    if (semester && nilai && tanggal && filename) {
      let formData = new FormData();
      formData.append("semester", semester);
      formData.append("nilai", nilai);
      formData.append("tanggal", tanggal);
      if (file) {
        formData.append("file", file);
      }

      try {
        const res = await fetch(`${process.env.BACKEND_API}/skripsi`, {
          method: "POST",
          body: formData,
          headers: {
            "x-access-token": token,
          },
        });

        if (res.status === 200) {
          setSuccess(true);

          // Run SWR optimistic update
          mutate(`${process.env.BACKEND_API}/skripsi`, {
            semester: semester,
            nilai: nilai,
            tanggal: tanggal,
            file: filename,
            status: status,
          });
        }
      } catch (err) {
        console.log(err);
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
      if (data.tanggal) {
        let tgl = new Date(data.tanggal);
        tgl = tgl.toISOString().split("T")[0];
        setTanggal(tgl);
      }
      setFileName(data.file);
    }
  }, [data]);

  // Handle file uploaded
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
        <title>Skripsi Mahasiswa</title>
      </Head>

      {/* Message */}
      <SubmitMessage success={success} name={"skripsi"} />
      {/* End of Message */}

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

        {/* Upload File */}
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
