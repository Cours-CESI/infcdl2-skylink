import {Probe} from "../types";

const ProbeCard = ({id, ip, name}: Probe) => {
  return (
      <div className={"lg:w-[480px] lg:h-[120px] min-w-80 min-h-10 border-gray-50 bg-slate-600 rounded-md mt-8"}>
        <div className={"w-full h-full flex flex-row"}>
          <div className={"h-full w-[140px] flex items-center"}>
            <img src={"/probe.svg"} className={"p-2 lg:w-24 min-w-10"}/>
          </div>
          <div className={"w-full h-full flex m-4"}>
            <div className={"self-start"}>
              <p className={"text-sm"}>{id}</p>
              <br/>
              <h5><strong>Nom</strong> : {name}</h5>
              <h5><strong>IP</strong> : {ip}</h5>
            </div>
          </div>
        </div>
      </div>
  )
}

export default ProbeCard;