import { Controller, useFormContext } from "react-hook-form";

interface EHInputProps {
  name: string;
  label: string;
  placeholder?: string;
  type: string;
  required?: boolean;
}

const EHInput = ({
  name,
  label,
  placeholder,
  type,
  required = true,
}: EHInputProps) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col space-y-1">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-700 dark:text-gray-300"
      >
        {label}
      </label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <input
            {...field}
            id={name}
            type={type}
            required={required}
            placeholder={placeholder}
            className={`w-full rounded-md border px-3 py-2 text-gray-800 placeholder-gray-600
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
              dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200
              ${
                errors[name]
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300"
              }`}
          />
        )}
      />
      {errors[name] && (
        <p className="text-xs text-red-500">
          {errors[name]?.message?.toString()}
        </p>
      )}
    </div>
  );
};

export default EHInput;
