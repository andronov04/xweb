import React from 'react';

interface IFootnote {
  children: React.ReactNode;
  type?: 'warning' | 'error' | 'info';
}

const Footnote = ({ children, type }: IFootnote) => {
  let cl = 'bg-blue-500 text-white'; // info
  if (type === 'error') {
    cl = 'bg-rose-700 text-white';
  }
  if (type === 'warning') {
    cl = 'bg-orange-600 text-white';
  }
  return <div className={`${cl} w-full p-1 text-xs rounded-sm`}>{children}</div>;
};

export default Footnote;
