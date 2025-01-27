import { Chart } from "react-google-charts";

export type IStatChartProps = {
  name: string;
  data: {
    timestamp: number;
    temperature: number;
    humidity: number;
    pressure: number;
  }[];
};

const convertToDate = (timestamp: number) => {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month} ${hours}:${minutes}`;
};

export const StatChart = ({ name, data }: IStatChartProps) => {
  const chartData = [];
  chartData.push(["Date", "Temp", "Humidity", "Pressure (hPa/100)"]);
  data.forEach((data) => {
    chartData.push([
      convertToDate(data.timestamp),
      data.temperature,
      data.humidity,
      data.pressure / 100,
    ]);
  });
  return (
    <div className={"flex justify-center items-center w-full h-full"}>
      <Chart
        chartType={"LineChart"}
        data={chartData}
        options={{
          title: name,
          colors: ["#FFF", "#FFF"],
          series: [
            {
              color: "#52F99D",
            },
            {
              color: "#1393D3",
            },
            {
              color: "#9264EE",
            },
          ],
          hAxis: {
            title: "Time",
            gridlines: {
              color: "#FFF",
            },
          },
          vAxis: {
            gridlines: {
              color: "#FFF",
            },
          },
          legend: { position: "bottom" },
          backgroundColor: "transparent",
          height: 500,
          width: 1000,
        }}
      />
    </div>
  );
};
