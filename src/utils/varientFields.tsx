"use client";

import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import EHInput from "@/component/Form/EHInput";
import EHSelect from "@/component/Form/EHSelect";
import { SCHEMAS } from "@/constance/productVariantConstance";



type InputType = "select" | "multiselect" | "text" | "number" | "color" | "boolean";
type VariantDef = {
  key: string;
  label: string;
  input: InputType;
  values?: string[];
  unit?: string;
  required?: boolean;
};

const VariantFields = ({ subCategoryName }: { subCategoryName?: string | any }) => {
  const schemaKey = useMemo(
    () => (subCategoryName && SCHEMAS[subCategoryName] ? subCategoryName : "__default__"),
    [subCategoryName]
  );

  const schema: VariantDef[] = SCHEMAS[schemaKey] || [];


  const { setValue } = useFormContext();
  useEffect(() => {
    setValue("variants", {});
  }, [schemaKey, setValue]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {schema?.map((f) => {
        const fieldName = `variants.${f.key}`;
        const label = f.unit ? `${f.label} (${f.unit})` : f.label;

        if (f.input === "select" || f.input === "multiselect") {
          const options = (f.values || []).map((v) => ({ label: v, value: v }));
          return (
            <EHSelect
              key={f.key}
              name={fieldName}
              label={label}
              options={options}
              {...(f.input === "multiselect" ? { isMulti: true } : {})}
            />
          );
        }

        if (f?.input === "color") {
          return <EHInput className=" h-11" key={f?.key} type="color" name={fieldName} label={f?.label} />
        }

        const type =
          f.input === "number" ? "number" :
          f.input === "boolean" ? "checkbox" : "text";

        return (
          <EHInput
            key={f.key}
            type={type}
            name={fieldName}
            label={label}
      
          />
        );
      })}
    </div>
  );
};

export default VariantFields;
