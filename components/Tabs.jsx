import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="IRS" {...a11yProps(0)} />
          <Tab label="KHS" {...a11yProps(1)} />
          <Tab label="PKL" {...a11yProps(2)} />
          <Tab label="Skripsi" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div className="">
          <div className="flex justify-end w-full text-xl">1</div>
          <div className="h-28 mb-7 flex-col flex justify-center items-center">
            <h3 className="text-md">Total SKS</h3>
            <h1 className="text-3xl font-bold">24 SKS</h1>
          </div>
          <button className="block text-center w-1/2 mx-auto text-white rounded-full p-1 bg-violet-500 hover:bg-violet-700">
            Detail
          </button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div className="">
          <div className="text-right text-xl">1</div>
          <div className="h-28 mb-7 text-lg">
            <p>
              SKS Semester: <span className="font-bold">23</span>
            </p>
            <p>
              IP Semester: <span className="font-bold">3.7</span>
            </p>
            <p>
              SKS Kumulatif: <span className="font-bold">57</span>
            </p>
            <p>
              IP Kumulatif: <span className="font-bold">3.76</span>
            </p>
          </div>
          <button className="block text-center w-1/2 mx-auto text-white rounded-full p-1 bg-violet-500 hover:bg-violet-700">
            Detail
          </button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div className="">
          <div className="flex justify-end w-full text-xl">1</div>
          <div className="h-28 mb-7 flex-col flex justify-center items-center">
            <h3 className="text-md">Nilai PKL</h3>
            <h1 className="text-3xl font-bold">A</h1>
          </div>
          <button className="block text-center w-1/2 mx-auto text-white rounded-full p-1 bg-violet-500 hover:bg-violet-700">
            Detail
          </button>
        </div>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <div className="">
          <div className="flex justify-end w-full text-xl">1</div>
          <div className="h-28 mb-7 flex-col flex justify-center items-center">
            <h3 className="text-md">Nilai Skripsi</h3>
            <h1 className="text-3xl font-bold">B</h1>
            <p className="text-sm">23/01/2020</p>
          </div>
          <button className="block text-center w-1/2 mx-auto text-white rounded-full p-1 bg-violet-500 hover:bg-violet-700">
            Detail
          </button>
        </div>
      </TabPanel>
    </Box>
  );
}
