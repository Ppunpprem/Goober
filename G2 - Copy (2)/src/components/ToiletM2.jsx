import PropTypes from "prop-types";
import bin from "../assets/bin.png";
import organic from "../assets/organic.png";
import hazard from "../assets/hazard.png";
import recycle from "../assets/recycle.png";
import { useState, useEffect } from "react";
import { useUser } from "../context/UserContext";

const ToiletModal = ({ isOpen, onClose, toiletData, isLoggedIn }) => {
  const { user } = useUser();
  const [commentText, setCommentText] = useState("");
  const [buildingData, setBuildingData] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/bin")
      .then(async (res) => {
        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        if (contentType && contentType.includes("application/json")) {
          return res.json(); // Parse JSON normally
        } else {
          const htmlText = await res.text(); // Read as HTML text
          throw new Error(`Expected JSON but received HTML: ${htmlText}`);
        }
      })
      .then((data) => {
        setBuildingData(data);
      })
      .catch((error) => {
        console.error("Error fetching building data:", error);
      });

    fetch(`http://localhost:5001/api/bin/${toiletData.id}`)
      .then(async (res) => {
        const contentType = res.headers.get("content-type");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        if (contentType && contentType.includes("application/json")) {
          return res.json(); // Parse JSON normally
        } else {
          const htmlText = await res.text(); // Read as HTML text
          throw new Error(`Expected JSON but received HTML: ${htmlText}`);
        }
      })
      .then((data) => {
        setComments(data.comments);
      })

      .catch((error) => {
        console.error("Error fetching comments:", error);
      });
  }, [toiletData.id]);

  const handleCancel = () => {
    setCommentText("");
  };

  const handleYesClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/bin/${toiletData.id}/increase`,
        {
          method: "PUT",
          body: JSON.stringify({ userId: user.id }), // Send the user ID
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const { updatedBin, updatedUser } = await response.json();

      if (!updatedBin || !updatedUser) {
        throw new Error("Failed to update bin or user");
      }

      if (updatedUser.badges && updatedUser.badges.includes("Trash Tracker")) {
        alert("Congratulations! You have earned the Trash Tracker badge!");
      }
    } catch (error) {
      console.error("Error increasing bin info correction:", error);
      alert("An error occurred. Please try again.");
    }
  };

  const handleNoClick = async () => {
    try {
      const response = await fetch(
        `http://localhost:5001/api/bin/${toiletData.id}/decrease`,
        {
          method: "PUT",
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const updatedBin = await response.json();
      console.log("No clicked", updatedBin);
    } catch (error) {
      console.error("Error decreasing bin info correction:", error);
    }
  };

  const handlePostComment = async () => {
    if (!commentText.trim()) return; // Prevent posting empty comments

    const commentData = {
      user: user.id, // Replace with actual user ID
      bin: toiletData.id, // Use the toiletData ID
      text: commentText,
    };

    try {
      const response = await fetch("http://localhost:5001/api/comment/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const newComment = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
      setCommentText(""); // Clear the textarea after posting
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  if (!isOpen || !buildingData) return null;

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
            {toiletData?.name || "Location not available"}
          </h2>

          <div className="flex items-center justify-center text-indigo-900 font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl text-center py-2 px-3 sm:py-2.5 sm:px-5 bg-sky-200 w-full sm:w-4/5 md:w-3/4 lg:w-3/5 rounded-2xl sm:rounded-3xl underline cursor-pointer transition-colors duration-300 ease-in-out mb-4 sm:mb-6">
            {toiletData?.floor
              ? `${toiletData?.floor} Floor`
              : "Floor not available"}
          </div>

          <h3 className="text-base sm:text-lg md:text-xl mb-2 sm:mb-3 md:mb-4 text-indigo-900 text-left w-full">
            Is this information correct?
          </h3>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-sky-200 text-indigo-900 font-bold border-none rounded-2xl sm:rounded-3xl text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out hover:bg-indigo-900 hover:text-sky-200"
              onClick={handleYesClick}
            >
              Yes
            </button>

            <button
              className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-[#17005A] text-[#9AD4EC] font-bold border-none rounded-2xl sm:rounded-3xl text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#9AD4EC] hover:text-[#17005A]"
              onClick={handleNoClick}
            >
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
            <Feature
              icon={
                <img
                  src={bin}
                  alt="General Waste"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              }
              label="General Waste"
              checked={toiletData.generalWaste}
            />
            <Feature
              icon={
                <img
                  src={recycle}
                  alt="Recycle Waste"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              }
              label="Recycle Waste"
              checked={toiletData.recycleWaste}
            />
            <Feature
              icon={
                <img
                  src={organic}
                  alt="Organic Waste"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              }
              label="Organic Waste"
              checked={toiletData.organicWaste}
            />
            <Feature
              icon={
                <img
                  src={hazard}
                  alt="Hazardous Waste"
                  className="w-5 h-5 sm:w-6 sm:h-6"
                />
              }
              label="Hazardous Waste"
              checked={toiletData.hazardousWaste}
            />
          </div>
        </div>

        {/* Container 3 - Comment section */}
        <div className="bg-white p-3 sm:p-4 rounded-lg w-full md:w-1/2 lg:w-1/4">
          <h2 className="text-base sm:text-lg md:text-xl font-medium mb-2 sm:mb-3 text-left w-full">
            {comments.length} Comments
          </h2>
          <div className="max-h-[200px] sm:max-h-[250px] md:max-h-[300px] overflow-y-auto pr-1">
            {comments.map((comment, index) => (
              <div key={index} className="flex mb-2 sm:mb-3">
                <img
                  src={`http://localhost:5001/${comment.user.profilePhoto}`}
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
            <h2 className="text-lg sm:text-xl font-medium mb-2 sm:mb-3 text-indigo-900 text-left">
              Post a Comment
            </h2>
            <textarea
              className="w-full border border-gray-400 rounded-2xl p-4 mb-3 h-32 focus:outline-none focus:ring-2 focus:ring-indigo-900"
              placeholder="Say something..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-between items-center">
              <button
                className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-[#17005A] text-[#9AD4EC] font-bold border-none rounded-2xl sm:rounded-3xl text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#9AD4EC] hover:text-[#17005A]"
                onClick={handleCancel}
              >
                Cancel
              </button>
              <button
                className="py-1.5 sm:py-2 md:py-2.5 px-3 sm:px-4 md:px-5 bg-[#17005A] text-[#9AD4EC] font-bold border-none rounded-2xl sm:rounded-3xl text-sm sm:text-base cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[#9AD4EC] hover:text-[#17005A]"
                onClick={handlePostComment}
              >
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
      <span className="ml-auto text-emerald-500 text-base sm:text-lg md:text-xl">
        ✓
      </span>
    ) : checked === false ? (
      <span className="ml-auto text-red-500 text-base sm:text-lg md:text-xl">
        ✕
      </span>
    ) : (
      <span className="ml-auto text-gray-500 text-base sm:text-lg md:text-xl">
        ?
      </span>
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
  isLoggedIn: PropTypes.bool,
};

export default ToiletModal;
