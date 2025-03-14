import PropTypes from "prop-types";
import { First_test_building, commnents } from "../Damo_data/bindata";
import bin from "../assets/bin.png";
import organic from "../assets/organic.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import { useState } from "react";

const ToiletModal = ({ isOpen, onClose, toiletData, isLoggedIn }) => {
  const [commentText, setCommentText] = useState("");
  
  const handleCancel = () => {
    setCommentText("");
  };
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-xl sm:rounded-t-2xl flex flex-col gap-2 sm:gap-3 md:gap-4 p-3 sm:p-4 md:p-5 lg:p-6 max-h-[85vh] sm:max-h-[90vh] overflow-y-auto">
      {/* Close button */}
      <div className="relative">
        <button 
          onClick={onClose} 
          className="absolute right-1 top-1 sm:right-2 sm:top-2 bg-red-100 border-none cursor-pointer p-1 sm:p-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-base sm:text-lg text-red-500 transition-all duration-200 hover:bg-red-200"
        >
          ✕
        </button>
      </div>
      
      {/* Main content container */}
      <div className="flex flex-col sm:flex-col md:flex-row w-full gap-3 sm:gap-4 md:gap-5 lg:gap-6 overflow-auto scrollbar-thin pb-4 pt-0">

        {/* Container 1 - Location Information */}
        <div className="bg-white p-3 sm:p-4 rounded-lg w-full md:w-1/2 lg:w-1/4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-indigo-900 mb-2 sm:mb-3 whitespace-normal sm:whitespace-nowrap text-left w-full">
            {First_test_building.building_name}
          </h2>

          <div className="flex items-center justify-center text-indigo-900 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center py-2 px-3 sm:py-2.5 sm:px-5 bg-sky-200 w-full sm:w-4/5 md:w-3/4 lg:w-3/5 rounded-2xl sm:rounded-3xl underline cursor-pointer transition-colors duration-300 ease-in-out mb-4 sm:mb-6">
            {First_test_building.floor_number}th Floor
          </div>

          <h3 className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4 text-indigo-900 text-left w-full">
            Is this information correct?
          </h3>

          <div className="flex items-center gap-2 sm:gap-3">
            <button className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-sky-200 text-indigo-900 font-semibold border-none rounded-2xl sm:rounded-3xl text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out hover:bg-indigo-900 hover:text-sky-200">
              Yes
            </button>

            <button className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-indigo-900 text-sky-200 font-semibold border-none rounded-2xl sm:rounded-3xl text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out hover:bg-sky-200 hover:text-indigo-900">
              No
            </button>
          </div> 
        </div>

        {/* Container 2 - Features Section */}
        <div className="bg-white p-3 sm:p-4 rounded-lg w-full md:w-1/2 lg:w-1/4">
        <h2 className="font-afacad text-xl sm:text-2xl md:text-3xl text-indigo-900 font-bold text-left w-full">
        Features
        </h2>
          <div className="font-afacad text-base sm:text-lg md:text-l lg:text-l text-indigo-900 font-medium mt-3 sm:mt-4 md:mt-5 flex flex-col gap-2 sm:gap-3 md:gap-4 text-left w-full">
            <Feature icon={<img src={bin} alt="General Waste" className="w-5 h-5 sm:w-6 sm:h-6" />} label="General Waste" checked={toiletData.hasWomen} />
            <Feature icon={<img src={recycle} alt="Recycle Waste" className="w-5 h-5 sm:w-6 sm:h-6" />} label="Recycle Waste" checked={toiletData.hasMen} />
            <Feature icon={<img src={organic} alt="Organic Waste" className="w-5 h-5 sm:w-6 sm:h-6" />} label="Organic Waste" checked={toiletData.isAccessible} />
            <Feature icon={<img src={hazard} alt="Hazardous Waste" className="w-5 h-5 sm:w-6 sm:h-6" />} label="Hazardous Waste" checked={toiletData.isGenderNeutral} />
          </div>
        </div>

        {/* Container 3 - Comment section */}
        <div className="bg-white p-3 sm:p-4 rounded-lg w-full md:w-1/2 lg:w-1/4">
          <h2 className="text-base sm:text-lg md:text-xl font-medium mb-2 sm:mb-3 text-left w-full">{commnents.length} Comments</h2>
          <div className="max-h-[200px] sm:max-h-[250px] md:max-h-[300px] overflow-y-auto pr-1">
            {commnents.map((comment, index) => (
              <div key={index} className="flex mb-2 sm:mb-3">
                <img
                  src={comment.profile}
                  className="rounded-full w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0"
                  alt="Profile"
                />
                <div className="ml-2 py-2 px-3 sm:py-2.5 sm:px-4 bg-sky-200 text-indigo-900 rounded-[0_16px_16px_16px] sm:rounded-[0_20px_20px_20px] text-sm sm:text-base">
                  {comment.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Container 4 - Comment form or login prompt */}
        <div className="bg-white p-3 sm:p-4 rounded-lg w-full md:w-1/2 lg:w-1/4">
          
            <>
              <h2 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 text-indigo-900 text-left">Post a Comment</h2>
              <textarea
                className="w-full border border-gray-400 rounded-2xl p-4 mb-3 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-900"
                placeholder="Say something..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <div className="flex justify-between items-center">
                <button
                  className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-indigo-900 text-sky-200 font-semibold border-none rounded-2xl sm:rounded-3xl text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out hover:bg-sky-200 hover:text-indigo-900"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
                <button className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-indigo-900 text-sky-200 font-semibold border-none rounded-2xl sm:rounded-3xl text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out hover:bg-sky-200 hover:text-indigo-900 transition-colors duration-300">
                  Post
                </button>
              </div>
            </>

            

</div>
      </div>
    </div>
  );
};

const Feature = ({ icon, label, checked }) => (
  <div className="flex items-center">
    <span className="mr-2 sm:mr-3 w-5 sm:w-6 flex-shrink-0">{icon}</span>
    <span className="flex-grow">{label}</span>
    {checked ? (
      <span className="ml-auto text-emerald-500 text-base sm:text-lg md:text-xl">✓</span>
    ) : checked === false ? (
      <span className="ml-auto text-red-500 text-base sm:text-lg md:text-xl">✕</span>
    ) : (
      <span className="ml-auto text-gray-500 text-base sm:text-lg md:text-xl">?</span>
    )}
  </div>
);

Feature.propTypes = {
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

ToiletModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  toiletData: PropTypes.object.isRequired,
  isLoggedIn: PropTypes.bool
};

export default ToiletModal;