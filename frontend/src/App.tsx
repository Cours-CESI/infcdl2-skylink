import "./App.css";
import Navbar from "./components/Navbar.tsx";
import {ReactNode} from "react";
import {ToastContainer} from "react-toastify";

interface IAppProps {
  children: ReactNode
}

const App = ({children}: IAppProps) => {
  return (
    <>
      <div className={"w-screen h-screen"}>
        <Navbar/>
        {children}
        <ToastContainer
          position={"bottom-right"}
          autoClose={3000}
          theme={"dark"}
        />
      </div>
    </>
  );
}

export default App;
