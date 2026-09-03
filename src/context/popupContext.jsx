"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const PopupContext = createContext();

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error('usePopup must be used within a PopupProvider');
  }
  return context;
};

export const PopupProvider = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    console.log("PopupProvider useEffect triggered");
    // Always show popup on page load with a delay
    const timer = setTimeout(() => {
      console.log("Setting popup open to true");
      setIsPopupOpen(true);
    }, 1500); // 1.5 second delay

    return () => {
      console.log("Cleanup timer");
      clearTimeout(timer);
    };
  }, []); // Empty dependency array means this runs once on mount

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  console.log("PopupProvider rendering, isPopupOpen:", isPopupOpen);

  const value = {
    isPopupOpen,
    openPopup,
    closePopup,
  };

  return (
    <PopupContext.Provider value={value}>
      {children}
    </PopupContext.Provider>
  );
};