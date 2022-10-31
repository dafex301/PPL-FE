import React from 'react'
import DetailPage from '../../../components/detail/detailPage';
import { useRouter } from "next/router";
import useSWR from "swr";
import { getCookie } from "cookies-next";
const token = getCookie("accessToken");

// Asset
import anya from "../../../public/anya.jpeg";

// Component
import Modal from "../../../components/Modal";
import { useState, useEffect } from "react";

// fetcher function with token
const fetcher = (...args) =>
  fetch(...args, {
    headers: {
      "x-access-token": token,
    },
  }).then((res) => res.json());

export default function DetailMhs() {
  // nilai NIM dari paramter
  const router = useRouter();
  const { nim } = router.query;

  // state 
  const [name, setName] = useState("");
  const [angkatan, setAngkatan] = useState(0);
  const [pdf, setPdf] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  // API ke backend
  const API = `${process.env.BACKEND_API}/dosen/mahasiswa/${nim}`;
  // fetch data using nim from paramter
  const { data: dataMhs, errorKab } = useSWR(`${process.env.BACKEND_API}/dosen/mahasiswa/${nim}`, fetcher);

  const handleModal = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (dataMhs) {
      setName(dataMhs.name);
      setAngkatan(parseInt(dataMhs.angkatan));
    }
  }, [dataMhs]);

  const downloadIrs = (irs) => {
    // GET method on /irs/:nim/:semester
    fetch(`${process.env.BACKEND_API}/irs/${irs.nim}/${irs.semester_aktif}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Download and open PDF in new tab
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setIsOpen(!isOpen);
        setPdf(fileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadKhs = (khs) => {
    fetch(`${process.env.BACKEND_API}/khs/${khs.nim}/${khs.semester_aktif}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Download and open PDF in new tab
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setIsOpen(!isOpen);
        setPdf(fileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadPkl = (pkl) => {
    fetch(`${process.env.BACKEND_API}/pkl/${pkl.nim}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Download and open PDF in new tab
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setIsOpen(!isOpen);
        setPdf(fileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const downloadSkripsi = (skripsi) => {
    fetch(`${process.env.BACKEND_API}/skripsi/${skripsi.nim}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => res.blob())
      .then((blob) => {
        // Download and open PDF in new tab
        const file = new Blob([blob], { type: "application/pdf" });
        const fileURL = URL.createObjectURL(file);
        setIsOpen(!isOpen);
        setPdf(fileURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };


function DetailMahasiswaDosen() {
    // nilai NIM dari paramter
    const router = useRouter();
    const { nim } = router.query;
  return (
    <>
      <DetailPage role={"dosen"} API={`${process.env.BACKEND_API}/dosen/mahasiswa/${nim}`}  nim={nim} />
    </>
  )
}

export default DetailMahasiswaDosen; 