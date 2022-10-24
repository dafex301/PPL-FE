import React from "react";
import ReactApexChart from "react-apexcharts";

// Get the current year
const currentYear = new Date().getFullYear();

// Get a list of current year up to 5 years ago
const years = [...Array(5)].map((_, i) => currentYear - i);

// Sort years in ascending order
years.sort((a, b) => a - b);

// Convert to string
const yearsString = years.map((year) => year.toString());

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [1, 1],
      options: {
        colors: ["#ea4648", "#22c461"],
        chart: {
          align: "middle",
          width: 380,
          type: "pie",
        },
        labels: ["belum", "Sudah"],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
    };
  }

  // berjalan pada saat page pertama kali di load
  componentDidMount() {
    if (this.props.dataLulus && this.props.dataBelum && this.props.angkatan) {
      this.setState((state, props) => {
        let dataLulus = props.dataLulus;
        let jumlahLulus = dataLulus[yearsString.indexOf(props.angkatan)];
        let dataBelum = props.dataBelum;
        let jumlahBelum = dataBelum[yearsString.indexOf(props.angkatan)];
        return {
          series: [jumlahBelum, jumlahLulus], 
        }; 
      });
      console.log(this.props.angkatan);
    }
  }

  // berjalan setiap kali update/webpage di refresh
  componentDidUpdate(previousProps) {
    if (
      previousProps.angkatan !== this.props.angkatan
    ) {
      if (this.props.dataLulus && this.props.dataBelum && this.props.angkatan) {
        this.setState((state, props) => {
          let dataLulus = props.dataLulus;
          let jumlahLulus = dataLulus[yearsString.indexOf(props.angkatan)];
          let dataBelum = props.dataBelum;
          let jumlahBelum = dataBelum[yearsString.indexOf(props.angkatan)];
          return {
            series: [jumlahBelum, jumlahLulus],
          };
        });
        console.log(this.props.angkatan);
      }
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="pie"
          width={380}
        />
      </div>
    );
  }
}
