import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Billboard, Text } from '@react-three/drei';
import { AdditiveBlending } from 'three';
import { useTheme } from 'styled-components';
import { useThemeMode } from '../theme/ThemeProvider';

const DISC_RADIUS = 3.0;
const BEACON_HEIGHT = 4.5;
const LABEL_FONT = '/fonts/IBMPlexMono-Bold.ttf';

/* A floating hex pad with a beacon pillar and a billboarded label. `active`
   brightens the beacon when the player is docked here. */
const Platform = ({ platform, active }) => {
  const orb = useRef();
  const theme = useTheme();
  const { reducedMotion } = useThemeMode();
  const accent = theme.color.accent;

  useFrame(({ clock }) => {
    if (!orb.current) return;
    if (reducedMotion) { orb.current.scale.setScalar(1); return; }
    const s = 1 + Math.sin(clock.elapsedTime * 2.2) * (active ? 0.25 : 0.12);
    orb.current.scale.setScalar(s);
  });

  return (
    <group position={platform.pos}>
      {/* hex pad */}
      <mesh rotation={[0, Math.PI / 6, 0]}>
        <cylinderGeometry args={[DISC_RADIUS, DISC_RADIUS, 0.15, 6, 1]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={active ? 0.9 : 0.45} />
      </mesh>
      {/* inner ring */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.1, 0]}>
        <ringGeometry args={[DISC_RADIUS * 0.55, DISC_RADIUS * 0.6, 48]} />
        <meshBasicMaterial color={accent} transparent opacity={active ? 0.5 : 0.18} side={2} />
      </mesh>
      {/* beacon pillar */}
      <mesh position={[0, BEACON_HEIGHT / 2, 0]}>
        <cylinderGeometry args={[0.03, 0.03, BEACON_HEIGHT, 6, 1]} />
        <meshBasicMaterial color={accent} transparent opacity={0.6} />
      </mesh>
      {/* beacon orb */}
      <mesh ref={orb} position={[0, BEACON_HEIGHT, 0]}>
        <sphereGeometry args={[0.28, 12, 12]} />
        <meshBasicMaterial
          color={accent}
          transparent
          opacity={active ? 0.95 : 0.6}
          blending={AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      {/* label */}
      <Billboard position={[0, BEACON_HEIGHT + 1.1, 0]}>
        <Text
          font={LABEL_FONT}
          fontSize={0.55}
          letterSpacing={0.08}
          color={active ? accent : theme.color.fgSubtle}
          anchorX="center"
          anchorY="middle"
        >
          {`${platform.number} ${platform.label}`}
        </Text>
      </Billboard>
    </group>
  );
};

export default Platform;
