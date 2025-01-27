import useSWR from "swr";
import {API_URL} from "../config";

type RawData = {
  id: string;
  ip: string;
  name: string;
}[];

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useGetProbes = () => {
  const { data, error, isLoading } = useSWR<RawData>(`${API_URL}/sondes`, fetcher, { revalidateOnReconnect: true, revalidateIfStale: true});

  return {
    data,
    error,
    isLoading
  }
}