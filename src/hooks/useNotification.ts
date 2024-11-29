import { useState, useCallback, useRef, useEffect } from 'react';

type NotificationType = 'success' | 'error' | 'info' | 'warning';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

interface NotificationOptions {
  duration?: number;
  persist?: boolean;
}

export const useNotification = (defaultDuration = 5000) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutsRef = useRef<{ [key: string]: number }>({});

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(window.clearTimeout);
    };
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    if (timeoutsRef.current[id]) {
      window.clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }
  }, []);

  const addNotification = useCallback((
    type: NotificationType,
    message: string,
    options?: NotificationOptions
  ) => {
    const id = Math.random().toString(36).substr(2, 9);
    const notification: Notification = {
      id,
      type,
      message,
      duration: options?.duration ?? defaultDuration
    };

    setNotifications(prev => [...prev, notification]);

    if (!options?.persist) {
      timeoutsRef.current[id] = window.setTimeout(() => {
        removeNotification(id);
      }, notification.duration);
    }

    return id;
  }, [defaultDuration, removeNotification]);

  const showSuccess = useCallback((message: string, options?: NotificationOptions) => {
    return addNotification('success', message, options);
  }, [addNotification]);

  const showError = useCallback((message: string, options?: NotificationOptions) => {
    return addNotification('error', message, options);
  }, [addNotification]);

  const showInfo = useCallback((message: string, options?: NotificationOptions) => {
    return addNotification('info', message, options);
  }, [addNotification]);

  const showWarning = useCallback((message: string, options?: NotificationOptions) => {
    return addNotification('warning', message, options);
  }, [addNotification]);

  return {
    notifications,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeNotification
  };
}; 