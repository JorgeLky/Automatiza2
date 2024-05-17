import { useQueryClient } from "react-query";

import { Input, Select, FormHandler } from "infinity-forge";

import { RemoteTutor } from "@/data";
import { container, patientTypes } from "@/container";
import { useConfigurations, useLoadTutorOrigins, useAssignTutor } from "@/presentation";


import { InputPhone } from "./input-phone";
import { SelectPatient } from "./select-patient";

import * as S from "./styles";

export function FormCreateClient({
  setModal,
}: {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { data } = useLoadTutorOrigins();

  const queryClient = useQueryClient();
  const { toast } = useConfigurations();

  const assignTutor = useAssignTutor();

  async function handleOnSuccess(params) {
    const originId = data.find(
      (item) => item.id === params.como_conheceu[0]
    ).id;

    try {
      const response = await container.get<RemoteTutor>(patientTypes.RemoteTutor).create({
          name: params.name,
          cellphone: params.cellphone,
          clientOriginId: originId,
          tutorOriginId: originId,
        });

      await assignTutor.mutateAsync({
        holder: response.id,
        patient: params.patient[0],
      });

      queryClient.invalidateQueries("RemoteLoadAllPatientTutor");

      toast.success("Tutor criado com sucesso!", { autoClose: 4000, position: "top-right" })
      
      setModal(false);
    } catch (err) {
      throw new Error(err.message);
    }
  }

  const initialData = {
    name: "",
    cellphone: "",
  };

  return (
    <S.FormCreateClient>
      <FormHandler
        initialData={initialData}
        button={{ text: "OK" }}
        onSucess={handleOnSuccess}
      >
        <div className="form-content">
          <div>
            <h5>Tutor</h5>

            <Input
              name="name"
              label="Nome"
              placeholder="Digite o nome completo"
            />

            <InputPhone />

            <Select
              label="Como conheceu a clinica"
              name="como_conheceu"
              placeholder="Selecione uma opção"
              options={
                data?.map((i) => ({
                  label: i.description,
                  value: i.id,
                })) || []
              }
            />
          </div>

          <div>
            <h5>Paciente</h5>

            <SelectPatient />

            <Select
              label="Raça"
              name="raca"
              readOnly
              placeholder="Selecione uma opção"
              options={[]}
            />

            <Select
              label="Gênero"
              readOnly
              name="como_conheceu"
              placeholder="Selecione"
              options={[
                {
                  label: "Masculino",
                  value: "male",
                },
                {
                  label: "Feminino",
                  value: "female",
                },
              ]}
            />
          </div>
        </div>
      </FormHandler>
    </S.FormCreateClient>
  );
}
