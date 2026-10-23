import type { ShotFile } from '../i18n/types.ts'

/**
 * The pixel size of each file in public/shots/<locale>/: the same in every language, as the plugin's
 * tools/shots/shoot.py crops them, scaled to 1100 wide here. `status` is the video and its poster.
 */
export const shotSize: Record<ShotFile | 'status', { width: number; height: number }> = {
  status: { width: 1000, height: 444 },
  answer: { width: 1100, height: 583 },
  say: { width: 1100, height: 583 },
  memory: { width: 1100, height: 875 },
  consent: { width: 1100, height: 875 },
}
