import Head from "next/head";
import useSWR from "swr";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
const token = getCookie("accessToken");
import dynamic from "next/dynamic";

// fetcher function with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

  const PieChart = dynamic(() => import("../../components/charts/PieChart"), {
    ssr: false,
  });

export default function HomeDepartemen() {
  const [nama, setName] = useState("");
  const { data: rekapData, errorKab } = useSWR(
    "http://localhost:8080/all-skripsi",
    fetcher
  );
  console.log(rekapData);
  return (
    <>
      <Head></Head>
    </>
  );
}
