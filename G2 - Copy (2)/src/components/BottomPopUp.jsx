import React, { useState } from "react";

const BottomPopup = ({ isOpen, setIsOpen }) => {
  const [comments, setComments] = useState([
    { id: 1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: 2, text: "Voluptate velit esse cillum dolore eu fugiat nulla pariatur." }
  ]);
  const [newComment, setNewComment] = useState("");

  const addComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: comments.length + 1, text: newComment }]);
      setNewComment("");
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg p-4 rounded-t-2xl transition-transform translate-y-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-purple-900">ECC</h2>
            <button onClick={() => setIsOpen(false)} className="text-purple-900">▼</button>
          </div>

          <p className="text-purple-800 font-semibold mt-2">xth Floor</p>
          <p className="text-purple-800 font-bold">Is this information correct?</p>
          <div className="mt-2 space-x-2">
            <button className="bg-purple-200 px-4 py-2 rounded-full">Yes</button>
            <button className="bg-purple-500 text-white px-4 py-2 rounded-full">No?</button>
          </div>

          <div className="mt-4">
            <h3 className="text-purple-900 font-bold">Features</h3>
            <ul className="text-purple-800">
              <li>✅ General Waste</li>
              <li>✅ Recycle Waste</li>
              <li>❌ Organic Waste</li>
              <li>❌ Hazardous Waste</li>
            </ul>
          </div>

          <div className="mt-4">
            <h3 className="text-purple-900 font-bold">{comments.length} Comments</h3>
            {comments.map((comment) => (
              <p key={comment.id} className="bg-purple-200 p-2 rounded-lg my-1">{comment.text}</p>
            ))}
          </div>

          <div className="mt-4">
            <h3 className="text-purple-900 font-bold">Post a Comment</h3>
            <textarea
              className="w-full p-2 border rounded-lg"
              placeholder="Say something..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="mt-2 flex justify-end space-x-2">
              <button className="text-purple-900" onClick={() => setNewComment("")}>Cancel</button>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-full" onClick={addComment}>Post</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BottomPopup;
