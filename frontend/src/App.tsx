import "./App.css";
import Navbar from "./components/Navbar.tsx";
import {ReactNode} from "react";

interface IAppProps {
  children: ReactNode
}

const App = ({children}: IAppProps) => {
  return (
      <>
        <div className={"w-screen h-screen"}>
          <Navbar/>
          {children}
        </div>
      </>
  );
}

export default App;
