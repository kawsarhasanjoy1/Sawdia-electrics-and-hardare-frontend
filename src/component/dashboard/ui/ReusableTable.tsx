"use client";
import { motion } from "framer-motion";

interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

interface ReusableTableProps<T> {
  columns: Column<T>[];
  data: T[];
}

const ReusableTable = <T extends { _id: string }>({
  columns,
  data,
}: ReusableTableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <motion.table
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full border border-gray-200 rounded-lg overflow-hidden"
      >
        <thead>
          <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm uppercase tracking-wide">
            {columns?.map((col) => (
              <th key={col.key} className="py-3 px-4 text-left">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {data?.map((row, idx) => (
            <motion.tr
              key={row._id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="hover:bg-gray-50 transition"
            >
              {columns?.map((col) => (
                <td key={col?.key} className="py-3 px-4 text-gray-700">
                  {col.render ? col.render(row) : (row as any)[col.key]}
                </td>
              ))}
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default ReusableTable;
