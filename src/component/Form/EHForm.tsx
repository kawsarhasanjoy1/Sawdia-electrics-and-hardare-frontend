import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";

type TFormConfig = {
  resolver?: any;
  defaultValues?: Record<string, any>;
};

type TForm = {
  children: ReactNode;
  onsubmit: (data: any) => void;
  defaultValues?: Record<string, any>;
} & TFormConfig;

const EHForm = ({ children, onsubmit, defaultValues, resolver }: TForm) => {
  const formConfig: TFormConfig = {};

  if (defaultValues) {
    formConfig.defaultValues = defaultValues; 
  }

  if (resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm(formConfig);
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onsubmit)}>{children}</form>
    </FormProvider>
  );
};

export default EHForm;
