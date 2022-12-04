// next/ components
import Image from "next/image";
import useSWR from "swr";
import { useEffect, useState } from "react";
import Head from "next/head";

// Image
import anya from "../../public/anya.jpeg";

// Import another library
import { getCookie, setCookie } from "cookies-next";
import axios from "axios";

// Components
import SubmitMessage from "../../components/SubmitMessage";
import MenuTopLeft from "../../components/MenuTopLeft";
import MenuBotLeftMhsIndex from "../../components/MenuBotLeftMahasiswaIndex";

// Get token from cookies
const token = getCookie("accessToken");

// Email regex
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
// Phone regex
const phoneRegex = /^(\+62|62|0)(\d{3,4}-?){2}\d{3,4}$/;

// Fetching Provinsi
export async function getStaticProps() {
  const prov = await fetch("http://localhost:8080/api/provinsi");
  const provData = await prov.json();

  // Sort provData by name
  const sortedProvData = provData.sort((a, b) => {
    if (a.nama < b.nama) {
      return -1;
    }
    if (a.nama > b.nama) {
      return 1;
    }
    return 0;
  });

  return {
    props: {
      provData: sortedProvData,
    },
  };
}

// Fetching Kabupaten
const fetcher = (...args) => fetch(...args).then((res) => res.json());

// Fetcher with header x-access-token
const fetcherWithToken = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

