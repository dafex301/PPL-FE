// Next
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getCookie } from "cookies-next";
const token = getCookie("accessToken");

// Asset
import anya from "../../../public/anya.jpeg";

// Component
import Modal from "../../../components/Modal";
import { useState, useEffect } from "react";

// fetcher function with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

export default function DetailMhs() {
  // nilai NIM dari paramter
  const router = useRouter();
  const { nim } = router.query;

  // state 
  const [name, setName] = useState("");
  const [angkatan, setAngkatan] = useState(0);
  const [pdf, setPdf] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  // API ke backend
  const API = `${process.env.BACKEND_API}/dosen/mahasiswa/${nim}`;
  // fetch data using nim from paramter
  const { data: dataMhs, errorKab } = useSWR(`${process.env.BACKEND_API}/dosen/mahasiswa/${nim}`, fetcher);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (dataMhs) {
      setName(dataMhs.name);
      setAngkatan(parseInt(dataMhs.angkatan));
    }
  }, [dataMhs]);

  const downloadIrs = (irs) => {
    // GET method on /irs/:nim/:semester
    fetch(`${process.env.BACKEND_API}/irs/${irs.nim}/${irs.semester_aktif}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Download and open PDF in new tab
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setIsOpen(!isOpen);
        setPdf(fileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadKhs = (khs) => {
    fetch(`${process.env.BACKEND_API}/khs/${khs.nim}/${khs.semester_aktif}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Download and open PDF in new tab
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setIsOpen(!isOpen);
        setPdf(fileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadPkl = (pkl) => {
    fetch(`${process.env.BACKEND_API}/pkl/${pkl.nim}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Download and open PDF in new tab
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setIsOpen(!isOpen);
        setPdf(fileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadSkripsi = (skripsi) => {
    fetch(`${process.env.BACKEND_API}/skripsi/${skripsi.nim}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Download and open PDF in new tab
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setIsOpen(!isOpen);
        setPdf(fileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };



  return (
    <>
      <Head>
        <title>Detail Mahasiswa</title>
      </Head>
      <Modal open={isOpen} handleModal={handleModal} />
      <div className="grid grid-cols-4 mx-12 my-5">
        <h2 className="text-left font-bold w-1/4 text-2xl">Profil</h2>
        <div className="w-32 h-32 relative col-span-3">
          <Image
            layout="fill"
            className="rounded-full"
            src={anya}
            alt="photo-profile"
          />
        </div>
      </div>
      <div className="grid grid-cols-4 mx-12 my-5">
        <h2 className="text-left font-bold text-2xl">Info</h2>
        <div className="col-span-3">
          <label className="block" htmlFor="nama">
            Nama Lengkap
          </label>
          <input
            className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white "
            type="text"
            id="nama"
            name="nama"
            value={name}
            disabled
          />
          <label htmlFor="nim" className="block">
            NIM
          </label>
          <input
            className="border-b-2 mb-5 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white "
            type="number"
            id="nim"
            name="nim"
            value={nim}
            disabled
          />
          <label htmlFor="angkatan" className="block">
            Angkatan
          </label>
          <input
            className="border-b-2 p-1 focus:outline-none focus:border-gray-500 w-full disabled:text-gray-500 disabled:bg-white "
            type="number"
            id="angkatan"
            name="angkatan"
            value={angkatan}
            disabled
          />
        </div>
      </div>
      <div className="grid grid-cols-4 mx-12 my-5">
        <h2 className="text-left font-bold text-2xl">Semester</h2>
        <div className="col-span-3 grid grid-cols-4 gap-y-3">
          <div
            onClick={handleModal}
            className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl"
          >
            1
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            2
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            3
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            4
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            5
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-pink-700 cursor-pointer shadow-lg bg-pink-500 text-white text-center text-2xl">
            6
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl">
            7
          </div>
          <div className="py-4 w-10/12 rounded-xl hover:bg-orange-700 cursor-pointer shadow-lg bg-orange-500 text-white text-center text-2xl">
            8
          </div>
          <div className="py-4 w-10/12 rounded-xl  cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            9
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            10
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            11
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            12
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            13
          </div>
          <div className="py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl">
            14
          </div>
        </div>
        <div className="col-start-2 col-span-full mt-8">
          <p>Keterangan</p>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-violet-500 " />
            <p>Sudah diisikan (IRS dan KHS)</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-pink-500 " />
            <p>Sudah lulus PKL</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-orange-500 " />
            <p>Sudah lulus skripsi</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-sm bg-violet-900 " />
            <p>Belum diisikan</p>
          </div>
        </div>
      </div>
    </>
  );
}
