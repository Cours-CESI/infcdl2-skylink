import {useState} from "react";
import {Probe} from "../../types";
import useSWRMutation from "swr/mutation";
import {API_URL} from "../../config";
import {toast} from "react-toastify";

interface ProbeFormProps {
  probe: Probe | null;
  onClose: () => void;
}

async function postProbe(url: any, {arg}: { arg: Omit<Probe, "id"> }) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg)
  }).then(res => res.json())
}

async function putProbe(url: any, {arg}: { arg: Probe }) {
  return fetch(url, {
    method: "PUT",
    body: JSON.stringify({
      id_sonde: arg.id,
      name: arg.name,
      ip: arg.ip
    })
  }).then(res => res.json())
}

async function deleteProbe(url: any, {arg}: { arg: Pick<Probe, "id"> }) {
  return fetch(url, {
    method: "DELETE",
    body: JSON.stringify({
      id: arg.id
    })
  }).then(res => res.json())
}

const ProbeForm = ({probe, onClose}: ProbeFormProps) => {
  const [values, setValues] = useState<Partial<Probe>>({...(probe && probe)})

  const {trigger: post, isMutating} = useSWRMutation(`${API_URL}/sondes`, postProbe);
  const {trigger: put, isMutating: isPutMutating} = useSWRMutation(`${API_URL}/sondes`, putProbe);
  const {trigger: delProbe, isMutating: isDeleteMutating} = useSWRMutation(`${API_URL}/sondes`, deleteProbe);

  const handleSubmit = async () => {
    if (probe === null) {
      if (values.name && values.ip) {
        await post({
          name: values.name,
          ip: values.ip
        }, {
          onSuccess: () => {
            toast.success("Sonde créée avec succès.");
          },
          onError: (err) => {
            toast.error(err)
          }
        })
      }
    } else {
      if (values.name && values.ip) {
        await put({
          id: probe.id,
          name: values.name,
          ip: values.ip
        }, {
          onSuccess: () => {
            toast.success("Sonde modifiée avec succès.");
          },
          onError: (err) => {
            toast.error(err)
          }
        })
      }
    }
  }

  const handleDelete = async () => {
    if (probe === null) {
      return;
    }

    await delProbe({
      id: probe.id,
    }, {
      onSuccess: () => {
        toast.success("Sonde supprimée avec succès.");
        onClose();
      },
      onError: (err) => {
        toast.error(err)
      }
    })
  }

  const isSubmitButtonDisabled =
    (probe === null ? isMutating : isPutMutating || values.name === probe.name && values.ip === probe.ip)
    || isDeleteMutating
    || !values.name
    || !values.ip;

  return (
    <div className={"relative lg:min-w-[30%] min-w-[40%] lg:min-h-[30%] min-h-[20%] rounded-xl bg-slate-700"}>
      <div className={"absolute top-0 right-0"}>
        <p className={"mr-4 mt-2 bg-transparent text-xl cursor-pointer"} onClick={onClose}>
          ⨯
        </p>
      </div>
      <div className={"h-full w-full flex flex-col items-center"}>
        <div className={"h-[15%] w-full rounded-xl items-center justify-center flex"}>
          <p className={"text-gray-50 p-4 text-3xl"}>{probe === null ? "Ajouter une sonde" : `Sonde ${probe.id}`}</p>
        </div>
        <hr className={"w-[90%] text-gray-50"}/>
        <form onSubmit={handleSubmit} className={"w-full h-full"}>
          <div className={"mt-8 w-full flex flex-col gap-8 items-center"}>
            <input
              className={"w-[90%] bg-slate-600 p-4 rounded-md text-gray-100"}
              type={"text"}
              placeholder={"Nom"}
              value={values.name}
              onChange={(e) => {
                setValues((prevValues) => {
                  return {
                    ...prevValues,
                    name: e.target.value
                  }
                })
              }}
            />
            <input
              className={"w-[90%] bg-slate-600 p-4 rounded-md text-gray-100"}
              type={"text"}
              placeholder={"Adresse IP"}
              value={values.ip}
              onChange={(e) => {
                setValues((prevValues) => {
                  return {
                    ...prevValues,
                    ip: e.target.value
                  }
                })
              }}
            />
          </div>
          <div className={"flex h-20 justify-between items-center w-full p-4 gap-2"}>
            <div>
              <button type={"button"} className={"bg-transparent text-red-500 rounded-md"} onClick={handleDelete}>
                Supprimer
              </button>
            </div>
            <div className={"flex gap-2"}>
              <button type="button" className={"bg-slate-300 bg-slate-700"} onClick={onClose}>
                Annuler
              </button>
              <button
                type="submit"
                className={`${isSubmitButtonDisabled ? "bg-slate-300 hover:border-transparent" : "bg-slate-800"} p-3 rounded-md`}
                disabled={isSubmitButtonDisabled}
              >
                {probe === null ? "Ajouter" : "Modifier"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ProbeForm;