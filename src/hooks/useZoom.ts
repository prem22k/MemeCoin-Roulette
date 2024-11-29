import { useState, useCallback, useEffect } from 'react';

interface UseZoomOptions {
  initialZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  step?: number;
  onZoomChange?: (zoom: number) => void;
}

export const useZoom = ({
  initialZoom = 1,
  minZoom = 0.5,
  maxZoom = 2,
  step = 0.1,
  onZoomChange
}: UseZoomOptions = {}) => {
  const [zoomLevel, setZoomLevel] = useState(initialZoom);

  const zoomIn = useCallback(() => {
    setZoomLevel(prev => {
      const newZoom = Math.min(prev + step, maxZoom);
      onZoomChange?.(newZoom);
      return newZoom;
    });
  }, [step, maxZoom, onZoomChange]);

  const zoomOut = useCallback(() => {
    setZoomLevel(prev => {
      const newZoom = Math.max(prev - step, minZoom);
      onZoomChange?.(newZoom);
      return newZoom;
    });
  }, [step, minZoom, onZoomChange]);

  const setZoom = useCallback((zoom: number) => {
    const clampedZoom = Math.min(Math.max(zoom, minZoom), maxZoom);
    setZoomLevel(clampedZoom);
    onZoomChange?.(clampedZoom);
  }, [minZoom, maxZoom, onZoomChange]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey || event.metaKey) {
        if (event.key === '=' || event.key === '+') {
          event.preventDefault();
          zoomIn();
        } else if (event.key === '-') {
          event.preventDefault();
          zoomOut();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [zoomIn, zoomOut]);

  return {
    zoomLevel,
    zoomIn,
    zoomOut,
    setZoom,
    canZoomIn: zoomLevel < maxZoom,
    canZoomOut: zoomLevel > minZoom
  };
};