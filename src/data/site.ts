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
 * Stores besides GitHub. Neither the Modrinth project `allay-ai` nor the Hangar
 * project `AllayAI` exists yet (checked 2026-10-20); fill in the address once
 * one does, and the install section lists it.
 */
export const stores: { modrinth: string | null; hangar: string | null } = {
  modrinth: null,
  hangar: null,
}