export default function HomeMahasiswa({ provData }) {
  const [img, setImg] = useState(anya);
  const [alamat, setAlamat] = useState("");
  const [provinsi, setProvinsi] = useState("");
  const [kabupaten, setKabupaten] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Success message state
  const [success, setSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  // Fetch kabupaten data when provinsi is not empty
  const { data: kabData, errorKab } = useSWR(
    provinsi ? `${process.env.BACKEND_API}/api/kabupaten/${provinsi}` : null,
    fetcher
  );

  // Fetch mahasiswa data
  const { data: dataMhs, error: errorMhs } = useSWR(
    `${process.env.BACKEND_API}/profil`,
    fetcherWithToken
  );

  // Handle change image when uploaded file
  const handleChangeImage = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();

    if (
      alamat === "" ||
      provinsi === "" ||
      kabupaten === "" ||
      email === "" ||
      phone === ""
    ) {
      setSuccess(false);
      setMessage("Semua field harus diisi");
      return;
    }

    // If email is not valid regex
    if (!emailRegex.test(email)) {
      setSuccess(false);
      setMessage("Email tidak valid");
      return;
    }

    // If phone is not valid regex
    if (!phoneRegex.test(phone)) {
      setSuccess(false);
      setMessage("Nomor telepon tidak valid");
      return;
    }

    if (emailRegex.test(email) && phoneRegex.test(phone)) {
      const res = await axios.put(
        `${process.env.BACKEND_API}/profil`,
        {
          alamat,
          kodeKab: kabupaten,
          email,
          phone,
        },
        {
          headers: {
            "x-access-token": token,
          },
        }
      );
      // If success, set success to true, else false
      if (res.status === 200) {
        setSuccess(true);
        // Refetch data
        dataMhs.alamat = alamat;
        dataMhs.kodeKab = kabupaten;
        dataMhs.email = email;
        dataMhs.phone = phone;

        // Set new token from res.data
        setCookie("accessToken", res.data, {
          maxAge: 60 * 60 * 12,
        });

        
      } else {
        setSuccess(false);
      }
    } else {
      setSuccess(false);
    }
  };

  useEffect(() => {
    if (dataMhs) {
      if (dataMhs.kodeKab) {
        const provCode = dataMhs.kodeKab.substring(0, 2);
        setProvinsi(provCode);
        setKabupaten(dataMhs.kodeKab);
      }
      setAlamat(dataMhs.alamat);
      setEmail(dataMhs.email);
      setPhone(dataMhs.phone);
    }
  }, [dataMhs]);

  return (
    <div className="flex justify-center">
      <div className="flex justify-center gap-5 py-10 w-3/4">
        <div className="w-1/4">
          <MenuTopLeft role="Mahasiswa" name={dataMhs && dataMhs.name} />
          <MenuBotLeftMhsIndex dataMhs={dataMhs} />
        </div>
        <div className="w-3/4 pb-3 bg-white rounded-lg shadow-lg">
          <Head>
            <title>Home Mahasiswa</title>
          </Head>

          <SubmitMessage success={success} name={"data"} message={message} />
          <div className="grid grid-cols-4 mx-12 my-5">
            <h2 className="text-left font-bold w-1/4 text-2xl">Profil</h2>
            <div className="w-32 h-32 relative col-span-3">
              <Image
                layout="fill"
                className="rounded-full"
                src={img}
                alt="photo-profile"
              />
              <label htmlFor="photo">
                <div className="absolute bottom-0 right-0">
                  <div className="w-8 h-8 bg-gray-300 hover:bg-gray-400 hover:cursor-pointer rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                      />
                    </svg>
                  </div>
                </div>
              </label>
            </div>
          </div>
          <div className="grid grid-cols-4 mx-12 my-5">
            <h2 className="text-left font-bold text-2xl">Basic Info</h2>
            <div className="col-span-3">
              <label className="block" htmlFor="name">
                Nama Lengkap
              </label>
              <input
                className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white cursor-not-allowed"
                type="text"
                id="name"
                name="name"
                value={dataMhs ? dataMhs.name : ""}
                disabled
              />
              <label htmlFor="nim" className="block">
                NIM
              </label>
              <input
                className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white cursor-not-allowed"
                type="number"
                id="nim"
                name="nim"
                value={dataMhs ? dataMhs.nim : ""}
                disabled
              />
              <label htmlFor="angkatan" className="block">
                Angkatan
              </label>
              <input
                className="border-b-2 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white cursor-not-allowed"
                type="number"
                id="angkatan"
                name="angkatan"
                value={dataMhs ? dataMhs.angkatan : ""}
                disabled
              />
            </div>
          </div>
          <div className="grid grid-cols-4 mx-12 my-5">
            <h2 className="text-left font-bold text-2xl">Address</h2>
            <div className="col-span-3">
              <label className="block mb-1" htmlFor="alamat">
                Alamat
              </label>
              <textarea
                id="alamat"
                className="border-2 mb-5 w-full rounded-xl focus:outline-none focus:border-gray-500 p-2 px-3"
                name="alamat"
                value={alamat}
                onChange={(e) => setAlamat(e.target.value)}
              ></textarea>
              <label htmlFor="provinsi" className="block">
                Provinsi
              </label>
              <select
                onChange={(e) => setProvinsi(e.target.value)}
                id="provinsi"
                name="provinsi"
                className=" w-full mb-5 h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:shadow-outline"
                value={provinsi}
              >
                <option value="">Pilih Provinsi</option>
                {/* For every array, show provinsi */}
                {provData.map((prov) => (
                  <option key={prov.id} value={prov.id}>
                    {prov.nama}
                  </option>
                ))}
              </select>
              <label htmlFor="kabupaten" className="block">
                Kabupaten
              </label>
              <select
                id="kabupaten"
                name="kabupaten"
                className="w-full h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:shadow-outline"
                value={kabupaten}
                onChange={(e) => setKabupaten(e.target.value)}
              >
                <option value="">Pilih Kabupaten</option>
                {/* For every array, show kabupaten */}
                {kabData?.map((kab) => (
                  <option key={kab.id} value={kab.id}>
                    {kab.nama}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-4 mx-12 my-5">
            <h2 className="text-left font-bold text-2xl">Contact</h2>
            <div className="col-span-3">
              <label className="block" htmlFor="email">
                Email
              </label>
              <input
                className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full"
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="block" htmlFor="phone">
                No. HP
              </label>
              <input
                className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full"
                type="tel"
                id="phone"
                name="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                type="file"
                hidden
                id="photo"
                accept="image/png, image/jpg, image/jpeg"
                name="photo"
                onChange={(e) => handleChangeImage(e)}
              />
              <div className="flex justify-end">
                <button
                  onClick={handleUpdateProfile}
                  className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full"
                >
                  Simpan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
