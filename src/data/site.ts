// Every outside address the site links to, in one place.

import releases from '../generated/releases.json'

export const origin = 'https://allay.chat'

export const links = {
  plugin: 'https://github.com/allay-ai/minecraft',
  pluginReleases: 'https://github.com/allay-ai/minecraft/releases',
  pluginLatestJar:
    'https://github.com/allay-ai/minecraft/releases/latest/download/allay-spigot.jar',
  server: 'https://github.com/allay-ai/server',
  serverReleases: 'https://github.com/allay-ai/server/releases',
  serverImage: 'https://github.com/allay-ai/server/pkgs/container/server',
  organization: 'https://github.com/allay-ai',
  bot: 'https://t.me/AllayChatBot',
  openRouter: 'https://openrouter.ai',
  moonlands: 'https://minecraft.mairwunnx.com',
  author: 'https://github.com/MairwunNx',
  authorTelegram: 'https://t.me/mairwunnx',
  authorEmail: 'mailto:personal@mairwunnx.com',
  issues: 'https://github.com/allay-ai/site/issues',
} as const

export type Platform = 'spigot' | 'fabric' | 'neoforge'

/**
 * Allay's builds by platform, as the family names them: the plugin for Bukkit,
 * Spigot, Paper, and their forks (`spigot`), and the mods (`fabric`,
 * `neoforge`). A mod's jar is `allay-<platform>.jar` on the latest release;
 * until a release carries it (`src/generated/releases.json`, from the build),
 * it's null and the page says nothing about that mod.
 */
const latestJar = (platform: Platform) =>
  `https://github.com/allay-ai/minecraft/releases/latest/download/allay-${platform}.jar`
const released = (platform: Platform) =>
  (releases.pluginAssets as string[]).includes(`allay-${platform}.jar`) ? latestJar(platform) : null

export const builds: Record<Platform, string | null> = {
  spigot: links.pluginLatestJar,
  fabric: released('fabric'),
  neoforge: released('neoforge'),
}

/** Whether both mods are out, so the texts can name Fabric and NeoForge next to Spigot and Paper. */
export const modsShipped = builds.fabric !== null && builds.neoforge !== null

/**
 * Stores besides GitHub; the install section lists each that has an address. Hangar
 * has the plugin since 6.18.1; CurseForge has two projects, the plugin for Paper and
 * the mods for Fabric and NeoForge (allay-ai/minecraft's README links both). The Modrinth project `allay-ai` exists too, but stays
 * hidden while Modrinth reviews it (sent 2026-10-25): fill in
 * `https://modrinth.com/project/allay-ai` once it's public.
 */
export const stores: {
  modrinth: string | null
  hangar: string | null
  curseforgePlugin: string | null
  curseforgeMods: string | null
} = {
  modrinth: null,
  hangar: 'https://hangar.papermc.io/MairwunNx/AllayAI',
  curseforgePlugin: 'https://www.curseforge.com/projects/1766142',
  curseforgeMods: 'https://www.curseforge.com/projects/1766195',
}
