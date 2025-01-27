import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import "./index.css";
import {BrowserRouter, Route, Routes} from "react-router";
import Probes from "./components/views/Probes.tsx";
import Home from "./components/views/Home.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<Home/>}/>
          <Route path={"/probes"} element={<Probes/>}/>
        </Routes>
      </BrowserRouter>
    </StrictMode>,
);
