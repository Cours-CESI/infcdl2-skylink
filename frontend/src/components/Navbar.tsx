import {NavLink} from "react-router";

const Navbar = () => {
  return (
    <div className={"sticky backdrop-blur-md z-50 top-0 h-20 w-screen bg-transparent"}>
      <div className={"grid grid-flow-col grid-cols-3 w-screen"}>
        <div className={"flex flex-col w-full h-full justify-center ml-4"}>
          <NavLink to={"/probes"} className={"self-start text-gray-50 text-xl"}>Sondes</NavLink>
        </div>
        <div className={"flex gap-4 w-full justify-center items-center"}>
          <NavLink to={"/"} className={"flex gap-4"}>
            <h1 className={"text-6xl text-gray-50 font-bold font-['Caveat']"}>SKYLINK</h1>
            <img className={"-scale-y-100"} src={"/shooting-star.svg"} height={"30px"} width={"30px"}/>
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default Navbar;