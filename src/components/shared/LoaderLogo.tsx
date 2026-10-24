import fabric from '../../assets/loaders/fabric.png'
import neoforge from '../../assets/loaders/neoforge.svg'
import paper from '../../assets/loaders/paper.svg'
import type { Platform } from '../../data/site.ts'
import styles from './LoaderLogo.module.less'

// Each project's own logo, used to name it: Paper's from PaperMC/website (the
// plugin runs on Paper and Spigot alike), Fabric's from fabricmc.net, and
// NeoForge's from neoforged/Documentation.
const logos: Record<Platform, string> = { spigot: paper, fabric, neoforge }

/** A build's loader as its logo on a light tile, readable on any background. */
export function LoaderLogo({ platform, size = 'md' }: { platform: Platform; size?: 'sm' | 'md' }) {
  return (
    <span className={`${styles.tile} ${styles[size]}`} aria-hidden="true">
      <img className={styles.image} src={logos[platform]} alt="" />
    </span>
  )
}
