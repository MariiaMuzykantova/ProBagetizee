import React from 'react';

import './index.css';

const LandingPageGreating = () => {
  return (
    <div style={{ color: '#ffffff' }}>
      <div className="title">
        <h3>ProBudgetizer</h3>
      </div>
      <div className="msg">
        <h5 className="msg-text">
          Manage projects with your friends and family. While having fun. For
          free.
        </h5>
      </div>
    </div>
  );
};

LandingPageGreating.displayName = 'LandingPageGreating';

export default LandingPageGreating;
