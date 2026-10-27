import { links, type Platform, stores } from '../../data/site.ts'
import releases from '../../generated/releases.json'
import snippets from '../../generated/snippets.json'
import { fill } from '../../i18n/index.ts'
import type { Copy } from '../../i18n/types.ts'
import { CodeTabs } from '../shared/CodeTabs.tsx'
import { DownloadIcon } from '../shared/icons.tsx'
import { LoaderLogo } from '../shared/LoaderLogo.tsx'
import { shippedBuilds } from './Hero.tsx'
import styles from './InstallSection.module.less'
import { Section } from './Section.tsx'

// The loaders' names on the compose tabs; the plugin's file starts a Paper server.
const loaderNames: Record<Platform, string> = {
  spigot: 'Paper',
  fabric: 'Fabric',
  neoforge: 'NeoForge',
}

export function InstallSection({ copy }: { copy: Copy }) {
  const { install, ui } = copy
  const shipped = shippedBuilds
  const extraStores = [
    stores.modrinth && { name: 'Modrinth', href: stores.modrinth },
    stores.hangar && { name: 'Hangar', href: stores.hangar },
  ].filter((store): store is { name: string; href: string } => Boolean(store))

  return (
    <Section id="install" title={install.title} lead={install.lead} tone="band">
      <ol className={styles.steps}>
        {install.steps.map((step) => (
          <li key={step.title} className={styles.step}>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </li>
        ))}
      </ol>

      <div className={styles.grid}>
        <div className={styles.download}>
          {shipped.map(([platform, href]) => (
            <a key={platform} className={styles.button} href={href}>
              <LoaderLogo platform={platform} />
              <span className={styles.buttonText}>
                <span className={styles.buttonLabel}>{install.download[platform]}</span>
                <span className={styles.buttonFile}>allay-{platform}.jar</span>
              </span>
              <DownloadIcon className={styles.buttonIcon} />
            </a>
          ))}
          <p className={styles.version}>
            {releases.plugin ? (
              <a href={`${links.pluginReleases}/tag/v${releases.plugin}`}>
                {fill(install.latest, { version: releases.plugin })}
              </a>
            ) : (
              <a href={links.pluginReleases}>{install.allReleases}</a>
            )}
          </p>
          <h3 className={styles.smallTitle}>{install.storesTitle}</h3>
          {extraStores.length > 0 ? (
            <ul className={styles.stores}>
              <li>
                <a href={links.pluginReleases}>GitHub</a>
              </li>
              {extraStores.map((store) => (
                <li key={store.name}>
                  <a href={store.href}>{store.name}</a>
                </li>
              ))}
            </ul>
          ) : (
            <p className={styles.small}>{install.storesNone}</p>
          )}
          <h3 className={styles.smallTitle}>{install.requirementsTitle}</h3>
          <ul className={styles.requirements}>
            {install.requirements.map((item, index) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: a fixed list of texts
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
        <div className={styles.docker}>
          <h3 className={styles.dockerTitle}>{install.dockerTitle}</h3>
          <p>{install.dockerLead}</p>
          <CodeTabs
            tabs={shipped.map(([platform]) => ({
              id: platform,
              label: loaderNames[platform],
              icon: <LoaderLogo platform={platform} size="sm" />,
              code: snippets.pluginCompose[platform],
            }))}
            file="compose.yaml"
            copyLabel={ui.copy}
            copiedLabel={ui.copied}
          />
        </div>
      </div>
    </Section>
  )
}
