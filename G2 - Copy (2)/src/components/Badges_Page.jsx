import { useEffect } from 'react';
import './Badges_Page.css'; // Import global styles
import appleicon from '../assets/appleicon.png';
import awardicon from '../assets/awardicon.png';
import bubbleicon from '../assets/bubbleicon.png';

const BadgesPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden"; // Disable scrolling
    return () => {
      document.body.style.overflow = "auto"; // Re-enable scrolling on unmount
    };
  }, []);

  const badges = [
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
      progress: '2/10',
      color: '#B0DD9C',
      icon: appleicon,
    },
    {
      id: 3,
      title: 'Earth Guardian',
      description: 'Comment and share with our community what the trashcan looks like!',
      progress: '1/1',
      color: '#ffb2ed',
      icon: bubbleicon,
    },
  ];

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
                  border: `5px solid ${badge.color}`, // Dynamic border color
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
              <p className="badge-progress">({badge.progress})</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BadgesPage;
