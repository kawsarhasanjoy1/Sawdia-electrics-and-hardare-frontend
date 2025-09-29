"use client";
import { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import EHForm from "@/component/Form/EHForm";
import EHInput from "@/component/Form/EHInput";
import EHImageUploader from "@/component/Form/EHImage";
import EHTextarea from "@/component/Form/EHTextArea";
import { useCreateBlogMutation } from "@/redux/api/blogApi";

const BlogDefaultValue = {
  title: "",
  content: "",
  category: "",
  image: "",
  isPublished: false,
};

const BlogForm = () => {
  const [createBlog, {isLoading}] = useCreateBlogMutation();

  const onSubmit = async (values: FieldValues) => {
    const formData = new FormData();
    const { image, ...rest } = values;
    formData.append("data", JSON.stringify(rest));
    formData.append("file", image[0]);

    try {
      const res = await createBlog(formData).unwrap();
      if (res.success) {
        toast.success("Blog created successfully!");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create blog");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        style={{ backgroundSize: "200% 200%" }}
      />

      <motion.div
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="relative w-full max-w-2xl bg-white/20 backdrop-blur-lg p-8 rounded-3xl shadow-2xl border border-white/30"
      >
        <h2 className="text-3xl font-extrabold text-center mb-6 text-white drop-shadow-lg">
          Create Blog
        </h2>

        <EHForm onsubmit={onSubmit} defaultValues={BlogDefaultValue}>
          <div className="space-y-5">
            <motion.div whileHover={{ scale: 1.02 }}>
              <EHInput
                name="title"
                label="Title"
                type="text"
                placeholder="Enter blog title"
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }}>
              <EHImageUploader name="image" />
            </motion.div>
            <motion.div whileHover={{ scale: 1.02 }}>
              <EHTextarea
                name="content"
                label="Content"
                placeholder="Write your blog content here..."
              />
            </motion.div>
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`relative w-full py-3 px-6 rounded-xl text-white font-semibold overflow-hidden shadow-xl ${isLoading ? "" : "cursor-pointer"}`}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 transition-all duration-300" />
              <span className="relative z-10">{isLoading ? 'creating...' : 'Create Blog'}</span>
            </motion.button>
          </div>
        </EHForm>
      </motion.div>
    </motion.div>
  );
};

export default BlogForm;
