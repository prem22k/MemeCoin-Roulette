import React, { useState } from 'react';

import { TrendingUp, ZoomIn, ZoomOut, RefreshCw } from 'lucide-react';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

import { Coin } from '../../types';

import { buttonStyles } from '../../styles/buttons';

import { CustomBar } from './ChartComponents';

import { MemeTooltip } from './MemeTooltip';

type ViewMode = 'bar' | 'line';
type TimeRange = '1h' | '24h' | '7d' | '30d';

interface TrendingChartProps {

  data: Coin[];

  onRefresh?: () => void;

  isRefreshing?: boolean;

  showControls?: boolean;

  height?: string;

  viewMode?: ViewMode;

  timeRange?: TimeRange;

}



export const TrendingChart: React.FC<TrendingChartProps> = ({

  data,

  onRefresh,

  isRefreshing = false,

  showControls = true,

  height = "h-[250px] sm:h-[300px] md:h-[400px]",

  viewMode = 'bar',

  timeRange = '24h'

}) => {

  const [zoomLevel, setZoomLevel] = useState(1);

  const [hoveredBar, setHoveredBar] = useState<string | null>(null);



  const handleZoomIn = () => {

    setZoomLevel(prev => Math.min(prev + 0.1, 2));

  };



  const handleZoomOut = () => {

    setZoomLevel(prev => Math.max(prev - 0.1, 0.5));

  };



  const playHoverSound = () => {

    const audio = new Audio('/sounds/hover.mp3');

    audio.volume = 0.2;

    audio.play().catch(() => {});

  };



  return (

    <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg 

      p-3 sm:p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl"

    >

      {showControls && (

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-lg sm:text-xl font-semibold text-gray-900 flex items-center">

            <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600 mr-2" />

            Trending Memes

          </h2>

          <div className="flex items-center space-x-2">

            {onRefresh && (

              <button

                onClick={onRefresh}

                disabled={isRefreshing}

                className={`

                  ${buttonStyles.icon}

                  ${isRefreshing ? 'animate-spin' : ''}

                  relative group

                `}

                aria-label="Refresh data"

              >

                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />

                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 

                  bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 

                  group-hover:opacity-100 transition-opacity"

                >

                  Refresh

                </span>

              </button>

            )}

            <button

              onClick={handleZoomOut}

              className={`${buttonStyles.icon} relative group`}

              aria-label="Zoom out"

            >

              <ZoomOut className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />

              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 

                bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 

                group-hover:opacity-100 transition-opacity"

              >

                Zoom Out

              </span>

            </button>

            <button

              onClick={handleZoomIn}

              className={`${buttonStyles.icon} relative group`}

              aria-label="Zoom in"

            >

              <ZoomIn className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />

              <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 

                bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 

                group-hover:opacity-100 transition-opacity"

              >

                Zoom In

              </span>

            </button>

          </div>

        </div>

      )}



      <div className={`${height} w-full`}>

        <ResponsiveContainer>

          <BarChart

            data={data}

            margin={{

              top: 20,

              right: 10,

              left: 0,

              bottom: 5,

            }}

            className="transition-transform duration-300 ease-in-out"

            style={{

              transform: `scale(${zoomLevel})`,

              transformOrigin: 'center',

            }}

            onMouseMove={(e) => {

              if (e?.activePayload?.[0]) {

                const newHoveredBar = e.activePayload[0].payload.symbol;

                if (newHoveredBar !== hoveredBar) {

                  setHoveredBar(newHoveredBar);

                  playHoverSound();

                }

              }

            }}

            onMouseLeave={() => setHoveredBar(null)}

          >

            <XAxis

              dataKey="symbol"

              tick={{ fontSize: 12 }}

              interval={0}

              height={30}

            />

            <YAxis

              tick={{ fontSize: 12 }}

              width={40}

              tickFormatter={(value) => 

                value >= 1000 ? `${(value / 1000).toFixed(1)}k` : value

              }

            />

            <Tooltip

              content={<MemeTooltip />}

              cursor={{ fill: 'transparent' }}

            />

            <Bar

              dataKey="mentions"

              shape={<CustomBar />}

              isAnimationActive={true}

              animationDuration={1000}

            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  );

}; 
