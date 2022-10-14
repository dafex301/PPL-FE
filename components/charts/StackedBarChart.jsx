import React, { PureComponent } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "2018",
    belum: 10,
    sudah: 140,
  },
  {
    name: "2019",
    belum: 50,
    sudah: 80,
  },
  {
    name: "2020",
    belum: 136,
    sudah: 10,
  },
  {
    name: "2021",
    belum: 146,
    sudah: 0,
  },
  {
    name: "2022",
    belum: 150,
    sudah: 0,
  },
];

export default class StackedBarChart extends PureComponent {
  render() {
    return (
      <ResponsiveContainer
        className={this.props.className}
        width="100%"
        height="60%"
      >
        <BarChart
          data={data}
          margin={{
            top: 0,
            right: 30,
            left: 30,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {this.props.left && (
            <Bar dataKey="sudah" stackId="a" fill="#6d28d9" />
          )}
          {this.props.right && (
            <Bar dataKey="belum" stackId="a" fill="#ef4da0" />
          )}
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
