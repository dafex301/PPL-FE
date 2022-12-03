import RekapStatistik from "../../components/charts/RekapStatistik";

export default function DataPKL() {
  return (
    <>
      <RekapStatistik
        role={"departemen"}
        label={"PKL"}
        API={`${process.env.BACKEND_API}/all-pkl`}
      />
    </>
  );
}
