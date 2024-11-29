import React, { useState, useCallback } from 'react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ReferenceLine
} from 'recharts';
import { Info, TrendingUp, Eye, Hash } from 'lucide-react';
import { Coin } from '../../types';

interface TrendChartProps {
  data: {
    timestamp: Date;
    price: number;
    mentions: number;
    volume: number;
  }[];
  timeRange: '1h' | '24h' | '7d' | '30d';
  type?: 'line' | 'area';
  metrics?: ('price' | 'mentions' | 'volume')[];
  height?: number | string;
  coin: Coin;
}

export const TrendChart: React.FC<TrendChartProps> = ({
  data,
  timeRange,
  type = 'area',
  metrics = ['price', 'mentions'],
  height = 400,
  coin
}) => {
  const [hoveredData, setHoveredData] = useState<any>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const formatXAxis = (timestamp: string) => {
    const date = new Date(timestamp);
    switch (timeRange) {
      case '1h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '24h':
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      case '7d':
        return date.toLocaleDateString([], { weekday: 'short' });
      case '30d':
        return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
      default:
        return date.toLocaleDateString();
    }
  };

  const getMetricColor = useCallback((metric: string) => {
    switch (metric) {
      case 'price':
        return '#8b5cf6';
      case 'mentions':
        return '#10b981';
      case 'volume':
        return '#3b82f6';
      default:
        return '#6b7280';
    }
  }, []);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload) return null;

    return (
      <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <img
            src={coin.thumbnail}
            alt={coin.name}
            className="w-8 h-8 rounded-full"
          />
          <div>
            <p className="font-medium text-gray-900">{coin.name}</p>
            <p className="text-sm text-gray-500">{formatXAxis(label)}</p>
          </div>
        </div>

        <div className="space-y-2">
          {payload.map((entry: any, index: number) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 text-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="text-gray-600">
                  {entry.name.charAt(0).toUpperCase() + entry.name.slice(1)}:
                </span>
              </div>
              <span className="font-medium" style={{ color: entry.color }}>
                {formatValue(entry.value, entry.name)}
              </span>
            </div>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="mt-3 pt-3 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>Rank: #{coin.rank || 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              <span>Views: {formatNumber(Math.floor(Math.random() * 10000))}</span>
            </div>
            <div className="flex items-center gap-1">
              <Hash className="w-3 h-3" />
              <span>Related: {Math.floor(Math.random() * 100)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const formatValue = (value: number, metric: string) => {
    switch (metric) {
      case 'price':
        return `$${value.toFixed(2)}`;
      case 'mentions':
        return value.toLocaleString();
      case 'volume':
        return `$${formatNumber(value)}`;
      default:
        return value;
    }
  };

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
    if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
    return num.toString();
  };

  const Chart = type === 'line' ? LineChart : AreaChart;
  const DataComponent = type === 'line' ? Line : Area;

  const handleMouseEnter = (metric: string) => {
    setSelectedMetric(metric);
  };

  const handleMouseLeave = () => {
    setSelectedMetric(null);
  };

  return (
    <div className="w-full bg-white rounded-xl p-2 sm:p-4">
      {/* Metrics Legend - Scrollable on mobile */}
      <div className="flex flex-nowrap gap-2 sm:gap-4 mb-4 overflow-x-auto pb-2 sm:pb-0 
        scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
        {metrics.map((metric) => (
          <button
            key={metric}
            className={`flex items-center gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm
              whitespace-nowrap flex-shrink-0 transition-colors duration-200 ${
                selectedMetric === metric
                  ? 'bg-gray-100 text-gray-900'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            onMouseEnter={() => handleMouseEnter(metric)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
              style={{ backgroundColor: getMetricColor(metric) }}
            />
            {metric.charAt(0).toUpperCase() + metric.slice(1)}
          </button>
        ))}
      </div>

      {/* Chart Container - Adjust height for mobile */}
      <div className="h-[300px] sm:h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <Chart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            onMouseMove={(e: any) => {
              if (e && e.activePayload) {
                setHoveredData(e.activePayload[0]?.payload);
              }
            }}
            onMouseLeave={() => setHoveredData(null)}
          >
            <defs>
              {metrics.map((metric) => (
                <linearGradient
                  key={metric}
                  id={`gradient-${metric}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={getMetricColor(metric)}
                    stopOpacity={0.2}
                  />
                  <stop
                    offset="95%"
                    stopColor={getMetricColor(metric)}
                    stopOpacity={0}
                  />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              stroke="#9ca3af"
              fontSize={12}
            />
            <YAxis
              yAxisId="left"
              stroke="#9ca3af"
              fontSize={12}
              tickFormatter={(value) => `$${formatNumber(value)}`}
            />
            {metrics.includes('mentions') && (
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#9ca3af"
                fontSize={12}
                tickFormatter={formatNumber}
              />
            )}
            <Tooltip content={<CustomTooltip />} />
            <Legend />

            {metrics.map((metric) => (
              <DataComponent
                key={metric}
                type="monotone"
                dataKey={metric}
                name={metric}
                stroke={getMetricColor(metric)}
                fill={`url(#gradient-${metric})`}
                yAxisId={metric === 'mentions' ? 'right' : 'left'}
                strokeWidth={selectedMetric === metric ? 3 : 2}
                dot={false}
                activeDot={{ r: 6 }}
                opacity={selectedMetric ? (selectedMetric === metric ? 1 : 0.3) : 1}
              />
            ))}

            {hoveredData && (
              <ReferenceLine
                x={hoveredData.timestamp}
                stroke="#6b7280"
                strokeDasharray="3 3"
              />
            )}
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 