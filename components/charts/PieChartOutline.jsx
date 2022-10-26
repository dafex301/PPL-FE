import React from "react";
import ReactApexChart from "react-apexcharts";

export default class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [44, 55, 41, 17, 15, 10, 11],
      options: {
        colors: [
          "#22c55e",
          "#eab308",
          "#f97316",
          "#ef4444",
          "#ec4899",
          "#a855f7",
          "#4f46e5",
        ],
        labels: [
          "Aktif",
          "Cuti",
          "Mangkir",
          "Drop Out",
          "Undur Diri",
          "Lulus",
          "Meninggal Dunia",
        ],
        chart: {
          type: "donut",
        },
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

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.props.data}
          type="donut"
          width={500}
        />
      </div>
    );
  }
}
