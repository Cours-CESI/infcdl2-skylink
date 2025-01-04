import useSWR from "swr";
import { IStatChartProps } from "../components/charts/StatChart";

type RawData = {
  name: string;
  timestamp: number;
  temperature: number;
  humidity: number;
  pressure: number;
}[];


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetData = (apiUrl: string) => {
  const { data, error } = useSWR<RawData>(apiUrl, fetcher, { refreshInterval: 5000, revalidateOnFocus: false });
  error;

  const transformedData: IStatChartProps[] | undefined = data
    ? data.reduce<IStatChartProps[]>((acc, item) => {
        const existingProbe: IStatChartProps | undefined = acc.find((probe) => probe.name === item.name);

        const dataPoint = {
          timestamp: item.timestamp,
          temperature: item.temperature,
          humidity: item.humidity,
          pressure: item.pressure,
        };

        if (existingProbe) {
          existingProbe.data.push(dataPoint);
        } else {
          acc.push({ name: item.name, data: [dataPoint] });
        }
        return acc;
      }, [])
    : undefined;

  return {
    data: transformedData,
    isLoading: !error && !data,
    isError: !!error,
    // isLoading: true,
    // isError: false,
  };
};
