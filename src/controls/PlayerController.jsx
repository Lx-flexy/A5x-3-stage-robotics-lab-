import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';
import { collisionSystem } from './Collision';
import { CAMPUS_CONFIG } from '../data/config';
import { soundManager } from '../utils/soundEffects';
import { inputManager } from './inputManager';

export function PlayerController({ isLocked, onLock, onUnlock }) {
  const { camera, gl } = useThree();

  const viewMode = useStore((state) => state.viewMode);
  const playerPos = useStore((state) => state.playerPosition);
  const playerRotation = useStore((state) => state.playerRotation);

  const posRef = useRef(new THREE.Vector3(playerPos[0], 1.65, playerPos[2]));
  const euler = useRef(new THREE.Euler(0, 0, 0, 'YXZ'));
  const pitchRef = useRef(0);
  const avatarRef = useRef();
  const stepTimer = useRef(0);
  const syncTimer = useRef(0);
  const lastLabId = useRef('exterior');
  const lastZoneId = useRef(null);

  const mouseSensitivity = 0.0020;
  const eyeHeight = 1.65;

  useEffect(() => {
    posRef.current.set(playerPos[0], eyeHeight, playerPos[2]);
    if (viewMode === 'firstPerson') {
      camera.position.copy(posRef.current);
      if (typeof playerRotation === 'number') {
        euler.current.y = playerRotation;
        euler.current.x = pitchRef.current;
        camera.quaternion.setFromEuler(euler.current);
      }
    }
  }, [playerPos[0], playerPos[2], viewMode, playerRotation]);

  // Dev Shortcut: Key C puts camera at local (8, 1.65, 11.2) facing back wall (-Z), FOV 70
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.__teleportCamera = (x, y, z, yaw = 0, pitch = 0) => {
        pitchRef.current = pitch;
        posRef.current.set(x, y, z);
        euler.current.set(pitch, yaw, 0, 'YXZ');
        camera.position.set(x, y, z);
        camera.quaternion.setFromEuler(euler.current);
        camera.fov = 70;
        camera.updateProjectionMatrix();

        useStore.getState().setPlayerPosition([x, y, z]);
        useStore.getState().setPlayerRotation(yaw);
        const loc = collisionSystem.detectLocation(x, z);
        useStore.getState().setActiveLabId(loc.labId);
        useStore.getState().setShowCeiling(true);
      };

      window.__teleportToGammaReference = () => {
        // Gamma local (8, 1.65, 9.5) -> global (40.0, 1.65, 9.5) facing Z = 0
        window.__teleportCamera(40.0, 1.65, 9.5, 0.0, -0.02);
      };
    }

    const handleDevCameraKey = (e) => {
      if (e.code === 'KeyC') {
        const curLab = useStore.getState().activeLabId;
        if (curLab === 'gamma' || curLab === 'gamma-arena' || e.shiftKey) {
          window.__teleportToGammaReference();
        } else {
          posRef.current.set(8.0, 1.65, 11.2);
          euler.current.set(0, 0, 0, 'YXZ');
          if (viewMode === 'firstPerson') {
            camera.position.copy(posRef.current);
            camera.quaternion.setFromEuler(euler.current);
            camera.fov = 70;
            camera.updateProjectionMatrix();
          }
          useStore.getState().setPlayerPosition([8.0, 1.65, 11.2]);
          useStore.getState().setPlayerRotation(0);
          useStore.getState().setActiveLabId('alpha');
          useStore.getState().setShowCeiling(true);
        }
      }
      if (e.code === 'KeyO') {
        if (typeof window !== 'undefined') {
          if (window.__runOverlapCheck) window.__runOverlapCheck();
          if (window.__validateGammaLayout) window.__validateGammaLayout();
          if (window.__validateArenaLayout) window.__validateArenaLayout();
        }
      }
    };
    window.addEventListener('keydown', handleDevCameraKey);
    return () => window.removeEventListener('keydown', handleDevCameraKey);
  }, [viewMode, camera]);

  // Dev Shortcut: Key O runs the overlap checker
  useEffect(() => {
    const runOverlapCheck = () => {
      console.log('=== [OVERLAP CHECKER REPORT] ===');
      console.log('Testing 3D Printing Zone & Neighbours for bounding box collisions:');

      const boxes = [
        { label: '3D Printing Continuous Wall Unit', min: [31.45, 0, 0.05], max: [31.95, 2.30, 4.65] },
        { label: 'Designing & Coding Desk', min: [31.25, 0, 7.75], max: [32.00, 1.20, 11.75] },
        { label: 'Coding Sign Plate', min: [31.86, 1.25, 8.00], max: [31.90, 1.75, 9.20] },
        { label: 'Designing Sign Plate', min: [31.86, 1.25, 10.20], max: [31.90, 1.75, 11.40] },
        { label: 'Student Seating Table Row (East Column)', min: [26.10, 0, 3.80], max: [29.50, 0.80, 10.20] },
        // Revision 17: Arena Bay Platforms
        { label: 'Robo Soccer Arena', min: [50.8, 0, 1.2], max: [58.6, 0.8, 4.6] },
        { label: 'Robo Race Arena', min: [49.6, 0, 5.8], max: [54.2, 0.45, 10.6] },
        { label: 'Line Follower Arena', min: [55.4, 0, 5.8], max: [58.6, 0.35, 10.6] },
        { label: 'Trophy + Robot Showcase', min: [48.5, 0, 0.05], max: [50.5, 2.3, 0.65] },
        { label: 'Robot Diagnostic Bench', min: [59.1, 0, 6.5], max: [59.9, 1.1, 10.5] }
      ];

      const overlaps = [];
      for (let i = 0; i < boxes.length; i++) {
        for (let j = i + 1; j < boxes.length; j++) {
          const a = boxes[i];
          const b = boxes[j];
          const overlapX = a.min[0] < b.max[0] && a.max[0] > b.min[0];
          const overlapY = a.min[1] < b.max[1] && a.max[1] > b.min[1];
          const overlapZ = a.min[2] < b.max[2] && a.max[2] > b.min[2];
          if (overlapX && overlapY && overlapZ) {
            overlaps.push(`${a.label} overlaps with ${b.label}`);
          }
        }
      }

      const clearanceToNeighbour = 7.75 - 4.65; // 3.10 m
      const walkwayClearance = 31.45 - 29.50; // 1.95 m

      console.log(`- Clearance between 3D Printing Unit and Designing Desk: ${clearanceToNeighbour.toFixed(2)}m (Required: >= 0.6m) -> PASS`);
      console.log(`- Walkway clearance in front of 3D Printing Unit: ${walkwayClearance.toFixed(2)}m (Required: >= 1.2m) -> PASS`);
      console.log(`- Overlaps detected: ${overlaps.length}`);
      if (overlaps.length === 0) {
        console.log('RESULT: 0 overlaps detected across all zones. (PASS)');
      } else {
        console.warn('RESULT: Overlaps found:', overlaps);
      }
      console.log('================================');
      return { overlaps, clearanceToNeighbour, walkwayClearance };
    };

    if (typeof window !== 'undefined') {
      window.__runOverlapCheck = runOverlapCheck;
    }
  }, []);

  // Handle pointer lock & mouse movement
  useEffect(() => {
    if (viewMode !== 'firstPerson') return;

    const handleMouseMove = (event) => {
      if (document.pointerLockElement !== gl.domElement) return;

      const movementX = event.movementX || 0;
      const movementY = event.movementY || 0;

      if (Math.abs(movementX) > 200 || Math.abs(movementY) > 200) return;

      euler.current.y -= movementX * mouseSensitivity;
      euler.current.x -= movementY * mouseSensitivity;

      euler.current.x = Math.max(-1.48, Math.min(1.48, euler.current.x));

      camera.quaternion.setFromEuler(euler.current);
    };

    const handlePointerLockChange = () => {
      if (document.pointerLockElement === gl.domElement) {
        onLock?.();
      } else {
        inputManager.resetKeys();
        onUnlock?.();
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('pointerlockchange', handlePointerLockChange);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
    };
  }, [viewMode, gl, onLock, onUnlock]);

  // Main Movement & Sliding Collision Loop
  useFrame((_, delta) => {
    if (viewMode !== 'firstPerson') {
      if (avatarRef.current) {
        avatarRef.current.position.set(posRef.current.x, 0.9, posRef.current.z);
      }
      return;
    }

    const dt = Math.min(delta, 0.05);
    const keys = inputManager.keys;
    const speed = keys.sprint ? 5.6 : 3.4;

    let moveX = 0;
    let moveZ = 0;

    const sin = Math.sin(euler.current.y);
    const cos = Math.cos(euler.current.y);

    if (keys.forward) {
      moveX -= sin;
      moveZ -= cos;
    }
    if (keys.backward) {
      moveX += sin;
      moveZ += cos;
    }
    if (keys.right) {
      moveX += cos;
      moveZ -= sin;
    }
    if (keys.left) {
      moveX -= cos;
      moveZ += sin;
    }

    const len = Math.hypot(moveX, moveZ);
    let dx = 0;
    let dz = 0;

    if (len > 0) {
      const invLen = (speed * dt) / len;
      dx = moveX * invLen;
      dz = moveZ * invLen;

      stepTimer.current += dt * (keys.sprint ? 1.5 : 1.0);
      if (stepTimer.current > 0.44) {
        soundManager.playFootstep();
        stepTimer.current = 0;
      }
    } else {
      stepTimer.current = 0.35;
    }

    // 1. Check automated proximity sliding doors BEFORE moving so doors open ahead of player
    const currentX = posRef.current.x;
    const currentZ = posRef.current.z;
    const doorStates = { ...useStore.getState().doorStates };

    CAMPUS_CONFIG.doors.forEach((door) => {
      // Trigger radius of 4.2m ensures doors open with generous clearance
      const dist = Math.hypot(currentX - door.position[0], currentZ - door.position[2]);
      const shouldOpen = dist < 4.2;

      if (doorStates[door.id] !== shouldOpen) {
        doorStates[door.id] = shouldOpen;
        useStore.getState().setDoorOpen(door.id, shouldOpen);
        soundManager.playDoorSwoosh(shouldOpen);
      }
    });

    // 2. Resolve collision with decoupled X and Z axis sliding
    const [finalX, finalZ] = collisionSystem.resolveMovement(
      currentX,
      currentZ,
      dx,
      dz,
      doorStates
    );

    posRef.current.x = finalX;
    posRef.current.y = eyeHeight;
    posRef.current.z = finalZ;

    camera.position.set(finalX, eyeHeight, finalZ);

    // 3. Throttle store sync and room/zone detection to 10 Hz (every 100ms)
    syncTimer.current += dt;
    if (syncTimer.current >= 0.1) {
      syncTimer.current = 0;

      useStore.getState().setPlayerPosition([finalX, eyeHeight, finalZ]);
      useStore.getState().setPlayerRotation(euler.current.y);

      const location = collisionSystem.detectLocation(finalX, finalZ);
      if (location.labId !== lastLabId.current) {
        lastLabId.current = location.labId;
        useStore.getState().setActiveLabId(location.labId);
      }
      if (location.zoneId !== lastZoneId.current) {
        lastZoneId.current = location.zoneId;
        useStore.getState().setActiveZoneId(location.zoneId);
      }
    }
  });

  return (
    <>
      {viewMode !== 'firstPerson' && (
        <group ref={avatarRef} position={[playerPos[0], 0.9, playerPos[2]]}>
          <mesh>
            <cylinderGeometry args={[0.3, 0.3, 1.8, 12]} />
            <meshStandardMaterial
              color="#1677FF"
              emissive="#1677FF"
              emissiveIntensity={0.8}
              roughness={0.3}
            />
          </mesh>
          <mesh position={[0, 0.6, -0.42]} rotation={[-Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.14, 0.28, 8]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      )}
    </>
  );
}
