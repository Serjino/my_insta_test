import React from 'react';

export const useDidMountEffect = (func: () => void, deps: Array<any>) => {
  const didMount = React.useRef(false);

  React.useEffect(() => {
    if (didMount.current) {
      func();
    } else {
      didMount.current = true;
    }
  }, deps);
};
