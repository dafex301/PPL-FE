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

export default function IrsMahasiswa(props) {
  // Fetch data
  const { data, error } = useSWR(
    `${process.env.BACKEND_API}/irs`,
    fetcherWithToken
  );
  const { mutate } = useSWRConfig();

  // Input State
  const [semester, setSemester] = useState("");
  const [sks, setSks] = useState("");
  const [status, setStatus] = useState("belum");

  // File State
  const [filename, setFileName] = useState("");
  const [file, setFile] = useState(null);

  // Success message state
  const [success, setSuccess] = useState(null);
  const [validFile, setValidFile] = useState(true);
  const [message, setMessage] = useState(null);

  // Handle submit POST type of multipart/form-data
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all input is filled
    if (semester && sks && filename) {
      // Create form data
      const formData = new FormData();
      formData.append("semester", semester);
      formData.append("sks", sks);
      if (file) {
        formData.append("file", file);
      }

      try {
        const res = await fetch(`${process.env.BACKEND_API}/irs`, {
          method: "POST",
          headers: {
            "x-access-token": token,
          },
          body: formData,
        });
        const json = await res.json();

        if (json) {
          mutate(`${process.env.BACKEND_API}/irs`);
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
      const irs = data.find((item) => item.semester == semester);
      if (irs) {
        setSks(irs.sks);
        setStatus(irs.status);
        setFileName(irs.file);
      } else {
        setSks("");
        setStatus("belum");
        setFileName("");
      }
    }
  }, [data, semester]);

  // Handle file upload
  useEffect(() => {
    if (file) {
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
        <title>IRS Mahasiswa</title>
      </Head>
      <SubmitMessage success={success} name={"irs"} message={message} />
      <h2 className="text-left font-bold text-2xl pl-5 pt-4">Data IRS</h2>
      <form>
        <div className="flex justify-start ml-16 mt-5">
          <label htmlFor="semester">Semester Aktif</label>
        </div>
        {/* dropdown menu */}
        <div className="flex justify-start mx-16 mt-2">
          <select
            id="semester"
            name="semester"
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
          <label htmlFor="irs">Jumlah SKS</label>
        </div>
        <div className="flex justify-start mx-16 mt-2">
          <input
            id="irs"
            name="irs"
            type="number"
            max={24}
            className="w-full p-1 text-base border-b-2 focus:outline-none focus:border-gray-500 transition duration-500"
            value={sks}
            onChange={(e) => setSks(e.target.value)}
          />
        </div>
        <div className="flex justify-start ml-16 mt-5">
          <p>Scan IRS</p>
        </div>
        <FileUpload
          status={status}
          filename={filename}
          setFile={setFile}
          validFile={validFile}
          semester={semester}
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
