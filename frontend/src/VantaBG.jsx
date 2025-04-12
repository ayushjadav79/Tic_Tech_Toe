import React, { useEffect, useRef, useState } from 'react';

const VantaBackground = ({ children, effectName = 'BIRDS' }) => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const myRef = useRef(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let effect = null;
    let isActive = true;

    const loadVanta = async () => {
      try {
        const THREE = await import('three');
        let vantaModule;

        // Map effectName to module path
        const effectMap = {
          BIRDS: 'vanta/dist/vanta.birds.min',
          WAVES: 'vanta/dist/vanta.waves.min',
          NET: 'vanta/dist/vanta.net.min',
          CELLS: 'vanta/dist/vanta.cells.min',
          CLOUDS: 'vanta/dist/vanta.clouds.min',
          DOTS: 'vanta/dist/vanta.dots.min',
          FOG: 'vanta/dist/vanta.fog.min',
          GLOBE: 'vanta/dist/vanta.globe.min',
        };

        const modulePath = effectMap[effectName.toUpperCase()] || effectMap.BIRDS;
        vantaModule = await import(modulePath);

        if (!isActive) return;

        const VantaEffect = vantaModule.default;

        effect = VantaEffect({
          el: myRef.current,
          THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 1.0,
          backgroundColor: 0x111111,
          color1: 0x3498db,
          color2: 0x2980b9,
        });

        setVantaEffect(effect);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load Vanta effect:', error);
        setLoading(false);
      }
    };

    loadVanta();

    return () => {
      isActive = false;
      if (effect) effect.destroy();
    };
  }, [effectName]);

  return (
    <>
      <div
        ref={myRef}
        style={{
          width: '100%',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s ease-in',
        }}
      />
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          height: '100%',
        }}
      >
        {children}
      </div>
    </>
  );
};

export default VantaBackground;