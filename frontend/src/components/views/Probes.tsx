import {useGetProbes} from "../../hooks/useGetProbes.ts";
import Loader from "../Loader.tsx";
import ProbeCard from "../ProbeCard.tsx";
import App from "../../App.tsx";
import {useState} from "react";
import Modal from "../Modal.tsx";
import {Probe} from "../../types";
import useSWRMutation from "swr/mutation";
import {API_URL} from "../../config";

async function postProbe(url: any, {arg}: {arg: Omit<Probe, "id">}) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg)
  }).then(res => res.json())
}

const Probes = () => {
  const {data, error, isLoading} = useGetProbes();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const formValues: Partial<Probe> = {};

  const { trigger: post, isMutating } = useSWRMutation(`${API_URL}/sondes`, postProbe);

  const handleSubmit = async () => {
    if (formValues.name && formValues.ip) {
      await post({
        name: formValues.name,
        ip: formValues.ip
      })
    }
  }

  let content;

  if (isLoading || error) content = <Loader isError={error}/>;
  else
    content = data?.map((probe) => (
        <ProbeCard key={probe.id} id={probe.id} name={probe.name} ip={probe.ip}/>
    ));

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
      <App>
        <div className={"h-full w-full"}>
          <div className={"w-full flex justify-center"}>
            <div className={"grid 2xl:grid-cols-3 grid-cols-1 h-full gap-6"}>
              {content}
            </div>
          </div>
        </div>
        <div className={"absolute bottom-0 right-0"}>
          <div className={"lg:mr-16 mr-4 mb-12"}>
            <button className={"bg-blue-600 h-16 w-16 rounded-full"} onClick={handleOpenModal}>
              +
            </button>
          </div>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className={"relative lg:min-w-[30%] min-w-[40%] lg:min-h-[30%] min-h-[20%] rounded-xl bg-slate-700"}>
            <div className={"absolute top-0 right-0"}>
              <p className={"mr-4 mt-2 bg-transparent text-xl cursor-pointer"} onClick={handleCloseModal}>
                ⨯
              </p>
            </div>
            <div className={"h-full w-full flex flex-col items-center"}>
              <div className={"h-[15%] w-full rounded-xl items-center justify-center flex"}>
                <p className={"text-gray-50 p-4 text-3xl"}>Ajouter une sonde</p>
              </div>
              <hr className={"w-[90%] text-gray-50"}/>
              <form onSubmit={handleSubmit} className={"w-full h-full"}>
                <div className={"mt-8 w-full flex flex-col gap-8 items-center"}>
                  <input
                      className={"w-[90%] bg-slate-600 p-4 rounded-md text-gray-100"}
                      type={"text"}
                      placeholder={"Nom"}
                      value={formValues.name}
                      onChange={(e) => formValues.name = e.target.value}
                  />
                  <input
                      className={"w-[90%] bg-slate-600 p-4 rounded-md text-gray-100"}
                      type={"text"}
                      placeholder={"Adresse IP"}
                      value={formValues.ip}
                      onChange={(e) => formValues.ip = e.target.value}
                  />
                </div>
                <div className={"flex justify-end w-full p-4 gap-2"}>
                  <button className={"bg-slate-300 bg-slate-700"}>
                    Annuler
                  </button>
                  <button type="submit" className={"bg-blue-500"} disabled={isMutating}>
                    Ajouter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Modal>
      </App>
  );
};

export default Probes;