import { Input } from "../input";
import { useCep } from "./use-cep";
import { InputMask } from "../input-mask";

export function InputAddress() {
  const result = useCep();

  return (
    <>
      <InputMask
        label="CEP"
        basePath="addresses"
        listposition={0}
        name="PostalCode"
        mask="99999-999"
      />

      {/* {result && (
        <>
          <Input
            basePath="addresses"
            listposition={0}
            name="address"
            label="Endereço"
            readOnly
            value={result.address}
          />
          <Input
            basePath="addresses"
            listposition={0}
            name="city"
            label="Cidade"
            readOnly
            value={result.city}
          />
          <Input
            basePath="addresses"
            listposition={0}
            name="country"
            label="País"
            readOnly
            value={result.country}
          />
          <Input
            basePath="addresses"
            listposition={0}
            name="localNeighborhood"
            label="Bairro"
            readOnly
            value={result.localNeighborhood}
          />
          <Input
            basePath="addresses"
            listposition={0}
            name="state"
            label="Estado"
            readOnly
            value={result.state}
          />

          <Input
            basePath="addresses"
            listposition={0}
            name="number"
            label="Número"
          />
        </>
      )} */}
    </>
  );
}
