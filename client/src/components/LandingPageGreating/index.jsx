import React from 'react'

import "./index.css"

const LandingPageGreating = () => {
return (
  <div style={{color: "#ffffff"}}>
    <div className="title">
      <h3>ProBudgetizer</h3>
    </div>
    <div className="msg">
      <h className="msg-text">Manage projects with your friends and family. While having fun. For free.</h>
    </div>
  </div>
)
}

LandingPageGreating.displayName = 'LandingPageGreating'

export default LandingPageGreating
