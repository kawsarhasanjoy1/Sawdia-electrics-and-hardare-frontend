"use client";

import React from "react";
import { Controller, useFormContext } from "react-hook-form";

type Option = {
  label: string;
  value: string;
};

type Props = {
  name: string;
  label?: string;
  options: Option[];
  isDisabled?: boolean;
  onChange?: (value: string) => void; // extra prop for dynamic handling
};

const EHSelect = ({ name, label, options, isDisabled = false, onChange }: Props) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium">
          {label}
        </label>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <select
            id={name}
            {...field}
            disabled={isDisabled}
            onChange={(e) => {
              field.onChange(e); // react-hook-form update
              onChange?.(e.target.value); // external callback
            }}
            className={`w-full border rounded-md border-gray-300 px-3 py-[11px] focus:outline-none ${
              error ? "border-red-500" : ""
            }`}
          >
            <option value="">Select {label || name}</option>
            {options?.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        )}
      />

      {error && <p className="text-red-500 text-xs">{error.message as string}</p>}
    </div>
  );
};

export default EHSelect;
