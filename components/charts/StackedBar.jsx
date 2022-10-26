import React from "react";
import ReactApexChart from "react-apexcharts";

export default class ApexChart extends React.Component { 
  constructor(props) {
    super(props);

    this.state = {
      // initial nilai array series kosong
      series: [],
      options: {
        colors: ["#22c461", "#ea4648"],
        chart: {
          type: "bar",
          height: 450,
          stacked: true,
          toolbar: {
            show: true,
          },
          zoom: {
            enabled: true,
          },
        },
        responsive: [
          {
            breakpoint: 480,
            options: {
              legend: {
                position: "bottom",
                offsetX: -10,
                offsetY: 0,
              },
            },
          },
        ],
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 10,
            dataLabels: {
              total: {
                enabled: true,
                style: {
                  fontSize: "13px",
                  fontWeight: 900,
                },
              },
            },
          },
        },
        xaxis: {
          type: "year",
          categories: this.props.tahun,
        },
        legend: {
          position: "bottom",
        },
        fill: {
          opacity: 1,
        },
      },
    };
  }

  // berjalan pada saat page pertama kali di load
  componentDidMount() {
    if (this.props.dataLulus && this.props.dataBelum && this.props.tahun) {
      // membuat state data sudah sesuai dengan props
      this.setState((state, props) => {
        return {
          series: [
            {
              name: "Sudah",
              data: props.dataLulus,
            },
            {
              name: "Belum",
              data: props.dataBelum,
            },
          ],
          options: {
            colors: ["#22c461", "#ea4648"],
            chart: {
              type: "bar",
              height: 450,
              stacked: true,
              toolbar: {
                show: true,
              },
              zoom: {
                enabled: true,
              },
            },
            responsive: [
              {
                breakpoint: 480,
                options: {
                  legend: {
                    position: "bottom",
                    offsetX: -10,
                    offsetY: 0,
                  },
                },
              },
            ],
            plotOptions: {
              bar: {
                horizontal: false,
                borderRadius: 10,
                dataLabels: {
                  total: {
                    enabled: true,
                    style: {
                      fontSize: "13px",
                      fontWeight: 900,
                    },
                  },
                },
              },
            },
            xaxis: {
              type: "year",
              categories: props.tahun,
            },
            legend: {
              position: "bottom",
            },
            fill: {
              opacity: 1,
            },
          },
        };
      });
    }
  }

  // berjalan setiap kali update/webpage di refresh
  componentDidUpdate(previousProps) {
    // kondisi ini diberikan agar tidak terjadi infinite loop atau sebagai break steatment
    if (
      previousProps.dataLulus !== this.props.dataLulus &&
      previousProps.dataBelum !== this.props.dataBelum
    ) {
      if (this.props.dataLulus && this.props.dataBelum) {
        // membuat state data sudah sesuai dengan props
        this.setState((state, props) => {
          return {
            series: [
              {
                name: "Sudah",
                data: props.dataLulus,
              },
              {
                name: "Belum",
                data: props.dataBelum,
              },
            ],
            options: {
              colors: ["#22c461", "#ea4648"],
              chart: {
                type: "bar",
                height: 450,
                stacked: true,
                toolbar: {
                  show: true,
                },
                zoom: {
                  enabled: true,
                },
              },
              responsive: [
                {
                  breakpoint: 480,
                  options: {
                    legend: {
                      position: "bottom",
                      offsetX: -10,
                      offsetY: 0,
                    },
                  },
                },
              ],
              plotOptions: {
                bar: {
                  horizontal: false,
                  borderRadius: 10,
                  dataLabels: {
                    total: {
                      enabled: true,
                      style: {
                        fontSize: "13px",
                        fontWeight: 900,
                      },
                    },
                  },
                },
              },
              xaxis: {
                type: "year",
                categories: props.tahun,
              },
              legend: {
                position: "bottom",
              },
              fill: {
                opacity: 1,
              },
            },
          };
        });
      }
    }
  }

  render() {
    return (
      <div id="chart">
        <ReactApexChart
          options={this.state.options}
          series={this.state.series}
          type="bar"
          height={350}
        />
      </div>
    );
  }
}
