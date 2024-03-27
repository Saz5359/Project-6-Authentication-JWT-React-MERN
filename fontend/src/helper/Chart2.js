import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";

const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
const xLabels = [
  "Site 1",
  "Site 2",
  "Site 3",
  "Site 4",
  "Site 5",
  "Site 6",
  "Site 7",
];

export default function SimpleLineChart() {
  return (
    <LineChart
      width={350}
      height={300}
      series={[
        { data: pData, color: "#020467", label: "Viewers" },
        { data: uData, color: "orange", label: "Active Accounts" },
      ]}
      xAxis={[{ scaleType: "point", data: xLabels }]}
    />
  );
}
