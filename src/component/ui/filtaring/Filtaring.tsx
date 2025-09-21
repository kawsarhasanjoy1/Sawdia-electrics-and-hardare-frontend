import { useGetAllParentCategoryQuery } from "@/redux/api/parentCategoryApi";
import { useGetAllCategoryQuery } from "@/redux/api/categoryApi";
import { useGetAllBrandQuery } from "@/redux/api/brandApi";
import { useState, useEffect } from "react";

const Filtering = ({ filters, setFilters }: any) => {
  const [selectedParent, setSelectedParent] = useState<string>("");

  const { data: parentCategories } = useGetAllParentCategoryQuery(undefined);
  const parentOptions = parentCategories?.data?.data || [];

  const { data: subCategories } = useGetAllCategoryQuery(
    selectedParent ? { parentCategory: selectedParent } : {}
  );
  const subOptions = subCategories?.data?.data || [];

  const { data: brandData } = useGetAllBrandQuery(
    filters.category ? { categoryId: filters.category } : {},
    { skip: !filters.category }
  );
  const brandOptions = brandData?.data?.data || [];

  // ===== Handlers =====
  const handleParentClick = (p: any) => {
    const newId = selectedParent === p._id ? "" : p._id;
    setSelectedParent(newId);
    setFilters((prev: any) => ({
      ...prev,
      parentCategory: newId,
      category: "",
      brand: "",
      page: 1,
    }));
  };

  const handleSubClick = (subId: string) => {
    setFilters((prev: any) => ({
      ...prev,
      category: subId,
      brand: "",
      page: 1,
    }));
  };

  const handleBrandClick = (brandId: string) => {
    setFilters((prev: any) => ({
      ...prev,
      brand: brandId,
      page: 1,
    }));
  };

  const handlePriceChange = (e: any) => {
    const { name, value } = e.target;
    setFilters((prev: any) => ({
      ...prev,
      [name]: Number(value),
      page: 1,
    }));
  };

  useEffect(() => {
    if (!selectedParent) {
      setFilters((prev: any) => ({ ...prev, category: "", brand: "" }));
    }
  }, [selectedParent, setFilters]);

  return (
    <div className="space-y-5 border-2 rounded-xl p-4">
      {/* Parent Category */}
      <div>
        <p className="font-bold mb-2">Parent Category</p>
        {parentOptions?.map((p: any) => (
          <label key={p._id} className="flex gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.parentCategory === p._id}
              onChange={() => handleParentClick(p)}
            />
            {p.name}
          </label>
        ))}
      </div>

      {/* Sub Category */}
      {selectedParent && subOptions.length > 0 && (
        <div>
          <p className="font-bold mb-2">Sub Category</p>
          {subOptions.map((s: any) => (
            <label key={s._id} className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                checked={filters.category === s._id}
                onChange={() => handleSubClick(s._id)}
              />
              {s.name}
            </label>
          ))}
        </div>
      )}

      {/* Brand */}
      {filters.category && brandOptions.length > 0 && (
        <div>
          <p className="font-bold mb-2">Brand</p>
          {brandOptions.map((b: any) => (
            <label key={b._id} className="flex gap-2 cursor-pointer">
              <input
                type="radio"
                checked={filters.brand === b._id}
                onChange={() => handleBrandClick(b._id)}
              />
              {b.name}
            </label>
          ))}
        </div>
      )}

      {/* Price Filter */}
      <div>
        <p className="font-bold mb-2">Price Range</p>
        <div className="flex gap-2">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            className="border px-2 py-1 w-1/2"
            value={filters.minPrice || ""}
            onChange={handlePriceChange}
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            className="border px-2 py-1 w-1/2"
            value={filters.maxPrice || ""}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      <div>
        <p className="font-bold mb-2">Rating</p>
        <div className="flex flex-col gap-1">
          {[5, 4, 3, 2, 1].map((r) => (
            <label key={r} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.rating === r}
                onChange={() =>
                  setFilters((prev: any) => ({
                    ...prev,
                    rating: prev.rating === r ? undefined : r, // toggle
                    page: 1,
                  }))
                }
              />
              {r} Star & Up
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filtering;
