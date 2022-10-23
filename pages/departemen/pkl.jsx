import RekapStatistik from "../../components/charts/RekapStatistik";

export default function DataPKL() {

  return (
    <>
     <RekapStatistik API={"http://localhost:8080/all-pkl"} />
    </>
  );
}
