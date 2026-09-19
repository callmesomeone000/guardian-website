'use client';

import { useRef, useEffect, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { cn, lerp, getCapabilityColor } from '@/lib/utils';

interface NodeProps {
  id: string;
  position: [number, number, number];
  state: 'AVAILABLE' | 'DEGRADED' | 'UNAVAILABLE';
  isCentral?: boolean;
  isRelay?: boolean;
  label: string;
}

export function Node({ id, position, state, isCentral, isRelay, label }: NodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pulseRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  const color = getCapabilityColor(state);
  const baseScale = isCentral ? 1.5 : isRelay ? 1.2 : 1;

  useFrame((state, delta) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime();
      const pulseScale = 1 + Math.sin(time * 2) * 0.05;
      meshRef.current.scale.setScalar(baseScale * pulseScale);

      if (pulseRef.current && isCentral) {
        const pulseTime = time * 1.5;
        pulseRef.current.scale.setScalar(1 + Math.sin(pulseTime) * 0.3);
        if (pulseRef.current.material instanceof THREE.Material) {
          pulseRef.current.material.opacity = 0.15 + Math.sin(pulseTime) * 0.1;
        }
      }
    }

    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.1;
    }
  });

  const geometry = useMemo(() => 
    isCentral 
      ? new THREE.IcosahedronGeometry(0.5, 1)
      : isRelay
        ? new THREE.OctahedronGeometry(0.4, 0)
        : new THREE.DodecahedronGeometry(0.35, 0)
  , [isCentral, isRelay]);

  const material = useMemo(() => 
    new THREE.MeshPhysicalMaterial({
      color,
      metalness: 0.3,
      roughness: 0.4,
      transmission: 0.1,
      thickness: 0.5,
      clearcoat: 0.5,
      clearcoatRoughness: 0.2,
    })
  , [color]);

  const pulseGeometry = useMemo(() => new THREE.SphereGeometry(0.7, 32, 32), []);
  const pulseMaterial = useMemo(() => 
    new THREE.MeshBasicMaterial({
      color: '#00D4C8',
      transparent: true,
      opacity: 0.15,
      side: THREE.BackSide,
    })
  , []);

  if (state === 'UNAVAILABLE' && !isCentral) {
    return (
      <group ref={groupRef} position={position}>
        <mesh
          ref={meshRef}
          geometry={geometry}
          material={material}
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        />
        {isCentral && <mesh ref={pulseRef} geometry={pulseGeometry} material={pulseMaterial} />}
        <sprite
          position={[0, 1.2, 0]}
          material={new THREE.SpriteMaterial({
            map: createLabelTexture(label, color),
            transparent: true,
            depthTest: false,
          })}
          scale={[2, 0.6, 1]}
        />
      </group>
    );
  }

  return (
    <group ref={groupRef} position={position}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
      {isCentral && <mesh ref={pulseRef} geometry={pulseGeometry} material={pulseMaterial} />}
      <sprite
        position={[0, 1.2, 0]}
        material={new THREE.SpriteMaterial({
          map: createLabelTexture(label, color),
          transparent: true,
          depthTest: false,
        })}
        scale={[2, 0.6, 1]}
      />
    </group>
  );
}

function createLabelTexture(text: string, color: string): THREE.Texture {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;
  canvas.width = 256;
  canvas.height = 64;
  context.font = 'bold 24px "Geist", "Inter", sans-serif';
  context.fillStyle = color;
  context.textAlign = 'center';
  context.textBaseline = 'middle';
  context.fillText(text, 128, 32);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

interface ConnectionProps {
  from: [number, number, number];
  to: [number, number, number];
  fromState: string;
  toState: string;
  isRelay?: boolean;
}

export function Connection({ from, to, fromState, toState, isRelay }: ConnectionProps) {
  const lineRef = useRef<THREE.Line>(null);
  const [progress, setProgress] = useState(0);

  const color = isRelay && fromState === 'AVAILABLE' && toState === 'AVAILABLE'
    ? '#00D4C8'
    : fromState === 'AVAILABLE' && toState === 'AVAILABLE'
      ? '#1E2D3D'
      : '#EF4444';

  const opacity = isRelay ? 0.6 : fromState === 'AVAILABLE' && toState === 'AVAILABLE' ? 0.3 : 0.15;

  useFrame(() => {
    if (isRelay && lineRef.current) {
      setProgress(p => (p + 0.005) % 1);
    }
  });

  const points = useMemo(() => [
    new THREE.Vector3(...from),
    new THREE.Vector3(...to),
  ], [from, to]);

  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);
  
  const material = useMemo(() => new THREE.LineDashedMaterial({
    color,
    linewidth: isRelay ? 3 : 1.5,
    dashSize: isRelay ? 0.5 : 0,
    gapSize: isRelay ? 0.3 : 0,
    opacity,
    transparent: true,
  }), [color, isRelay, opacity]);

  if (isRelay) {
    return (
      <primitive
        ref={lineRef}
        object={new THREE.Line(geometry, material)}
        computeLineDistances
      />
    );
  }

  return (
    <primitive
      ref={lineRef}
      object={new THREE.Line(geometry, material)}
    />
  );
}

interface PulseRingProps {
  position: [number, number, number];
  active: boolean;
  color: string;
}

export function PulseRing({ position, active, color }: PulseRingProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && active) {
      const time = state.clock.getElapsedTime();
      const scale = 1 + (time % 3) / 3;
      const opacity = 1 - (time % 3) / 3;
      meshRef.current.scale.setScalar(scale * 2);
      if (meshRef.current.material instanceof THREE.Material) {
        meshRef.current.material.opacity = opacity * 0.15;
      }
    }
  });

  const geometry = useMemo(() => new THREE.RingGeometry(0.5, 0.6, 64), []);
  const material = useMemo(() => new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.15,
    side: THREE.DoubleSide,
  }), [color]);

  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation-x={-Math.PI / 2}
      geometry={geometry}
      material={material}
      visible={active}
    />
  );
}

interface ParticleFlowProps {
  from: [number, number, number];
  to: [number, number, number];
  color: string;
  speed: number;
  fading?: boolean;
}

export function ParticleFlow({ from, to, color, speed, fading }: ParticleFlowProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 50;

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const alphas = new Float32Array(particleCount);
    const sizes = new Float32Array(particleCount);
    
    for (let i = 0; i < particleCount; i++) {
      const t = i / particleCount;
      positions[i * 3] = lerp(from[0], to[0], t);
      positions[i * 3 + 1] = lerp(from[1], to[1], t);
      positions[i * 3 + 2] = lerp(from[2], to[2], t);
      alphas[i] = fading ? (1 - t) * 0.5 : 0.5;
      sizes[i] = 0.08;
    }
    
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('alpha', new THREE.BufferAttribute(alphas, 1));
    g.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    return g;
  }, [from, to, fading]);

  const material = useMemo(() => new THREE.PointsMaterial({
    color,
    size: 0.08,
    transparent: true,
    opacity: 0.8,
    vertexColors: false,
    depthWrite: false,
  }), [color]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
      const alphas = pointsRef.current.geometry.attributes.alpha.array as Float32Array;
      const time = state.clock.getElapsedTime() * speed;
      
      for (let i = 0; i < particleCount; i++) {
        const t = (i / particleCount + time) % 1;
        positions[i * 3] = lerp(from[0], to[0], t);
        positions[i * 3 + 1] = lerp(from[1], to[1], t);
        positions[i * 3 + 2] = lerp(from[2], to[2], t);
        
        if (fading) {
          alphas[i] = (1 - t) * 0.5;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.geometry.attributes.alpha.needsUpdate = true;
    }
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}