import { useState, useCallback, useEffect } from 'react';

interface UseModalOptions {
  defaultOpen?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  closeOnEsc?: boolean;
  closeOnOutsideClick?: boolean;
}

export const useModal = ({
  defaultOpen = false,
  onOpen,
  onClose,
  closeOnEsc = true,
  closeOnOutsideClick = true
}: UseModalOptions = {}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [lastFocusedElement, setLastFocusedElement] = useState<HTMLElement | null>(null);

  const open = useCallback(() => {
    setLastFocusedElement(document.activeElement as HTMLElement);
    setIsOpen(true);
    onOpen?.();
  }, [onOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
    onClose?.();
    lastFocusedElement?.focus();
  }, [onClose, lastFocusedElement]);

  const toggle = useCallback(() => {
    if (isOpen) {
      close();
    } else {
      open();
    }
  }, [isOpen, open, close]);

  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeOnEsc, close]);

  const handleOutsideClick = useCallback((event: React.MouseEvent) => {
    if (closeOnOutsideClick && event.target === event.currentTarget) {
      close();
    }
  }, [closeOnOutsideClick, close]);

  return {
    isOpen,
    open,
    close,
    toggle,
    handleOutsideClick
  };
};