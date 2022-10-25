import Head from "next/head";
import { useState } from "react";

// Import Components
import Card from "../../components/Card";
import Search from "../../components/Search";

export default function Verifikasi() {
  // State
  const [angkatan, setAngkatan] = useState("");
  const [irs, setIrs] = useState(true);
  const [khs, setKhs] = useState(false);
  const [pkl, setPkl] = useState(false);
  const [skripsi, setSkripsi] = useState(false);

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

  // Other data
  const currentYear = new Date().getFullYear();
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
            data={10}
          />
          <Card
            name="KHS"
            color="sky"
            status={khs}
            handleStatus={openKhs}
            data={21}
          />
          <Card
            name="PKL"
            color="blue"
            status={pkl}
            handleStatus={openPkl}
            data={5}
          />
          <Card
            name="Skripsi"
            color="indigo"
            status={skripsi}
            handleStatus={openSkripsi}
            data={2}
          />
        </div>
        {/* End of Cards */}

        {/* Search */}
        {/* Search */}
        <Search
          setSearch={handleSearch}
          setKategori={handleKategori}
          kategori={kategori}
          listKategori={["Nama", "NIM"]}
        />
        {/* End of Search */}
      </div>
    </>
  );
}
