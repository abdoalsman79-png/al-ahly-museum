import * as THREE from 'three';
const m = (p: THREE.MeshStandardMaterialParameters) => new THREE.MeshStandardMaterial(p);
export const MAT = {
  gold: m({ color: '#d9a93e', metalness: 1, roughness: 0.28 }),
  silver: m({ color: '#d4d7dc', metalness: 1, roughness: 0.22 }),
  bronze: m({ color: '#a8672a', metalness: 1, roughness: 0.38 }),
  red: m({ color: '#b30f25', metalness: 0.2, roughness: 0.35 }),
  brass: m({ color: '#b8893a', metalness: 1, roughness: 0.35 }),
  marble: m({ color: '#ece4d4', metalness: 0, roughness: 0.18 }),
  dark: m({ color: '#2b1a12', metalness: 0.1, roughness: 0.5 }),
  stone: m({ color: '#cbb994', metalness: 0, roughness: 0.7 }),
  wood: m({ color: '#4a2a1a', metalness: 0, roughness: 0.55 }),
  glass: new THREE.MeshStandardMaterial({ color: '#cfe8ff', metalness: 0, roughness: 0.05, transparent: true, opacity: 0.13, depthWrite: false }),
  velvet: m({ color: '#5c0a18', metalness: 0, roughness: 0.9 })
};
export const tintMat = (t: 'gold' | 'silver' | 'bronze' | 'red') => MAT[t];
