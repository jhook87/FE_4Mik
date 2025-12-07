'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { MotionValue } from 'framer-motion';

interface TheBoxProps {
  explodeProgress: MotionValue<number>;
}

export default function TheBox({ explodeProgress }: TheBoxProps) {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const facesRef = useRef<THREE.Group>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    // Subscribe to motion value changes
    const unsubscribe = explodeProgress.on('change', (latest) => {
      progressRef.current = latest;
    });

    return () => unsubscribe();
  }, [explodeProgress]);

  useEffect(() => {
    if (!facesRef.current) return;

    // Create 6 faces of the box
    const faceSize = 1;
    const faces = [
      { position: [0, 0, faceSize / 2], rotation: [0, 0, 0], name: 'front' },
      { position: [0, 0, -faceSize / 2], rotation: [0, Math.PI, 0], name: 'back' },
      { position: [faceSize / 2, 0, 0], rotation: [0, Math.PI / 2, 0], name: 'right' },
      { position: [-faceSize / 2, 0, 0], rotation: [0, -Math.PI / 2, 0], name: 'left' },
      { position: [0, faceSize / 2, 0], rotation: [-Math.PI / 2, 0, 0], name: 'top' },
      { position: [0, -faceSize / 2, 0], rotation: [Math.PI / 2, 0, 0], name: 'bottom' },
    ];

    faces.forEach(({ position, rotation }) => {
      const faceGeometry = new THREE.PlaneGeometry(faceSize, faceSize);
      const faceMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0A0B0E,
        metalness: 0.9,
        roughness: 0.1,
      });
      const face = new THREE.Mesh(faceGeometry, faceMaterial);
      face.position.set(position[0], position[1], position[2]);
      face.rotation.set(rotation[0], rotation[1], rotation[2]);

      // Add edges
      const edgesGeometry = new THREE.EdgesGeometry(faceGeometry);
      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x00D4FF, linewidth: 2 });
      const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
      face.add(edges);

      facesRef.current?.add(face);
    });
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !facesRef.current || !coreRef.current) return;

    const time = state.clock.getElapsedTime();
    const progress = progressRef.current;

    // Rotate the entire group slowly
    groupRef.current.rotation.y = time * 0.2;
    groupRef.current.rotation.x = Math.sin(time * 0.1) * 0.1;

    // Explode faces outward based on scroll progress
    facesRef.current.children.forEach((face) => {
      if (face instanceof THREE.Mesh) {
        const direction = face.position.clone().normalize();
        const explodeDistance = progress * 2;
        face.position.lerp(
          direction.multiplyScalar(0.5 + explodeDistance),
          0.1
        );

        // Rotate faces during explosion
        face.rotation.x += progress * 0.01;
        face.rotation.y += progress * 0.01;
      }
    });

    // Scale and glow core as explosion progresses
    const coreScale = 0.2 + progress * 0.3;
    coreRef.current.scale.setScalar(coreScale);
    
    // Pulse the core
    const pulse = Math.sin(time * 3) * 0.1 + 0.9;
    coreRef.current.scale.multiplyScalar(pulse);

    // Make core more visible as explosion progresses
    const coreMaterial = coreRef.current.material as THREE.MeshBasicMaterial;
    coreMaterial.opacity = progress;
  });

  return (
    <group ref={groupRef}>
      {/* Exploding faces */}
      <group ref={facesRef} />

      {/* Glowing core */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color={0x00D4FF}
          transparent
          opacity={0}
        />
      </mesh>
    </group>
  );
}
