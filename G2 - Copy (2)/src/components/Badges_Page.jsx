import React, { useState, useEffect } from 'react'; 
import './Badges_Page.css'; 
import appleicon from '../assets/appleicon.png';
import awardicon from '../assets/awardicon.png';
import bubbleicon from '../assets/bubbleicon.png';
import axios from 'axios'; 

const BadgesPage = () => {
  const [badges, setBadges] = useState([ 
    {
      id: 1,
      title: 'Bin Explorer',
      description: 'Earn this badge by adding a trashcan to your collection a total of 4 times.',
      progress: '0/4',
      color: '#FFD580',
      icon: awardicon,
    },
    {
      id: 2,
      title: 'Trash Tracker',
      description: 'Earn this badge by checking the trashcan information a total of 10 times.',
      progress: '0/10',
      color: '#B0DD9C',
      icon: appleicon,
    },
    {
      id: 3,
      title: 'Earth Guardian',
      description: 'Comment and share with our community what the trashcan looks like!',
      progress: '0/5',
      color: '#ffb2ed',
      icon: bubbleicon,
    },
  ]);
  
  useEffect(() => {
    const fetchBadges = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error("No token found, please login first.");
        return;
      }

      try {
        const res = await fetch("http://localhost:5001/api/badge/profile", {
          method: "GET",
          headers: { "x-auth-token": token },
        });

        if (!res.ok) {
          console.error("Failed to fetch badges.");
          return;
        }

        const response = await res.json();

        if (response) {
          setBadges((prevBadges) =>
            prevBadges.map((badge) => {
              if (badge.title === "Bin Explorer" && response.binCount !== undefined) {
                const maxProgress = 4;
                const updatedProgress = Math.min(response.binCount, maxProgress);
                return { 
                  ...badge, 
                  progress: `${updatedProgress}/${maxProgress}`,
                  isComplete: updatedProgress === maxProgress,
                };
              }

              if (badge.title === "Earth Guardian" && response.commentCount !== undefined) {
                const maxProgress = 5;
                const updatedProgress = Math.min(response.commentCount, maxProgress);
                return { 
                  ...badge, 
                  progress: `${updatedProgress}/${maxProgress}`,
                  isComplete: updatedProgress === maxProgress,
                };
              }

              if (badge.title === "Trash Tracker" && response.trackCount !== undefined) {
                const maxProgress = 10;
                const updatedProgress = Math.min(response.trackCount, maxProgress);
                return { 
                  ...badge, 
                  progress: `${updatedProgress}/${maxProgress}`,
                  isComplete: updatedProgress === maxProgress,
                };
              }

              return badge; 
            })
          );
        } else {
          console.error("No relevant data found in response.");
        }
      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };

    fetchBadges();
  }, []);

  return (
    <div className="app">
      <main className="main-content">
        <h1 className="badge-title">Badges Collection</h1>
        <div className="badge-container">
          {badges.map((badge) => (
            <div className="badge-card" key={badge.id}>
              <div
                className="badge-circle"
                style={{
                  backgroundColor: badge.color,
                  border: `5px solid ${badge.color}`, 
                }}
              >
                <img
                  src={badge.icon}
                  alt={`${badge.title} Icon`}
                  className="badge-icon"
                />
              </div>

              <h2 className="badge-name">{badge.title}</h2>
              <p className="badge-description">{badge.description}</p>
              <p className="flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-600">{badge.progress}</span> 
                {badge.isComplete && <span className="font-bold text-green-500 mt-1">Complete</span>}
              </p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BadgesPage;
