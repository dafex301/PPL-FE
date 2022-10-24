import Head from "next/head";
import useSWR from "swr";
import { getCookie } from "cookies-next";
import { useState, useEffect } from "react";
const token = getCookie("accessToken");

// fetcher function with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

export default function HomeDepartemen() {
  const [nama, setName] = useState("");
  const { data: rekapData, errorKab } = useSWR(
    "http://localhost:8080/all-skripsi",
    fetcher
  );
  console.log(rekapData);
  // if(rekapData){
  //   return <p>{rekapData[0].nama}</p>
  // }
  return (
    <>
      <Head></Head>
    </>
  );
}
