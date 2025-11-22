import React, { useState } from "react";
import Container from "../components/reusable/Container";
import { ImagePlus, FileText, Type } from "lucide-react";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    shortDesc: "",
    content: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  // input handler
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // image handler
  const handleImage = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    // Add API call for posting blog
  };

  return (
    <div className="pt-24 pb-20">
      <Container>
        <div className="max-w-3xl mx-auto bg-white shadow-primary p-6 rounded-lg">
          {/* Page Heading */}
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Create New Blog
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Title */}
            <div>
              <label className="text-gray-600 text-sm">Blog Title</label>
              <div className="flex items-center gap-3 border border-orange-700 px-4 py-2 rounded-full mt-1">
                <Type size={18} className="text-orange-700" />
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full outline-none text-sm tracking-wide"
                  placeholder="Enter blog title"
                />
              </div>
            </div>

            {/* Short description */}
            <div>
              <label className="text-gray-600 text-sm">Short Description</label>
              <div className="flex items-center gap-3 border border-orange-700 px-4 py-2 rounded-full mt-1">
                <FileText size={18} className="text-orange-700" />
                <input
                  type="text"
                  name="shortDesc"
                  value={formData.shortDesc}
                  onChange={handleChange}
                  className="w-full outline-none text-sm tracking-wide"
                  placeholder="Enter short description"
                />
              </div>
            </div>

            {/* Full Content */}
            <div>
              <label className="text-gray-600 text-sm">Blog Content</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                className="w-full border border-orange-700 rounded-lg p-3 mt-1 outline-none text-sm tracking-wide min-h-[200px]"
                placeholder="Write your full content here..."
              ></textarea>
            </div>

            {/* Upload Image */}
            <div>
              <label className="text-gray-600 text-sm">Banner Image</label>
              <div className="mt-2">
                <label className="w-full border border-orange-700 py-3 rounded-lg flex items-center justify-center cursor-pointer hover:bg-orange-50 transition">
                  <ImagePlus size={20} className="text-orange-700 mr-2" />
                  <span className="text-sm">Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImage}
                  />
                </label>

                {/* Image Preview */}
                {preview && (
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-60 object-cover rounded-lg mt-4 shadow"
                  />
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-orange-700 text-white px-8 py-2 rounded-full hover:bg-orange-800 transition-all"
              >
                Publish Blog
              </button>
            </div>
          </form>
        </div>
      </Container>
    </div>
  );
};

export default CreateBlog;
