import React, { useEffect, useRef } from 'react';

function LocalStorageCleaner() {
  const intervalRef = useRef(null);

  useEffect(() => {
    const cleanupInterval = () => {
      localStorage.clear(); // Borra todos los datos de localStorage
    };

    const resetInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current); // Limpia el intervalo existente si hay alguno
      }
      
      // Establece un nuevo intervalo de limpieza cada 24 horas
      intervalRef.current = setInterval(cleanupInterval, 24 * 60 * 60 * 1000);
    };

    resetInterval(); // Llama a resetInterval inicialmente al montar el componente

    // Reinicia el intervalo si hay movimiento de teclado o mouse
    const handleMouseMove = () => {
      resetInterval();
    };

    const handleKeyDown = () => {
      resetInterval();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('keydown', handleKeyDown);

    // Limpia los event listeners al desmontar el componente
    return () => {
      clearInterval(intervalRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return null;
}

export default LocalStorageCleaner;
