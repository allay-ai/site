// Every outside address the site links to, in one place.

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

/**
 * Allay's builds by platform, as the family names them: the plugin for Bukkit,
 * Spigot, Paper, and their forks (`spigot`), and the mods (`fabric`,
 * `neoforge`), which don't exist yet. A mod's jar will be
 * `allay-<platform>.jar` on the latest release; fill it in once one ships, and
 * the install section can offer it.
 */
export const builds: Record<'spigot' | 'fabric' | 'neoforge', string | null> = {
  spigot: links.pluginLatestJar,
  fabric: null,
  neoforge: null,
}

/**
 * Stores besides GitHub. Neither the Modrinth project `allay-ai` nor the Hangar
 * project `AllayAI` exists yet (checked 2026-10-20); fill in the address once
 * one does, and the install section lists it.
 */
export const stores: { modrinth: string | null; hangar: string | null } = {
  modrinth: null,
  hangar: null,
}
