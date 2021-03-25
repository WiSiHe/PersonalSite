import React from "react";

export default function Footer() {
  return (
    <div className="w-full bg-purple-500 text-white dark:bg-gray-800">
      <div className="xl:px-40 pb-12 lg:px-20 md:px-10 sm:px-5 px-10">
        <div className="w-full pt-12 flex flex-col sm:flex-row space-y-2  justify-start">
          <div className="w-full sm:w-2/5 pr-6 flex flex-col space-y-4">
            <p className="opacity-60">Pilestredet 63b, 0350 OSlo</p>
          </div>
          <div className="w-full sm:w-1/5 flex flex-col space-y-4">
            <a className="opacity-60">About Us</a>
            <a className="opacity-60">Responsibilities</a>
            <a className="opacity-60">Out Services</a>
            <a className="opacity-60">Contact</a>
          </div>
          <div className="w-full sm:w-1/5 flex flex-col space-y-4">
            <a className="opacity-60">Disclaimer</a>
            <a className="opacity-60">Testimonials</a>
            <a className="opacity-60">Privacy Policy</a>
            <a className="opacity-60">Terms of Service</a>
          </div>
          <div className="w-full sm:w-1/5 pt-6 flex items-end mb-1">
            <div className="flex flex-row space-x-4">
              <i className="fab fa-facebook-f"></i>
              <i className="fab fa-twitter"></i>
              <i className="fab fa-instagram"></i>
              <i className="fab fa-google"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
