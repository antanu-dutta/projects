import React from "react";
import Container from "../components/reusable/Container";

const BlogDetails = () => {
  return (
    <div className="pt-24 pb-20">
      <Container>
        {/* Blog Banner Image */}
        <div className="w-full h-[350px] rounded-lg overflow-hidden shadow-primary">
          <img
            src="https://images.unsplash.com/photo-1505685296765-3a2736de412f?w=1200"
            alt="Blog Banner"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content Area */}
        <div className="max-w-3xl mx-auto mt-10">
          {/* Title */}
          <h1 className="text-4xl font-semibold text-gray-800 mb-4">
            Why Morning Routines Matter
          </h1>

          {/* Author & Date */}
          <div className="flex items-center gap-3 mb-6">
            <img
              src="https://scontent-ccu1-2.xx.fbcdn.net/v/t39.30808-1/437942922_122130784034229589_2608333589194260663_n.jpg"
              alt=""
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm text-gray-700 font-medium">Antanu Dutta</p>
              <p className="text-xs text-gray-500">Posted on Feb 03, 2025</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-gray-700 leading-relaxed tracking-wide text-[15px] mb-6">
            A calm morning routine helps increase productivity and reduces
            stress. Whether it's meditation, journaling, exercise, or simply
            enjoying a peaceful cup of tea — mornings set the tone for the day.
            <br />
            <br />
            Research shows that having a consistent morning pattern improves
            mental clarity, emotional stability, and overall well-being. When
            you start the day with intention, you are more likely to stay
            focused and make better decisions throughout the day.
            <br />
            <br />
            Your routine doesn’t need to be complicated — even 10 minutes of
            stillness or gratitude can change your mindset completely. What
            matters is consistency and starting your day with purpose.
          </p>
        </div>
      </Container>
    </div>
  );
};

export default BlogDetails;
