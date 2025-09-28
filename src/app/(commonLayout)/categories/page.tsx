"use client";

import { useState } from "react";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { useSearchParams } from "next/navigation";
import NotFound from "@/app/not-found";
import SearchBox from "@/component/dashboard/ui/SearchInput";

export interface Category {
  _id: string;
  name: string;
  description?: string;
  parentCategory: any;
  createdBy: any;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function Categories() {
  const [filter, setFilters] = useState({ searchTerm: "" });
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  const { data, isLoading } = useGetAllCategoryQuery(filter);

  const categoryData = (data?.data?.data || []) as Category[];
  const filtersCategory = categoryData.filter((category) => {
    const left = category?.parentCategory?.name?.trim().toLowerCase();
    const right = (categoryParam ?? "").trim().toLowerCase();

    const match = left === right;
    return match;
  });

  const categoryMap: Category[] = categoryParam
    ? filtersCategory?.length
      ? filtersCategory
      : []
    : categoryData ?? [];

  return (
    <div className="mx-auto max-w-full px-4 sm:px-2 space-y-10 my-10">
      <div className="pt-8 pb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-wider text-slate-500">
            Category
          </p>
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-slate-900 to-slate-600 bg-clip-text text-transparent dark:from-white dark:to-slate-300">
            {categoryParam ? categoryParam : "All Category"}
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Browse subcategories and their descriptions.
          </p>
        </div>
        <div className=" ">
          <SearchBox
            onChange={(e) => setFilters((prev) => ({ ...prev, searchTerm: e }))}
            value={filter?.searchTerm}
            placeholder="Enter category name"
            className=" w-full"
          />
        </div>
      </div>
      {isLoading ? (
        "loading"
      ) : categoryMap?.length ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {categoryMap.map((sub) => (
            <article key={sub._id} className="group relative h-48">
              <div className="relative rounded-2xl p-[1px] bg-gradient-to-br from-indigo-400/40 via-sky-400/40 to-fuchsia-400/40 dark:from-indigo-500/30 dark:via-sky-500/30 dark:to-fuchsia-500/30">
                <div className="rounded-2xl bg-white/80 dark:bg-slate-900/60 backdrop-blur p-5 h-48 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white leading-tight">
                      {sub.name}
                    </h3>
                    <span className="shrink-0 inline-flex items-center rounded-full border border-slate-200 dark:border-slate-700 px-2.5 py-1 text-xs text-slate-600 dark:text-slate-300 bg-white/60 dark:bg-slate-900/60">
                      Subcategory
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-slate-600/90 dark:text-slate-300/90 max-h-24 overflow-hidden">
                    {sub.description || "No description provided."}
                  </p>
                </div>
              </div>

              <div className="pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-indigo-400/0 via-sky-400/0 to-fuchsia-400/0 opacity-0 blur-2xl transition group-hover:opacity-40" />
            </article>
          ))}
        </div>
      ) : (
        <NotFound message="category not found" />
      )}
    </div>
  );
}
