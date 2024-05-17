
import { FormControlLabel, Switch } from "@mui/material";

import { useFormContext } from "react-hook-form";

export function InputSwitch({ name, label }: { name: string; label?: string }) {
  const { register, setValue, watch } = useFormContext<any>();

  const value = watch(name);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(name, event.target.checked);
  };

  return (
    <>
      <input
        type="checkbox"
        {...register(name)}
        onChange={handleChange}
        checked={value}
        style={{ display: "none" }}
      />

      <FormControlLabel
        control={<Switch checked={value} onChange={handleChange} />}
        label={label}
      />
    </>
  );
}
