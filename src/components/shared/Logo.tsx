import styles from './Logo.module.less'

/** The Allay mark: public/logo.png, made from the organization's icon (allay-ai/.github, media/icon-512.png). */
export function Logo({ className }: { className?: string }) {
  return (
    <img
      className={className ? `${styles.logo} ${className}` : styles.logo}
      src="/logo.png"
      alt=""
      width={160}
      height={160}
      decoding="async"
    />
  )
}
