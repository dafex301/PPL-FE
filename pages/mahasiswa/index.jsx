// next/ components
import Image from "next/image";
import useSWR from "swr";
import { useState } from "react";
import { useRouter } from "next/router";

// Image
import anya from "../../public/anya.jpeg";
import Head from "next/head";

// Fetching Provinsi
export async function getStaticProps() {
  const prov = await fetch(
    "http://www.emsifa.com/api-wilayah-indonesia/api/provinces.json"
  );
  const provData = await prov.json();

  return {
    props: {
      provData,
    },
  };
}

// Fetching Kabupaten
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function HomeMahasiswa({ provData }) {
  const router = useRouter();
  const [img, setImg] = useState(anya);
  const [provinsi, setProvinsi] = useState("");

  // Fetch kabupaten data when provinsi is not empty
  const { data: kabData, error } = useSWR(
    provinsi
      ? `http://www.emsifa.com/api-wilayah-indonesia/api/regencies/${provinsi}.json`
      : null,
    fetcher
  );

  // Handle change image when uploaded file
  const handleChangeImage = (e) => {
    setImg(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <Head>
        <title>Home Mahasiswa</title>
      </Head>
      <div className="flex my-8 items-start mx-12">
        <h2 className="text-left font-bold w-1/4 text-2xl">Profil</h2>
        <div className="w-32 h-32 relative">
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
      <div className="flex gap-20 my-8 items-start mx-12">
        <h2 className="text-left font-bold text-2xl">Basic Info</h2>
        <div className="w-8/12">
          <label className="block" htmlFor="nama">
            Nama Lengkap
          </label>
          <input
            className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white cursor-not-allowed"
            type="text"
            id="nama"
            name="nama"
            value="Anya Forger"
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
            value="24060120110001"
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
            value={2020}
            disabled
          />
        </div>
      </div>
      <div className="flex gap-20 my-8 items-start mx-12">
        <h2 className="text-left font-bold text-2xl">Address</h2>
        <div className="w-8/12 ml-5">
          <label className="block mb-1" htmlFor="alamat">
            Alamat
          </label>
          <textarea
            id="alamat"
            className="border-2 mb-5 w-full rounded-xl focus:outline-none focus:border-gray-500 p-2"
          ></textarea>
          <label htmlFor="provinsi" className="block">
            Provinsi
          </label>
          <select
            onChange={(e) => setProvinsi(e.target.value)}
            id="provinsi"
            name="provinsi"
            className=" w-full mb-5 h-10 px-3 text-base bg-white placeholder-gray-600 border rounded-lg focus:shadow-outline"
          >
            <option selected value="" disabled>
              Pilih Provinsi
            </option>
            {provData.map((prov) => (
              <option key={prov.id} value={prov.id}>
                {prov.name}
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
          >
            <option value="" selected disabled>
              Pilih Kabupaten
            </option>
            {kabData &&
              kabData.map((kab) => (
                <option key={kab.id} value={kab.id}>
                  {kab.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="flex gap-20 my-8 items-start mx-12">
        <h2 className="text-left font-bold text-2xl">Contact</h2>
        <div className="w-8/12 ml-5">
          <label className="block" htmlFor="email">
            Email
          </label>
          <input
            className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full"
            type="email"
            id="email"
            name="email"
          />
          <label className="block" htmlFor="phone">
            No. HP
          </label>
          <input
            className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full"
            type="tel"
            id="phone"
            name="phone"
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
            <button className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded-full">
              Simpan
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
