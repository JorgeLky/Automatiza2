import { useEffect, useState } from "react";

import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";

import { FormProvider, useForm } from "react-hook-form";

import { BadRequestError, ValidationError } from "@/domain";

import { Button } from "../../button";
import { CustomSubmitButton } from "./custom-submit";

import { IFormHandler } from "./interfaces";

import * as S from "./styles";

export function FormHandler({
  button,
  schema,
  children,
  onSucess,
  initialData,
  customSubmit,
  onChangeForm,
  customComponentButton,
}: IFormHandler) {
  const [stateForm, setStateForm] = useState({ state: "", message: "" });

  const methods = useForm({
    defaultValues: initialData || {},
    mode: "onChange",
    shouldFocusError: true,
    resolver: yupResolver(yup.object().shape(schema)),
  });

  async function handleSubmit(_, action?: (data) => void) {
    try {
      setStateForm({ state: "loading", message: "" });

      methods.clearErrors();

      const valueForm = methods.getValues();

      onSucess && !action && await onSucess(valueForm);

      action && action(valueForm);

      setStateForm({ state: "send", message: "" });
    } catch(err) {
      
      if (err instanceof BadRequestError) {
        setStateForm({ state: "error", message: err.error.message });

        return;
      }

      if (err instanceof ValidationError) {
        const validationErrros = err.errors.errors;

        if (validationErrros) {
          validationErrros.forEach((err) => {
            methods.setError(
              err.field,
              { message: err.message },
              { shouldFocus: true }
            );
          });
        }
      }

      setStateForm({ state: "default", message: "" });
    }
  }

  const onSubmit = (action?: any) => {
    methods.handleSubmit((data) => handleSubmit(data, action))();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit();
    }
  };

  const watch = methods.watch();
  const value = JSON.stringify(watch ?? {});

  useEffect(() => {
    onChangeForm && onChangeForm(methods.getValues());
  }, [value]);

  return (
    <S.FormHandler>
      <FormProvider {...methods}>
        <form onKeyDown={handleKeyDown}>
          {stateForm.state === "error" && (
            <span className="errorForm">{stateForm.message}</span>
          )}

          {children}

          <div className="form-button">
            {customComponentButton && customComponentButton}

            {button && (
              <Button
                {...button}
                type="button"
                onClick={() => onSubmit()}
                loading={stateForm.state === "loading"}
              />
            )}

            {customSubmit &&
              customSubmit.length > 0 &&
              customSubmit.map((custom, index) => (
                <CustomSubmitButton
                  key={index}
                  {...custom}
                  stateForm={stateForm}
                  onSubmit={onSubmit}
                />
              ))}
          </div>
        </form>
      </FormProvider>
    </S.FormHandler>
  );
}
