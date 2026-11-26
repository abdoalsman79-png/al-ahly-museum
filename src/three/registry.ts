import * as THREE from 'three';
import { Kind } from './layout';
export const roots = new Set<THREE.Object3D>();
export const regRef = (kind: Kind, id: string) => (o: THREE.Object3D | null) => {
  if (o) { o.userData.spot = { kind, id }; roots.add(o); }
};
export const unreg = (o: THREE.Object3D) => roots.delete(o);
export const rendererState = { lost: false };
