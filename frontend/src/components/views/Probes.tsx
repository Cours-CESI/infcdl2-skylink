import {useGetProbes} from "../../hooks/useGetProbes.ts";
import Loader from "../Loader.tsx";
import ProbeCard from "../ProbeCard.tsx";
import App from "../../App.tsx";
import {useState} from "react";
import Modal from "../Modal.tsx";
import ProbeForm from "../probes/ProbeForm.tsx";
import {Probe} from "../../types";

const Probes = () => {
  const {data, error, isLoading} = useGetProbes();

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedProbe, setSelectedProbe] = useState<Probe | null>(null)

  const handleEditProbeRequest = (probe: Probe) => {
    setSelectedProbe(probe);
    handleOpenModal();
  }

  let content;

  if (isLoading || error) content = <Loader isError={error}/>;
  else
    content = data?.map((probe) => (
      <ProbeCard key={probe.id} id={probe.id} name={probe.name} ip={probe.ip} onEditRequest={() => handleEditProbeRequest(probe)}/>
    ));

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    if (selectedProbe)
      setSelectedProbe(null);

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
        <div className={"lg:mr-16 mr-8 mb-12"}>
          <button className={"bg-slate-800 h-16 w-16 rounded-full"} onClick={handleOpenModal}>
            +
          </button>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ProbeForm probe={selectedProbe} onClose={handleCloseModal}/>
      </Modal>
    </App>
  );
};

export default Probes;