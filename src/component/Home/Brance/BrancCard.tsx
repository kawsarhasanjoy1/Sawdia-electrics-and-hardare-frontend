"use client";
import React from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";

export interface TBranch {
  name: string;
  address: string;
  contact: string;
  mapLink: string;
  email: string;
}

interface BranchCardProps {
  branch: TBranch;
}

const BranchCard = ({ branch }: BranchCardProps) => {
  return (
    <div className=" bg-gray-100  rounded-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
      <div className="p-6 flex flex-col justify-between h-full">
        <div>
          <h3 className="text-xl font-bold text-blue-600 mb-2">
            {branch.name}
          </h3>
          <p className="text-gray-600 mb-2">{branch.address}</p>
          <p className="text-gray-500 mb-4">📞 {branch.contact}</p>
          <p className="text-gray-500 mb-4 flex items-center gap-1">
            {" "}
            <MdOutlineMarkEmailRead size={20} className=" text-orange-400" /> {branch.email}
          </p>
        </div>
        <a
          href={branch.mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-center font-semibold transition-colors duration-300"
        >
          View on Map
        </a>
      </div>
    </div>
  );
};

export default BranchCard;
