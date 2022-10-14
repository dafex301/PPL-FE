export default function Search({
  setSearch,
  setKategori,
  kategori,
  listKategori,
}) {
  return (
    <div className="w-full">
      <div className=" w-full flex">
        <select
          id="kategori"
          className="border border-gray-400 rounded-l-lg p-2 text-sm ml-5"
          onChange={setKategori}
        >
          {listKategori.map((kategori) => (
            <option key={kategori} value={kategori.toLowerCase()}>
              {kategori}
            </option>
          ))}
        </select>
        <input
          type={kategori === "nim" ? "number" : "text"}
          className="border border-gray-400 border-l-0 rounded-r-lg p-2 w-full mr-5"
          placeholder="Cari Mahasiswa"
          onChange={setSearch}
        />
      </div>
    </div>
  );
}
