import { useFormContext } from "react-hook-form";

import {
  Dropdown,
  DropdownItemProps,
  StrictDropdownProps,
} from "semantic-ui-react";

import { InputControl } from "../input-control";
import { makeRegisterName } from "../helpers/make-register-name";

import { ISelectProps } from "../interfaces";

import * as S from "./styles";

export function Select(
  props: ISelectProps & StrictDropdownProps & DropdownItemProps
) {
  const { register, setValue, watch } = useFormContext();

  const { listposition, name, search, selection, placeholder, options } = props;

  const registerName = makeRegisterName(listposition, name);

  function handleChange(value: string) {
    setValue(registerName, value);

    props.onChangeSelect && props.onChangeSelect(value);
  }

  const value = watch(registerName);

  function generateOptionsDynamic(props) {
    if (props.isColor) {
      return props.options.map((option) => ({
        ...option,
        content: (
          <div
            className="item"
            style={{ backgroundColor: option.color, color: "#fff" }}
          >
            {option.description}
          </div>
        ),
      }));
    }

    return props.options;
  }

  return (
    <S.Select>
      <InputControl {...props}>
        <Dropdown
          {...register(registerName)}
          options={options}
          value={value}
          icon={search ? "search" : ""}
          search={search}
          placeholder={placeholder}
          onChange={(_, data) => {
            handleChange(data.value as string);
          }}
        />
      </InputControl>
    </S.Select>
  );
}
