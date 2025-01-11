import React from 'react';

type Props = {};

const Test = (props: Props) => {
  // Hexagon base style
  const hexagonStyle: React.CSSProperties = {
    width: '220px',
    height: '250px',
    backgroundColor: 'aliceblue',
    clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
    position: 'absolute',
    transition: 'transform 0.3s, background-color 0.3s',
  };

  // Hover effect style
  const hexagonHoverStyle: React.CSSProperties = {
    backgroundColor: 'lightcoral',
    transform: 'scale(1.05)',
  };

  // Individual hexagon positions
  const hexagonStyleSecond: React.CSSProperties = {
    ...hexagonStyle,
    top: '190px',
    left: '110px',
  };

  const hexagonStyleThird: React.CSSProperties = {
    ...hexagonStyle,
    top: '190px',
    left: '332px',
  };

  const hexagonStyleFourth: React.CSSProperties = {
    ...hexagonStyle,
    top: '380px',
    left: '221px',
  };

  // State to manage hover effects
  const [hoveredHexagon, setHoveredHexagon] = React.useState<number | null>(null);

  // Function to handle mouse enter
  const handleMouseEnter = (index: number) => {
    setHoveredHexagon(index);
  };

  // Function to handle mouse leave
  const handleMouseLeave = () => {
    setHoveredHexagon(null);
  };

  return (
    <div style={{ position: 'relative', height: '600px' }}>
      {/* First Hexagon */}
      <div
        style={{
          ...hexagonStyle,
          ...(hoveredHexagon === 1 ? hexagonHoverStyle : {}),
        }}
        onMouseEnter={() => handleMouseEnter(1)}
        onMouseLeave={handleMouseLeave}
      ></div>
      {/* Second Hexagon */}
      <div
        style={{
          ...hexagonStyleSecond,
          ...(hoveredHexagon === 2 ? hexagonHoverStyle : {}),
        }}
        onMouseEnter={() => handleMouseEnter(2)}
        onMouseLeave={handleMouseLeave}
      ></div>
      {/* Third Hexagon */}
      <div
        style={{
          ...hexagonStyleThird,
          ...(hoveredHexagon === 3 ? hexagonHoverStyle : {}),
        }}
        onMouseEnter={() => handleMouseEnter(3)}
        onMouseLeave={handleMouseLeave}
      ></div>
      {/* Fourth Hexagon */}
      <div
        style={{
          ...hexagonStyleFourth,
          ...(hoveredHexagon === 4 ? hexagonHoverStyle : {}),
        }}
        onMouseEnter={() => handleMouseEnter(4)}
        onMouseLeave={handleMouseLeave}
      ></div>
    </div>
  );
};

export default Test;
