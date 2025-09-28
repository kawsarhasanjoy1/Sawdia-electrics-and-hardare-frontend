// src/component/Form/EHInput.tsx
"use client";

import * as React from "react";
import { Controller, useFormContext } from "react-hook-form";

type InputType =
  | "text"
  | "number"
  | "email"
  | "password"
  | "date"
  | "time"
  | "tel"
  | "url"
  | "color"
  | "checkbox"
  | "file";

interface EHInputProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: InputType;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  min?: number | string;
  max?: number | string;
  step?: number | string;
  accept?: string; // file input
  multiple?: boolean; // file input
}

const EHInput: React.FC<EHInputProps> = ({
  name,
  label,
  placeholder,
  type = "text",
  required = false,
  disabled,
  className = "",
  min,
  max,
  step,
  accept,
  multiple,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const baseCls =
    "w-full rounded-md border px-3 py-2 text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200";
  const err = (errors as any)?.[name];

  return (
    <div className="flex flex-col space-y-1">
      {label ? (
        <label
          htmlFor={name}
          className="text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {label}
        </label>
      ) : null}

      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          // ---- FILE: keep UNCONTROLLED (no value prop)
          if (type === "file") {
            return (
              <input
                id={name}
                name={field.name}
                ref={field.ref}
                type="file"
                accept={accept}
                multiple={multiple}
                disabled={disabled}
                placeholder={placeholder}
                className={`${baseCls} ${
                  err ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                } ${className}`}
                required={required}
                aria-invalid={!!err}
                onChange={(e) =>
                  field.onChange((e.target as HTMLInputElement).files)
                }
                onBlur={field.onBlur}
              />
            );
          }

          // ---- CHECKBOX: use checked
          if (type === "checkbox") {
            return (
              <input
                id={name}
                name={field.name}
                ref={field.ref}
                type="checkbox"
                disabled={disabled}
                className={`${baseCls} h-4 w-4 ${
                  err ? "border-red-500 focus:ring-red-500" : "border-gray-300"
                } ${className}`}
                required={required}
                aria-invalid={!!err}
                checked={!!field.value}
                onChange={(e) => field.onChange(e.target.checked)}
                onBlur={field.onBlur}
              />
            );
          }

          // ---- NUMBER/COLOR/TEXT... normalize to avoid undefined
          const normalizedValue =
            type === "color"
              ? field.value || "#000000"
              : field.value ?? "";

          return (
            <input
              id={name}
              name={field.name}
              ref={field.ref}
              type={type}
              placeholder={placeholder}
              disabled={disabled}
              className={`${baseCls} ${
                err ? "border-red-500 focus:ring-red-500" : "border-gray-300"
              } ${className}`}
              required={required}
              aria-invalid={!!err}
              value={normalizedValue}
              onChange={(e) => {
                if (type === "number") {
                  // keep as string so user can clear; convert on submit if needed
                  field.onChange(e.target.value);
                } else {
                  field.onChange(e.target.value);
                }
              }}
              onBlur={field.onBlur}
              min={min as any}
              max={max as any}
              step={step as any}
            />
          );
        }}
      />

      {err && (
        <p className="text-xs text-red-500">
          {(err?.message as string) || "This field is invalid"}
        </p>
      )}
    </div>
  );
};

export default EHInput;
