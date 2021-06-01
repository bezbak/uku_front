import * as React from 'react';
import useWindowSize from '../public/hooks/useWindowSize';
import SizeContext from '../public/contexts/SizeContext';

const ResizeContainer = ({ children }) => {
  const size = useWindowSize();

  return (
    <SizeContext.Provider value={size}>
      {children}
    </SizeContext.Provider>
  );
};

export default ResizeContainer