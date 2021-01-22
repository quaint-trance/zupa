import { useState, useRef, useEffect, useCallback } from 'react';

export default function(eventName: string, element:HTMLElement | null, handler: (...arg)=>void){
  
    const savedHandler = useRef<any>();
  
    useEffect(() => {
        savedHandler.current = handler;
    }, [handler]);

    useEffect(() => {
      const isSupported = element && element.addEventListener;
      if (!isSupported ) return;
      
      const eventListener = event => savedHandler.current(event);
      
      element && element.addEventListener(eventName, eventListener);
      
      return () => {
        element && element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] 
  );
};
