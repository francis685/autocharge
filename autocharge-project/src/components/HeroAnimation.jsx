import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// --- This is the new "Plexus" or "Neural Network" animation ---

function PlexusParticles({ count = 200, radius = 5, maxDistance = 1.2 }) {
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * radius * 2;
    }
    return pos;
  }, [count, radius]);

  const velocities = useMemo(() => {
    const vel = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      vel[i] = (Math.random() - 0.5) * 0.01;
    }
    return vel;
  }, [count]);

  const pointsRef = useRef();
  const linesRef = useRef();

  useFrame((state, delta) => {
    if (!pointsRef.current) return;

    const pos = pointsRef.current.geometry.attributes.position.array;
    const vel = velocities;
    
    // Update particle positions
    for (let i = 0; i < pos.length; i += 3) {
      pos[i] += vel[i];
      pos[i + 1] += vel[i + 1];
      pos[i + 2] += vel[i + 2];

      // Bounce off walls
      if (Math.abs(pos[i]) > radius) vel[i] *= -1;
      if (Math.abs(pos[i + 1]) > radius) vel[i + 1] *= -1;
      if (Math.abs(pos[i + 2]) > radius) vel[i + 2] *= -1;
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update lines
    const linePos = linesRef.current.geometry.attributes.position.array;
    // THIS IS THE FIX:
    // We create a *new variable* 'lineIndex' to count,
    // instead of trying to increment the 'linePos' array.
    let lineIndex = 0;
    
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < maxDistance) {
          linePos[lineIndex * 3] = pos[i * 3];
          linePos[lineIndex * 3 + 1] = pos[i * 3 + 1];
          linePos[lineIndex * 3 + 2] = pos[i * 3 + 2];
          lineIndex++; // Increment the new variable

          linePos[lineIndex * 3] = pos[j * 3];
          linePos[lineIndex * 3 + 1] = pos[j * 3 + 1];
          linePos[lineIndex * 3 + 2] = pos[j * 3 + 2];
          lineIndex++; // Increment the new variable
        }
      }
    }
    
    linesRef.current.geometry.setDrawRange(0, lineIndex);
    linesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={count}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.05} color="#0ea5e9" />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={new Float32Array(count * count * 3)}
            count={count * count}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#0ea5e9" transparent opacity={0.1} />
      </lineSegments>
    </group>
  );
}

// This is the main 3D scene component
export default function HeroAnimation() {
  return (
    <div className="absolute inset-0 z-0 opacity-50 [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_30%,transparent_100%)]">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <PlexusParticles />
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate={true}
          autoRotateSpeed={0.3}
          enableDamping={true}
        />
      </Canvas>
    </div>
  );
}