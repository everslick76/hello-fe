import React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBarChart({ names }) {
  if (!names.size) return <CircularProgress size={100} />;
  return (
    <div>
      <Card>
        <CardContent>
          <Typography gutterBottom>
            <b>Leaderboard</b>
          </Typography>
        </CardContent>
        <CardContent>
          <BarChart
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
          />
        </CardContent>
      </Card>
    </div>
  );
}
