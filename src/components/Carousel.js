import React from "react";

const Carousel = ({
  backgroundImage,
  quote,
  detail,
  author,
  position,
  authorImage,
}) => {
  return (
    <div
      className="pt-20 pb-20 min-h-[385px] bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute top-0 right-0 bottom-0 left-0 bg-gray-500 bg-opacity-50"></div>

      <div>
        <div className="relative container w-1/2 mx-24 ">
          <blockquote className="w-full flex">
            <div className="p-5 bg-[#154e8d] h-full rounded-l-lg">
              <i className="w-5 text-white fa fa-quote-left "></i>
            </div>
            <div className="text-base italic text-gray-500 bg-white p-6">
              <p className="p-2 ">{quote}</p>
              <p className="p-2 ">{detail}</p>
              <footer className="flex p-2 items-center">
                <img
                  src={authorImage}
                  alt="Tác giả"
                  className="rounded-full w-16 mr-2"
                />
                <span className="text-gray-600">{author}</span>
                <span>&nbsp;• {position}</span>
              </footer>
            </div>
          </blockquote>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
