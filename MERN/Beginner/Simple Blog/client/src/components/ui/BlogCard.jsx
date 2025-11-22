import { MoveRight } from "lucide-react";
import profile from "../../assets/profile.jpg";
import sample_blog from "../../assets/sample.jpeg";

const BlogCard = () => {
  return (
    <div className="flex bg-white rounded-xl shadow-lg overflow-hidden w-[600px]">
      {/* left banner */}
      <div className="w-2/5">
        <img src={sample_blog} alt="" className="w-full h-full object-cover" />
      </div>

      {/* right content */}
      <div className="p-5 w-3/5">
        <p className="text-xs text-gray-400 flex items-center gap-2">
          By Antanu Dutta
          <img
            src={profile}
            className="w-8 h-8 rounded-full border-4 border-white"
          />
        </p>
        <span className="text-xs text-gray-400 ">2025-02-03 08:15 AM</span>
        <h2 className="mt-2 text-xl font-bold text-gray-800">
          Why Morning Routines Matter
        </h2>
        <p className="text-sm text-gray-600 mt-2">
          How simplicity continues to shape modern interfaces.
        </p>

        <button className="mt-4 bg-orange-700 text-white px-4 cursor-pointer hover:bg-orange-800 transition-all duration-300 py-1 rounded-full flex items-center gap-2">
          View <MoveRight size={15} />
        </button>
      </div>
    </div>
  );
};

export default BlogCard;
