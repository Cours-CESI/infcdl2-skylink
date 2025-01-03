const Navbar = () => {
  return (
      <div className={"sticky backdrop-blur-md z-50 top-0 h-20 w-screen bg-transparent"}>
        <div className={"flex justify-center items-center p-4"}>
          <div className={"flex justify-around gap-4"}>
            <div className={"flex gap-4 items-center"}>
              <h1 className={"text-6xl text-gray-50 font-bold font-['Caveat']"}>SKYLINK</h1>
              <img className={"-scale-y-100"} src={"/shooting-star.svg"} height={"30px"} width={"30px"}/>
            </div>
          </div>
        </div>
      </div>
  )
}

export default Navbar;