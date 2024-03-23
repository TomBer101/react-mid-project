import React, { useState, useEffect, useRef } from 'react';


const ExpandableParagraph = ({ content, lineClamp }) => {

  let lineHeight;
  if(window.innerWidth < 768) {lineHeight = 2.3}
  else if (window.innerWidth<1025) {lineHeight = 5.3}
  else {lineHeight = 3}
//  let lineHeight = window.innerWidth < 768 ?2.3  : 5.3;
//   lineHeight = window.innerWidth < 1025 ? 5.3:  3

  const [height, setHeight] = useState(lineHeight * lineClamp + 'rem');
  const testCompRef = useRef(null);


  const showHidePara = () => {
    if (height === lineHeight * lineClamp + 'rem') {
      const maxHeight = testCompRef.current.scrollHeight;
      setHeight(`${maxHeight}px`);
    } else {
      setHeight(lineHeight * lineClamp + 'rem');
    }
  };

  return (
    <div>
      {false && <button onClick={showHidePara}>Show/hide</button>}
      <div id="parent" style={{ height, overflow: 'hidden', transition: 'height 0.5s' }}>
        <div id="content" ref={testCompRef}  onClick={showHidePara} className='exhibit-description' style={{WebkitLineClamp : height===lineHeight * lineClamp + 'rem' ? lineClamp : 'unset' }}>
          {content}
        </div>
      </div>
    </div>
  );
};

export default ExpandableParagraph;
