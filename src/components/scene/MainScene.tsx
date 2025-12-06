'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

interface ParticleSystemProps {
  scrollProgress: number;
}

function ParticleSystem({ scrollProgress }: ParticleSystemProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const particleCount = 500;

  // Generate initial particle positions and velocities - using a seeded approach
  const particleData = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    // Use a simple seeded random to avoid Math.random in render
    let seed = 12345;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      // Random initial positions
      positions[i3] = (seededRandom() - 0.5) * 20;
      positions[i3 + 1] = (seededRandom() - 0.5) * 20;
      positions[i3 + 2] = (seededRandom() - 0.5) * 20;
      
      // Random velocities for chaotic movement
      velocities[i3] = (seededRandom() - 0.5) * 0.02;
      velocities[i3 + 1] = (seededRandom() - 0.5) * 0.02;
      velocities[i3 + 2] = (seededRandom() - 0.5) * 0.02;
    }

    return { positions, velocities };
  }, []);

  // Mutable refs for animation data
  const currentPositions = useRef(new Float32Array(particleData.positions));
  const currentVelocities = useRef(new Float32Array(particleData.velocities));

  // Calculate grid positions for Act II
  const gridPositions = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const gridSize = Math.ceil(Math.pow(particleCount, 1 / 3));
    const spacing = 1.5;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const x = (i % gridSize) - gridSize / 2;
      const y = (Math.floor(i / gridSize) % gridSize) - gridSize / 2;
      const z = Math.floor(i / (gridSize * gridSize)) - gridSize / 2;

      positions[i3] = x * spacing;
      positions[i3 + 1] = y * spacing;
      positions[i3 + 2] = z * spacing;
    }

    return positions;
  }, []);

  useEffect(() => {
    if (!meshRef.current) return;

    const dummy = new THREE.Object3D();
    
    // Initialize instances with current positions
    for (let i = 0; i < particleCount; i++) {
      dummy.position.set(
        currentPositions.current[i * 3],
        currentPositions.current[i * 3 + 1],
        currentPositions.current[i * 3 + 2]
      );
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [particleCount]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const time = state.clock.getElapsedTime();
    const dummy = new THREE.Object3D();

    // Determine which act we're in based on scroll progress
    const isActOne = scrollProgress < 0.25;
    const isActTwo = scrollProgress >= 0.25 && scrollProgress < 0.5;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      if (isActOne) {
        // ACT I: Chaotic movement with noise
        currentPositions.current[i3] += currentVelocities.current[i3] + Math.sin(time + i) * 0.001;
        currentPositions.current[i3 + 1] += currentVelocities.current[i3 + 1] + Math.cos(time + i) * 0.001;
        currentPositions.current[i3 + 2] += currentVelocities.current[i3 + 2] + Math.sin(time * 0.5 + i) * 0.001;

        // Boundary check - wrap around
        for (let j = 0; j < 3; j++) {
          if (Math.abs(currentPositions.current[i3 + j]) > 10) {
            currentPositions.current[i3 + j] = -Math.sign(currentPositions.current[i3 + j]) * 10;
          }
        }
      } else if (isActTwo) {
        // ACT II: Transition to grid
        const transitionProgress = (scrollProgress - 0.25) / 0.25;
        const easedProgress = Math.min(1, transitionProgress);

        for (let j = 0; j < 3; j++) {
          const current = currentPositions.current[i3 + j];
          const target = gridPositions[i3 + j];
          currentPositions.current[i3 + j] = current + (target - current) * easedProgress * 0.05;
        }
      }

      dummy.position.set(
        currentPositions.current[i3],
        currentPositions.current[i3 + 1],
        currentPositions.current[i3 + 2]
      );
      dummy.scale.setScalar(0.05);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }

    meshRef.current.instanceMatrix.needsUpdate = true;

    // Color transition from red to cyan
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    if (isActOne) {
      material.color.setHex(0xFF2A2A); // Red (jamming)
    } else if (isActTwo) {
      const colorTransition = (scrollProgress - 0.25) / 0.25;
      const r = 1 - colorTransition;
      const g = 0.83 * colorTransition;
      const b = 0.17 + 0.83 * colorTransition;
      material.color.setRGB(r, g, b);
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, particleCount]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial />
    </instancedMesh>
  );
}

function VineLines({ scrollProgress }: { scrollProgress: number }) {
  const linesRef = useRef<THREE.Group>(null);

  // Use memoized random positions to avoid re-rendering with different positions
  const linePositions = useMemo(() => {
    const lineCount = 20;
    const gridSize = 8;
    const spacing = 1.5;
    const positions = [];

    // Use seeded random for consistent positions
    let seed = 54321;
    const seededRandom = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    for (let i = 0; i < lineCount; i++) {
      const startX = (seededRandom() * gridSize - gridSize / 2) * spacing;
      const startY = (seededRandom() * gridSize - gridSize / 2) * spacing;
      const startZ = (seededRandom() * gridSize - gridSize / 2) * spacing;

      const endX = (seededRandom() * gridSize - gridSize / 2) * spacing;
      const endY = (seededRandom() * gridSize - gridSize / 2) * spacing;
      const endZ = (seededRandom() * gridSize - gridSize / 2) * spacing;

      positions.push({ start: [startX, startY, startZ], end: [endX, endY, endZ] });
    }

    return positions;
  }, []);

  useEffect(() => {
    if (!linesRef.current) return;

    // Clear existing lines
    while (linesRef.current.children.length > 0) {
      linesRef.current.remove(linesRef.current.children[0]);
    }

    // Only show lines in Act II when grid is forming
    if (scrollProgress >= 0.25 && scrollProgress < 0.5) {
      linePositions.forEach(({ start, end }) => {
        const points = [
          new THREE.Vector3(start[0], start[1], start[2]),
          new THREE.Vector3(end[0], end[1], end[2])
        ];

        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
          color: 0x00D4FF,
          opacity: 0.3,
          transparent: true,
        });
        const line = new THREE.Line(geometry, material);
        linesRef.current?.add(line);
      });
    }
  }, [scrollProgress, linePositions]);

  return <group ref={linesRef} />;
}

interface MainSceneProps {
  scrollProgress: number;
  lowPowerMode?: boolean;
}

export default function MainScene({ scrollProgress, lowPowerMode = false }: MainSceneProps) {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 75 }}
        gl={{ 
          antialias: !lowPowerMode,
          powerPreference: lowPowerMode ? 'low-power' : 'high-performance',
        }}
      >
        <ambientLight intensity={0.5} />
        <ParticleSystem scrollProgress={scrollProgress} />
        <VineLines scrollProgress={scrollProgress} />
        
        {!lowPowerMode && (
          <EffectComposer>
            <Bloom
              intensity={0.5}
              luminanceThreshold={0.2}
              luminanceSmoothing={0.9}
            />
          </EffectComposer>
        )}
      </Canvas>
    </div>
  );
}
