import { useMutation, useQueryClient } from "react-query";

import { RemoteControllerRole } from "@/data";
import { DeleteControllerRole } from "@/domain";
import { useConfigurations } from "@/presentation";
import { adminTypes, container } from "@/container";
import { BadRequestError } from "infinity-forge";

export function useDeleteControllerRole(params: DeleteControllerRole.Params) {
  const { toast } = useConfigurations();
  
  const queryClient = useQueryClient();

  async function fetcher() {
    await container.get<RemoteControllerRole>(adminTypes.RemoteControllerRole).delete(params);
  }

  return useMutation({
    mutationKey: "RemoteDeleteControllerRole",
    mutationFn: fetcher,
    onSuccess: () => {
      queryClient.invalidateQueries("RemoteLoadAllControllerRoles");

      toast.success("Controle excluido com sucesso!", { autoClose: 3000, position: "top-right" })
   
    },
    onError: (err: { message: string }) => {
      if(err instanceof BadRequestError) {
        toast.error(err.error.message, { autoClose: 3000, position: "top-right" })
      }
    },
  });
}
