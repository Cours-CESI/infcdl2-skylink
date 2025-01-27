import "./App.css";
import Loader from "./components/Loader.tsx";
import Navbar from "./components/Navbar.tsx";
import {StatChart} from "./components/charts/StatChart.tsx";
import {useGetData} from "./hooks/useGetData.ts";

function App() {
  const {data, isLoading, isError} = useGetData(
      process.env.NODE_ENV === "production" ? "http://192.168.137.22/weather/create" : "http://localhost:3000/probes"
  );

  let content;

  if (isLoading || isError) content = <Loader isError={isError}/>;
  else
    content = data?.map((probe) => (
        <StatChart key={probe.name} name={probe.name} data={probe.data}/>
    ));

  return (
      <>
        <div className={"w-screen h-screen"}>
          <Navbar/>
          <div className={"h-screen w-screen"}>
            <div className={"grid 2xl:grid-cols-2 grid-cols-1 h-full"}>
              {content}
            </div>
          </div>
        </div>
      </>
  );
}

export default App;
