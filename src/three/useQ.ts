import { useStore } from '../store';
export const useQuality = () => useStore((s) => s.quality);
