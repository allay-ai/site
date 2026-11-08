import type { ShotFile } from '../i18n/types.ts'

/**
 * The pixel size of each file in public/shots/<locale>/: the same in every language, as the plugin's
 * tools/shots/shoot.py crops them, scaled to 1100 wide here. `status` is the video and its poster.
 */
export const shotSize: Record<ShotFile | 'status', { width: number; height: number }> = {
  status: { width: 1000, height: 454 },
  answer: { width: 1100, height: 597 },
  say: { width: 1100, height: 597 },
  memory: { width: 1100, height: 1050 },
  consent: { width: 1100, height: 875 },
  trail: { width: 1100, height: 830 },
  chests: { width: 1100, height: 830 },
  recipe: { width: 1100, height: 990 },
  'memory-one': { width: 1100, height: 1000 },
}

/**
 * The scenes recorded whole (`<file>.mp4`, its poster `<file>-end.webp`), in
 * the pixel size of the MP4: shoot.py records them 1000 wide.
 */
export const clipSize: Partial<Record<ShotFile, { width: number; height: number }>> = {
  say: { width: 1000, height: 454 },
  recipe: { width: 1000, height: 756 },
  trail: { width: 1000, height: 756 },
  chests: { width: 1000, height: 756 },
}
