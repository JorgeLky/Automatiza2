import { useFormContext } from "react-hook-form";

export function useCep() {
  // const loadCep = useZipCodesStore((state) => state.loadCep);

  // const { setError, watch } = useFormContext<CreateCustomer.Params>();

  // const formData = watch();

  // const postalCode = formData.addresses
  //   ? formData.addresses[0].PostalCode
  //   : undefined;
  // const enabled =
  //   formData.addresses && formData.addresses[0].PostalCode?.length === 8;

  // const { data } = useQuery({
  //   queryKey: ["zip-code", postalCode],
  //   queryFn: async () => {
  //     if (postalCode) {
  //       const result = await loadCep.load({
  //         postalCode,
  //       });

  //       return result
  //     }

  //     return null;
  //   },
  //   onError: () => {
  //     setError("addresses[0].postalCode" as any, { message: "Cep inválido." });
  //   },
  //   enabled,
  // });

  // return data?.data;

  return null
}
