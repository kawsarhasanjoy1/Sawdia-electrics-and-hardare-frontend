"use client";

interface SearchBoxProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  className?: string;
}

const SearchBox = ({
  value,
  placeholder = "Search...",
  onChange,
  className = "",
}: SearchBoxProps) => {
  return (
    <input
      type="search"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`border px-4 py-2 focus:outline-none rounded-md w-3/12 ${className}`}
    />
  );
};

export default SearchBox;
