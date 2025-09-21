"use client";
import { useState, useEffect } from "react";
import CommonTitle from "@/component/shared/CommonTitle";
import BlogCard from "./BlogCard";
import { useGetBlogQuery } from "@/redux/api/blogApi";
import { CgChevronLeft, CgChevronRight } from "react-icons/cg";

const Blog = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const { data } = useGetBlogQuery({ isDeleted: false });
  const blog = data?.data?.data || [];

  // Set slidesToShow based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setSlidesToShow(4); // lg: 4 slides
      else if (window.innerWidth >= 768) setSlidesToShow(2); // md: 2 slides
      else setSlidesToShow(1); // sm: 1 slide
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % blog.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + blog.length) % blog.length);
  };

  return (
    <div>
      <CommonTitle
        title={{ a: "Latest Blog &", b: "News" }}
        description="Catch up on the newest updates, tips, and trends in electronics and hardware."
      />

      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-700 ease-in-out"
          style={{
            transform: `translateX(-${(currentIndex * 100) / slidesToShow}%)`,
          }}
        >
          {blog?.map((item: any) => (
            <div
              key={item._id}
              className="flex-shrink-0 md:p-4"
              style={{ width: `${100 / slidesToShow}%` }}
            >
              <BlogCard blog={item} />
            </div>
          ))}
        </div>

        {/* Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-400"
        >
          <CgChevronLeft className="text-2xl" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white text-gray-800 p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-200 hover:scale-110 focus:outline-none focus:ring-4 focus:ring-gray-400"
        >
          <CgChevronRight className="text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default Blog;
