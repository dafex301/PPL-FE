import DonutChart from "../../components/charts/DonutChart";
import TableDataMahasiswa from "../../components/mahasiswa/TableDataMahasiswa";

export default function DataPKL() {
  return (
    <> 
      <TableDataMahasiswa role={'departemen'} API={`${process.env.BACKEND_API}/list-mahasiswa`} />
    </>
  );
}