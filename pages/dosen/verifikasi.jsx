// Next Components
import Head from "next/head";
import { useState, useEffect } from "react";
import useSWR from "swr";
import { getCookie } from "cookies-next";

// Import functions
import { searchData } from "../../utils/functions/searchData";

// Import Components
import Card from "../../components/Card";
import Search from "../../components/Search";

// Other data
const currentYear = new Date().getFullYear();

const token = getCookie("accessToken");
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

export default function Verifikasi() {
  // Get IRS data
  const { data: dataIrs, error: errorIrs } = useSWR(
    `${process.env.BACKEND_API}/verifikasi/irs`,
    fetcher
  );

  // Get KHS data
  const { data: dataKhs, error: errorKhs } = useSWR(
    `${process.env.BACKEND_API}/verifikasi/irs`,
    fetcher
  );

  // Get PKL data
  const { data: dataPkl, error: errorPkl } = useSWR(
    `${process.env.BACKEND_API}/verifikasi/pkl`,
    fetcher
  );

  // Get Skripsi data
  const { data: dataSkripsi, error: errorSkripsi } = useSWR(
    `${process.env.BACKEND_API}/verifikasi/skripsi`,
    fetcher
  );

  // State
  const [angkatan, setAngkatan] = useState("");
  const [irs, setIrs] = useState(true);
  const [khs, setKhs] = useState(false);
  const [pkl, setPkl] = useState(false);
  const [skripsi, setSkripsi] = useState(false);
  const [data, setData] = useState([]);

  // Search
  const [search, setSearch] = useState("");
  const [kategori, setKategori] = useState("nama");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleKategori = (e) => {
    setKategori(e.target.value);
  };

  // Handle Card
  const openIrs = () => {
    setIrs(true);
    setKhs(false);
    setPkl(false);
    setSkripsi(false);
  };

  const openKhs = () => {
    setIrs(false);
    setKhs(true);
    setPkl(false);
    setSkripsi(false);
  };

  const openPkl = () => {
    setIrs(false);
    setKhs(false);
    setPkl(true);
    setSkripsi(false);
  };

  const openSkripsi = () => {
    setIrs(false);
    setKhs(false);
    setPkl(false);
    setSkripsi(true);
  };

  // Set the initial data
  useEffect(() => {
    if (irs && dataIrs) {
      setData(dataIrs);
    } else if (pkl && dataPkl) {
      console.log(dataPkl);
      setData(dataPkl);
    } else if (skripsi && dataSkripsi) {
      setData(dataSkripsi);
    }
  }, [irs, pkl, skripsi, dataIrs, dataPkl, dataSkripsi]);

  // Search the data
  useEffect(() => {
    if (irs && dataIrs) {
      setData(searchData(dataIrs, kategori, search));
    } else if (khs && dataKhs) {
      setData(searchData(dataKhs, kategori, search));
    } else if (pkl && dataPkl) {
      setData(searchData(dataPkl, kategori, search));
    } else if (skripsi && dataSkripsi) {
      setData(searchData(dataSkripsi, kategori, search));
    }
  }, [
    search,
    kategori,
    irs,
    dataIrs,
    khs,
    dataKhs,
    pkl,
    dataPkl,
    skripsi,
    dataSkripsi,
  ]);

  return (
    <>
      <Head>
        <title>Verifikasi Berkas</title>
      </Head>
      <div className="mx-8 flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-left font-bold text-2xl">Verifikasi Berkas</h2>

          <div className="">
            <label htmlFor="angkatan">Angkatan:</label>
            <select
              onChange={(e) => {
                setAngkatan(e.target.value);
              }}
              id="angkatan"
              className="cursor-pointer ml-1"
            >
              <option value="">Semua</option>
              {[...Array(5)].map((_, i) => (
                <option key={currentYear - i} value={currentYear - i}>
                  {currentYear - i}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* End of Header */}

        {/* Cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 ">
          <Card
            name="IRS"
            color="cyan"
            status={irs}
            handleStatus={openIrs}
            data={dataIrs ? dataIrs.length : 0}
          />
          <Card
            name="KHS"
            color="sky"
            status={khs}
            handleStatus={openKhs}
            data={dataKhs ? dataKhs.length : 0}
          />
          <Card
            name="PKL"
            color="blue"
            status={pkl}
            handleStatus={openPkl}
            data={dataPkl ? dataPkl.length : 0}
          />
          <Card
            name="Skripsi"
            color="indigo"
            status={skripsi}
            handleStatus={openSkripsi}
            data={dataSkripsi ? dataSkripsi.length : 0}
          />
        </div>
        {/* End of Cards */}

        {/* Search */}
        <Search
          setSearch={handleSearch}
          setKategori={handleKategori}
          kategori={kategori}
          listKategori={["Nama", "NIM"]}
        />
        {/* End of Search */}

        {/* Table IRS */}
        {irs && (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Nama
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  NIM
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Angkatan
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Semester
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  SKS
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {dataIrs &&
                data.map((item) => (
                  <tr key={item.irs_id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {item.nim}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {item.angkatan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {item.semester_aktif}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {item.sks}
                      </div>
                    </td>
                    <td className="px-6 flex gap-2 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-white bg-blue-500 hover:bg-blue-700 cursor-pointer px-2 py-1 rounded-full">
                        Detail
                      </div>
                      <div className="text-sm leading-5 text-white bg-green-500 hover:bg-green-700 cursor-pointer px-2 py-1 rounded-full">
                        Konfirmasi
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {/* End of Table IRS */}

        {/* Table PKL */}
        {pkl && (
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Nama
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  NIM
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Angkatan
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Semester
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  SKS
                </th>
                <th className="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {dataPkl &&
                data.map((item) => (
                  <tr key={item.irs_id}>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm leading-5 font-medium text-gray-900">
                            {item.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {item.nim}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {item.angkatan}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {item.semester_aktif}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-gray-900">
                        {item.sks}
                      </div>
                    </td>
                    <td className="px-6 flex gap-2 py-4 whitespace-no-wrap border-b border-gray-200">
                      <div className="text-sm leading-5 text-white bg-blue-500 hover:bg-blue-700 cursor-pointer px-2 py-1 rounded-full">
                        Detail
                      </div>
                      <div className="text-sm leading-5 text-white bg-green-500 hover:bg-green-700 cursor-pointer px-2 py-1 rounded-full">
                        Konfirmasi
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        )}
        {/* End of Table PKL */}
      </div>
    </>
  );
}
