import RekapStatistik from "../../components/charts/RekapStatistik";

export default function DataPKL() {
  return (
    <>
      <RekapStatistik API={`${process.env.BACKEND_API}/all-skripsi`} />
    </>
  );
}
