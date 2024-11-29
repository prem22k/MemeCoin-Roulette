import React from 'react';

export const CustomBar: React.FC<any> = (props) => {
  const { x, y, width, height, payload } = props;

  return (
    <g>
      <defs>
        <pattern
          id={`image-${payload.id}`}
          patternUnits="objectBoundingBox"
          width="1"
          height="1"
        >
          <image
            href={payload.thumbnail}
            x="0"
            y="0"
            width={width}
            height={width}
            preserveAspectRatio="xMidYMid slice"
          />
        </pattern>
      </defs>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        fill={`url(#image-${payload.id})`}
        className="transition-all duration-300 hover:opacity-90"
      />
      <circle
        cx={x + width / 2}
        cy={y - 10}
        r={15}
        fill={`url(#image-${payload.id})`}
        stroke="white"
        strokeWidth="2"
      />
    </g>
  );
};