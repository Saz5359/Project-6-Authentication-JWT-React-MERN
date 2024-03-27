import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Chart() {
  return (
    <PieChart
      series={[
        {
          data: [
            {
              id: 0,
              value: 10,
              color: "#e73e49",
              label: "Org Unit",
            },
            { id: 1, value: 15, color: "#020467", label: "Division" },
            { id: 2, value: 20, color: "orange", label: "Other" },
          ],
        },
      ]}
      width={400}
      height={200}
    />
  );
}
