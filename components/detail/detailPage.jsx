// Next
import Head from "next/head";
import Image from "next/image";

import useSWR from "swr";
import { getCookie } from "cookies-next";
const token = getCookie("accessToken");

// Asset
import anya from "../../public/anya.jpeg";

// Component
import Modal from "../Modal";
import { useState, useEffect } from "react";

// fetcher function with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

const sems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

export default function DetailPage({ API, role, nim }) {
  // state
  const [name, setName] = useState("");
  const [angkatan, setAngkatan] = useState("");
  const [semNow, setSemNow] = useState(0);
  const { data: dataMhs, errorKab } = useSWR(API, fetcher);

  let [isOpen, setIsOpen] = useState(false);
  const [semesters, setSemesters] = useState(sems);
  const [semester, setSemester] = useState("");
  const [semPKL, setSemPKL] = useState("");
  const [semSkripsi, setSemSkripsi] = useState("");

  const [daftarSKS, setDaftarSKS] = useState([]);
  const [daftarIP, setDaftarIP] = useState([]);
  const [daftarIPK, setDaftarIPK] = useState([]);
  const [tglSkripsi, setTglSkripsi] = useState("");

  // state untuk event onclick
  const [sks, setSks] = useState("");
  const [sksk, setSksk] = useState("");
  const [ip, setIp] = useState("");
  const [ipk, setIpk] = useState("");
  const [npkl, setNpkl] = useState("-");
  const [nskripsi, setNskripsi] = useState("-");
  // fungsi onclick
  const handleModal = (sem) => {
    if (dataMhs) {
      setIsOpen(!isOpen);
      setSemNow(sem);
      setSks(daftarSKS[sem - 1]);
      let sum = 0;
      for (let i = 0; i <= sem - 1; i++) {
        sum += daftarSKS[i];
      }
      setSksk(sum);
      setIp(daftarIP[sem - 1]);
      setIpk(daftarIPK[sem - 1]);
    }
  };

  useEffect(() => {
    if (dataMhs) {
      setName(dataMhs.name);
      setSemester(dataMhs.semester);
      setAngkatan(dataMhs.angkatan);
      setSemPKL(dataMhs.semester_PKL);
      setSemSkripsi(dataMhs.semester_skripsi);
      setDaftarSKS(dataMhs.sks);
      setDaftarIP(dataMhs.ip);
      setDaftarIPK(dataMhs.ipk);
      setNpkl(dataMhs.nilai_pkl);
      setNskripsi(dataMhs.nilai_skripsi);
      setTglSkripsi(dataMhs.tanggal);
    }
  }, [dataMhs, semesters]);

  const classPKL =
    "py-4 w-10/12 rounded-xl hover:bg-pink-700 cursor-pointer shadow-lg bg-pink-500 text-white text-center text-2xl";
  const classSkripsi =
    "py-4 w-10/12 rounded-xl hover:bg-orange-700 cursor-pointer shadow-lg bg-orange-500 text-white text-center text-2xl";
  const classIRS =
    "py-4 w-10/12 rounded-xl hover:bg-violet-700 cursor-pointer shadow-lg bg-violet-500 text-white text-center text-2xl";
  const classDisable =
    "py-4 w-10/12 rounded-xl cursor-not-allowed shadow-lg bg-violet-900 text-white text-center text-2xl";

  return (
    <>
      <Head>
        <title>Detail Mahasiswa</title>
      </Head>
      <Modal
        open={isOpen}
        handleModal={handleModal}
        sema={semNow}
        // untuk event onclick
        sks={sks}
        sksk={sksk}
        ip={ip}
        ipk={ipk}
        npkl={semNow === semPKL ? npkl : "-"}
        nskripsi={semNow === semSkripsi ? nskripsi : "-"}
        tglSkripsi={tglSkripsi}
        nim={nim}
      />
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
          {/* tombol tiap semester */}
          {semesters.map((sem, idx) => {
            sem === semPKL ? "" : "";
            return (
              <div
                onClick={sem <= semester ? () => handleModal(sem) : () => {}}
                key={idx}
                className={
                  sem <= semester
                    ? sem === semPKL
                      ? classPKL
                      : sem == semSkripsi
                      ? classSkripsi
                      : classIRS
                    : classDisable
                }
              >
                {sem}
              </div>
            );
          })}
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
