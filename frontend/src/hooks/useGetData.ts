import useSWR from "swr";
import { IStatChartProps } from "../components/charts/StatChart";
import {API_URL} from "../config";

type RawData = {
  sonde_name: string;
  created_at: number;
  temperature: number;
  humidity: number;
  pressure: number;
}[];


const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetData = () => {
  const { data, error } = useSWR<RawData>(`${API_URL}/weather/create`, fetcher, { refreshInterval: 5000, revalidateOnFocus: false });
  error;

  const transformedData: IStatChartProps[] | undefined = data
    ? data.reduce<IStatChartProps[]>((acc, item) => {
        const existingProbe: IStatChartProps | undefined = acc.find((probe) => probe.name === item.sonde_name);

        const dataPoint = {
          timestamp: item.created_at,
          temperature: item.temperature,
          humidity: item.humidity,
          pressure: item.pressure,
        };

        if (existingProbe) {
          existingProbe.data.push(dataPoint);
        } else {
          acc.push({ name: item.sonde_name, data: [dataPoint] });
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
