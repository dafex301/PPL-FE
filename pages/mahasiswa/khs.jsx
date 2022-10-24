// Next and React Component
import Head from "next/head";
import { useEffect, useState } from "react";

// Import another library
import { getCookie } from "cookies-next";
import useSWR, { useSWRConfig } from "swr";

// Components
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

export default function KhsMahasiswa() {
  // Fetch data
  const { data, error } = useSWR(
    `${process.env.BACKEND_API}/khs`,
    fetcherWithToken
  );
  const { mutate } = useSWRConfig();

  // Input State
  const [semester, setSemester] = useState("");
  const [sksSemester, setSksSemester] = useState("");
  const [sksKumulatif, setSksKumulatif] = useState("");
  const [ipSemester, setIpSemester] = useState("");
  const [ipKumulatif, setIpKumulatif] = useState("");
  const [status, setStatus] = useState("belum");

  // File State
  const [filename, setFileName] = useState("");
  const [file, setFile] = useState(null);

  // Success message state
  const [success, setSuccess] = useState(null);
  const [validFile, setValidFile] = useState(true);
  const [message, setMessage] = useState(null);

  // Handle Submit POST type of multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all input is filled
    if (
      semester &&
      sksSemester &&
      sksKumulatif &&
      ipSemester &&
      ipKumulatif &&
      filename
    ) {
      let formData = new FormData();
      formData.append("semester_aktif", semester);
      formData.append("sks", sksSemester);
      formData.append("sks_kumulatif", sksKumulatif);
      formData.append("ip", ipSemester);
      formData.append("ip_kumulatif", ipKumulatif);

      if (file) {
        formData.append("file", file);
      }

      try {
        const res = await fetch(`${process.env.BACKEND_API}/khs`, {
          method: "POST",
          headers: {
            "x-access-token": token,
          },
          body: formData,
        });

        const json = await res.json();

        if (json) {
          mutate(`${process.env.BACKEND_API}/khs`);
          setSuccess(true);
        }
      } catch (err) {
        console.log(err);
        setSuccess(false);
      }
    } else {
      setSuccess(false);
      setMessage("Semua input harus diisi");
    }
    window.scrollTo(0, 0);
  };

  // Update data if data is exist
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

  // Handle file upload
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
        <title>KHS Mahasiswa</title>
      </Head>
      <SubmitMessage success={success} name={"khs"} message={message} />
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
            disabled={status === "sudah" || semester == "" || semester == ""}
            onChange={(e) => setSksSemester(e.target.value)}
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
            disabled={status === "sudah" || semester == ""}
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
            disabled={status === "sudah" || semester == ""}
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
            disabled={status === "sudah" || semester == ""}
            onChange={(e) => setIpKumulatif(e.target.value)}
          />
        </div>

        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="dropzone-file">Scan KHS</label>
        </div>
        <FileUpload
          status={status}
          filename={filename}
          setFile={setFile}
          validFile={validFile}
          semester={semester}
          filetype={"pdf"}
        />
        <SaveFormButton
          semester={semester}
          status={status}
          handleSubmit={handleSubmit}
        />
        {status === "sudah" && (
          <p className="text-green-600 ml-2 text-center">
            *Data sudah diverifikasi, tidak dapat diubah
          </p>
        )}
      </form>
    </>
  );
}
