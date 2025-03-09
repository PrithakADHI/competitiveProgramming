import React from "react";

const API_URL = import.meta.env.VITE_API_URL;

const Card = ({ url, title, desc, done }) => {
  return (
    <>
      <a href="#">
        <div
          className={`card card-animation hover:-translate-y-3 w-[12rem] md:w-[14rem] lg:w-[16rem] shadow-xl transition-all duration-500 ease-in-out ${
            done ? "bg-green-900 text-white" : "bg-base-200"
          }`}
        >
          <figure className="px-5 pt-5 md:px-8 md:pt-8 lg:px-10 lg:pt-10">
            <img
              src={`${API_URL}${url}`}
              alt={title}
              className="rounded-xl size-[10rem] md:size-[12rem] lg:size-[14rem] object-contain"
            />
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title text-base md:text-lg lg:text-xl">
              {title}
            </h2>
            <p className="card-subtitle text-sm md:text-base lg:text-lg">
              {desc.length > 25 ? `${desc.slice(0, 20)}...` : desc}
            </p>
          </div>
        </div>
      </a>
    </>
  );
};

export default Card;
