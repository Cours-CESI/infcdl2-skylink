import "./App.css";
import Navbar from "./components/Navbar.tsx";
import {StatChart} from "./components/charts/StatChart.tsx";

function App() {

  return (
      <>
        <div className={"w-screen h-screen"}>
          <Navbar/>
          <div className={"h-screen w-screen"}>
            <div className={"grid 2xl:grid-cols-2 grid-cols-1 h-full"}>
              <div className={"flex justify-center items-center w-full h-full"}>
                <StatChart/>
              </div>
              <div className={"flex justify-center items-center w-full h-full"}>
                <StatChart/>
              </div>
              <div className={"flex justify-center items-center w-full h-full"}>
                <StatChart/>
              </div>
              <div className={"flex justify-center items-center w-full h-full"}>
                <StatChart/>
              </div>
              <div className={"flex justify-center items-center w-full h-full"}>
                <StatChart/>
              </div>
            </div>
          </div>
        </div>
      </>
  );
}

export default App;
