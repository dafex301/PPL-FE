import TableDataMahasiswa from "../../components/mahasiswa/TableDataMahasiswa";

export default function DataPKL() {
  return (
    <> 
      <TableDataMahasiswa role={'dosen'} API={`${process.env.BACKEND_API}/mahasiswa-dosen`} />
    </>
  );
}