import * as React from "react";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { getCookie } from "cookies-next";
const token = getCookie("accessToken");
import Modal from "./ModalPdf";


export default function BasicTabs({
  sem,
  nim,
  sks,
  sksk,
  ip,
  ipk,
  npkl,
  nskripsi,
  tglSkripsi,
}) {

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

// Handle download
const downloadIrs = (irs) => {
  // GET method on /irs/:nim/:semester
  fetch(`${process.env.BACKEND_API}/irs/${irs.nim}/${irs.sem}`, {
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
  fetch(`${process.env.BACKEND_API}/khs/${khs.nim}/${khs.sem}`, {
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

 // Handle preview
 const handleModal = () => {
  setIsOpen(!isOpen);
};


  const [value, setValue] = React.useState(0);
  const [nilaiP, setNilaiP] = React.useState(0);
  const [nilaiS, setNilaiS] = React.useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [pdf, setPdf] = useState("");

  // const [nskripsi,setNskripsi] = React.useState(0);

  React.useEffect(() => {
    setNilaiP(npkl);
    setNilaiS(nskripsi);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Modal open={isOpen} url={pdf} handleModal={handleModal} />
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            textColor="secondary"
            indicatorColor="secondary"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            variant="fullWidth"
          >
            <Tab label="IRS" {...a11yProps(0)} />
            <Tab label="KHS" {...a11yProps(1)} />
            {nilaiP !== "-" ? <Tab label="PKL" {...a11yProps(2)} /> : ""}
            {nilaiS !== "-" ? <Tab label="Skripsi" {...a11yProps(2)} /> : ""}
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <div className="">
            <div className="flex justify-end w-full text-xl">{sem}</div>
            <div className="h-28 mb-7 flex-col flex justify-center items-center">
              <h3 className="text-md">Total SKS</h3>
              <h1 className="text-3xl font-bold">{sks} SKS</h1>
            </div>
            <button
              onClick={() => downloadIrs({ nim, sem })}
              className="block text-center w-1/2 mx-auto text-white rounded-full p-1 bg-violet-500 hover:bg-violet-700"
            >
              Detail
            </button>
          </div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div className="">
            <div className="text-right text-xl">{sem}</div>
            <div className="h-28 mb-7 text-lg">
              <p>
                SKS Semester: <span className="font-bold">{sks}</span>
              </p>
              <p>
                IP Semester: <span className="font-bold">{ip}</span>
              </p>
              <p>
                SKS Kumulatif: <span className="font-bold">{sksk}</span>
              </p>
              <p>
                IP Kumulatif: <span className="font-bold">{ipk}</span>
              </p>
            </div>
            <button
              onClick={() => downloadKhs({ nim, sem })}
              className="block text-center w-1/2 mx-auto text-white rounded-full p-1 bg-violet-500 hover:bg-violet-700"
            >
              Detail
            </button>
          </div>
        </TabPanel>
        {nilaiS === "-" ? (
          <TabPanel value={value} index={2}>
            <div className="">
              <div className="flex justify-end w-full text-xl">{sem}</div>
              <div className="h-28 mb-7 flex-col flex justify-center items-center">
                <h3 className="text-md">Nilai PKL</h3>
                <h1 className="text-3xl font-bold">{nilaiP}</h1>
              </div>
              <button
                onClick={() => downloadPkl({ nim })}
                className="block text-center w-1/2 mx-auto text-white rounded-full p-1 bg-violet-500 hover:bg-violet-700"
              >
                Detail
              </button>
            </div>
          </TabPanel>
        ) : (
          <TabPanel value={value} index={2}>
            <div className="">
              <div className="flex justify-end w-full text-xl">{sem}</div>
              <div className="h-28 mb-7 flex-col flex justify-center items-center">
                <h3 className="text-md">Nilai Skripsi</h3>
                <h1 className="text-3xl font-bold">{nilaiS}</h1>
                <p className="text-sm">{tglSkripsi}</p>
              </div>
              <button
                onClick={() => downloadSkripsi({ nim })}
                className="block text-center w-1/2 mx-auto text-white rounded-full p-1 bg-violet-500 hover:bg-violet-700"
              >
                Detail
              </button>
            </div>
          </TabPanel>
        )}
      </Box>
    </>
  );
}
