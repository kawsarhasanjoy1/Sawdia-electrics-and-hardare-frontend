"use client";
import { Controller, useFormContext } from "react-hook-form";
import { useState } from "react";
import Image from "next/image";

interface EHImageUploaderProps {
  name: string;
}

const EHImageUploader = ({ name }: EHImageUploaderProps) => {
  const { control } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange } }) => (
        <div className="space-y-2">
          {/* File Input */}
          <label className="flex flex-col items-center justify-center border-2 border-dashed border-sky-400 rounded-xl p-6 cursor-pointer transition-all hover:border-sky-500 hover:bg-sky-50 dark:border-sky-600 dark:hover:bg-zinc-800">
            <input
              type="file"
              multiple
              className="hidden"
              onChange={(e) => {
                const files = e.target.files;
                if (files) {
                  onChange(files); // Pass files to react-hook-form
                  const fileUrls = Array.from(files).map((file) =>
                    URL.createObjectURL(file)
                  );
                  setPreviews(fileUrls);
                }
              }}
            />
            <div className="text-center">
              <p className="text-sky-600 font-medium">Click or Drag files here</p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Supported formats: jpg, png, jpeg
              </p>
            </div>
          </label>

          {/* Preview Selected Images */}
          {previews.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-2">
              {previews?.map((src, idx) => (
                <div key={idx} className="w-24 h-24 rounded-lg overflow-hidden shadow-md relative">
                  <Image   src={src}
                    alt={`preview-${idx}`}
                    className="w-full h-full object-cover"  width={200} height={200}/>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    />
  );
};

export default EHImageUploader;
