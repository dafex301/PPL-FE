import TableDataMahasiswa from "../../components/mahasiswa/TableDataMahasiswa";

export default function DataPKL() {
  return (
    <> 
      <TableDataMahasiswa API={`${process.env.BACKEND_API}/list-mahasiswa`} />
    </>
  );
}