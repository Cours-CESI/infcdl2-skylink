import {Chart} from "react-google-charts";

export const StatChart = () => {

  return (
      <Chart
          chartType={"LineChart"}
          data={[
            ["Timestamp", "Temp", "Humidity", "Pressure"],
            [1735914102, 500, 50, 1013.25],
            [1735914113, 33, 50, 1013.25],
            [1735914133, 55, 50, 1013.25],
            [1735914155, 11, 50, 1013.25],
            [1735914177, 66, 50, 1013.25],
          ]}
          options={{
            title: "Probe A",
            colors: ["#FFF", "#FFF"],
            series: [
              {
                color: "#52F99D",
              },
              {
                color: "#1393D3"
              },
              {
                color: "#9264EE"
              }
            ],
            hAxis: {
              gridlines: {
                color: "#FFF"
              }
            },
            vAxis: {
              gridlines: {
                color: "#FFF"
              }
            },
            legend: { position: "bottom" },
            backgroundColor: "transparent",
            height: 500,
            width: 1000
          }}
      />
  );

};