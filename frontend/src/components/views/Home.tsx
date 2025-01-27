import App from "../../App.tsx";
import {useGetData} from "../../hooks/useGetData.ts";
import Loader from "../Loader.tsx";
import {StatChart} from "../charts/StatChart.tsx";

const Home = () => {
  const {data, isLoading, isError} = useGetData();

  let content;

  if (isLoading || isError) content = <Loader isError={isError}/>;
  else
    content = data?.map((probe) => (
        <StatChart key={probe.name} name={probe.name} data={probe.data}/>
    ));

  return (
      <App>
        <div className={"h-screen w-screen"}>
          <div className={"grid 2xl:grid-cols-2 grid-cols-1 h-full"}>
            {content}
          </div>
        </div>
      </App>
  )
}

export default Home;