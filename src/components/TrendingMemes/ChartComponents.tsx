import React from 'react';



import { Coin } from '../../types';



import { TrendingUp, TrendingDown, Sparkles } from 'lucide-react';







interface CustomTooltipProps {



  active?: boolean;



  payload?: Array<{



    payload: Coin;



  }>;



}







export const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload }) => {



  if (!active || !payload?.[0]) return null;







  const data = payload[0].payload;



  const trendingUp = data.mentions > 1000; // Example threshold







  return (



    <div className="bg-white p-3 sm:p-4 rounded-lg shadow-lg border border-gray-200 



      max-w-[200px] sm:max-w-[250px] animate-fadeIn"



    >



      {/* Header */}



      <div className="flex items-center space-x-2 sm:space-x-3 mb-4">



        <img



          src={data.thumbnail}



          alt={data.name}



          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm"



        />



        <div className="min-w-0">



          <h3 className="font-semibold text-sm sm:text-base text-gray-900 truncate">



            {data.name}



          </h3>



          <p className="text-xs sm:text-sm text-gray-500 truncate">



            {data.symbol}



          </p>



        </div>



      </div>







      {/* Stats */}



      <div className="space-y-2 text-xs sm:text-sm">



        <div className="flex justify-between items-center p-2 rounded-lg bg-gray-50">



          <span className="text-gray-600">Mentions</span>



          <span className="font-medium flex items-center space-x-1">



            <span>{data.mentions.toLocaleString()}</span>



            {trendingUp ? (



              <TrendingUp className="h-3 w-3 text-green-500" />



            ) : (



              <TrendingDown className="h-3 w-3 text-red-500" />



            )}



          </span>



        </div>



        <div className="flex justify-between items-center p-2 rounded-lg bg-purple-50">



          <span className="text-purple-600">Odds</span>



          <span className="font-medium text-purple-600">



            {data.odds.toFixed(2)}x



          </span>



        </div>



        <div className="flex justify-between items-center p-2 rounded-lg bg-green-50">



          <span className="text-green-600">Return</span>



          <span className="font-medium text-green-600 flex items-center">



            <Sparkles className="h-3 w-3 mr-1" />



            {data.potentialMultiplier.toFixed(2)}x



          </span>



        </div>



      </div>



    </div>



  );



};







interface CustomBarProps {



  x?: number;



  y?: number;



  width?: number;



  height?: number;



  payload?: Coin;



}







export const CustomBar: React.FC<CustomBarProps> = (props) => {



  const { x = 0, y = 0, width = 0, height = 0, payload } = props;



  if (!payload) return null;







  const imageSize = Math.min(width, 30);



  const circleRadius = Math.min(width / 4, 12);



  const gradientId = `gradient-${payload.id}`;



  const filterId = `filter-${payload.id}`;



  const glowId = `glow-${payload.id}`;







  return (



    <g>



      {/* Definitions */}



      <defs>



        {/* Gradient for bar */}



        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">



          <stop offset="0%" stopColor="#9333ea" stopOpacity={0.9} />



          <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.9} />



        </linearGradient>







        {/* Pattern for coin image */}



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



            width={imageSize}



            height={imageSize}



            preserveAspectRatio="xMidYMid slice"



          />



        </pattern>







        {/* Shadow filter */}



        <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%">



          <feDropShadow 



            dx="0" 



            dy="2" 



            stdDeviation="2" 



            floodColor="#000"



            floodOpacity="0.15"



          />



        </filter>







        {/* Glow effect */}



        <filter id={glowId}>



          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>



          <feMerge>



            <feMergeNode in="coloredBlur"/>



            <feMergeNode in="SourceGraphic"/>



          </feMerge>



        </filter>



      </defs>







      {/* Background glow */}



      <rect



        x={x}



        y={y}



        width={width}



        height={height}



        fill={`url(#${gradientId})`}



        opacity="0.1"



        rx={4}



        ry={4}



        filter={`url(#${glowId})`}



      />







      {/* Main bar */}



      <rect



        x={x}



        y={y}



        width={width}



        height={height}



        fill={`url(#${gradientId})`}



        rx={4}



        ry={4}



        className="transition-all duration-300 hover:opacity-90 cursor-pointer"



        filter={`url(#${filterId})`}



      >



        {/* Animation for hover effect */}



        <animate



          attributeName="opacity"



          values="0.9;1;0.9"



          dur="2s"



          repeatCount="indefinite"



        />



      </rect>







      {/* Coin icon with shadow and glow */}



      <g filter={`url(#${glowId})`}>



        {/* Shadow circle */}



        <circle



          cx={x + width / 2}



          cy={y - circleRadius}



          r={circleRadius + 2}



          fill="rgba(0,0,0,0.1)"



          className="transition-transform duration-300"



        />







        {/* Main coin circle */}



        <circle



          cx={x + width / 2}



          cy={y - circleRadius}



          r={circleRadius}



          fill={`url(#image-${payload.id})`}



          stroke="white"



          strokeWidth="2"



          className="transition-transform duration-300 hover:scale-110 cursor-pointer"



          filter={`url(#${filterId})`}



        >



          {/* Pulse animation */}



          <animate



            attributeName="r"



            values={`${circleRadius};${circleRadius + 1};${circleRadius}`}



            dur="2s"



            repeatCount="indefinite"



          />



        </circle>



      </g>







      {/* Highlight overlay */}



      <rect



        x={x}



        y={y}



        width={width}



        height={height}



        fill="url(#gradient-highlight)"



        opacity="0.1"



        rx={4}



        ry={4}



        className="transition-opacity duration-300 hover:opacity-0"



      />



    </g>



  );



}; 


