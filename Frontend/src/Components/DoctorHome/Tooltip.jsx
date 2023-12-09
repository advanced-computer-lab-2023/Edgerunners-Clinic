import React, { useState } from 'react';

const Tooltip = () => {
 const [visible, setVisible] = useState(false);
 const [coords, setCoords] = useState({ x: 0, y: 0 });

 const showTooltip = (e) => {
    setVisible(true);
    setCoords({ x: e.clientX, y: e.clientY });
 };

 const hideTooltip = () => {
    setVisible(false);
 };

 return (
    <div className="container" onMouseMove={showTooltip} onMouseOut={hideTooltip}>
      <p>Hover over me</p>
      {visible && (
        <div className="tooltip" style={{ top: coords.y + 10, left: coords.x }}>
          Click to use 1 credit
        </div>
      )}
    </div>
 );
};

export default Tooltip;