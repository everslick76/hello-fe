import React from "react";
// import { BarChart } from "@mui/x-charts/BarChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function SimpleBarChart({ names }) {
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom>
            <b>Leaderboard</b>
          </Typography>
        </CardContent>
        <CardContent>
          <>
            {Array.from(names.keys()).map((key) => (
              <span>{key}</span>
            ))}
          </>
          <>
            {Array.from(names.values()).map((val) => (
              <span>{val}</span>
            ))}
          </>
          {/* <BarChart
            xAxis={[
              {
                id: "names",
                data: Array.from(names.keys()),
                scaleType: "band",
              },
            ]}
            series={[
              {
                data: Array.from(names.values()),
              },
            ]}
            width={1000}
            height={300}
          /> */}
        </CardContent>
      </Card>
    </div>
  );
}
