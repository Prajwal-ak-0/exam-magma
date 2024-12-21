import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children }) => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
      {children}
    </div>
  );
};

