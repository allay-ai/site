import { links, stores } from '../../data/site.ts'
import releases from '../../generated/releases.json'
import snippets from '../../generated/snippets.json'
import { fill } from '../../i18n/index.ts'
import type { Copy } from '../../i18n/types.ts'
import { CodeBlock } from '../shared/CodeBlock.tsx'
import { DownloadIcon } from '../shared/icons.tsx'
import styles from './InstallSection.module.less'
import { Section } from './Section.tsx'

export function InstallSection({ copy }: { copy: Copy }) {
  const { install, ui } = copy
  const extraStores = [
    stores.modrinth && { name: 'Modrinth', href: stores.modrinth },
    stores.hangar && { name: 'Hangar', href: stores.hangar },
  ].filter((store): store is { name: string; href: string } => Boolean(store))

  return (
    <Section id="install" kicker={install.kicker} title={install.title} lead={install.lead}>
      <ol className={styles.steps}>
        {install.steps.map((step, index) => (
          <li key={step.title} className={styles.step}>
            <span className={styles.number} aria-hidden="true">
              {index + 1}
            </span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </li>
        ))}
      </ol>

      <div className={styles.grid}>
        <div className={styles.download}>
          <a className={styles.button} href={links.pluginLatestJar}>
            <DownloadIcon className={styles.buttonIcon} />
            {install.download}
          </a>
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
          <CodeBlock
            code={snippets.pluginCompose}
            language="yaml"
            title="compose.yaml"
            copyLabel={ui.copy}
            copiedLabel={ui.copied}
          />
        </div>
      </div>
    </Section>
  )
}
