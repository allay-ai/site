// The theme a visitor picked with the toggle, before anything paints. Without a
// choice the page follows the system through prefers-color-scheme.
try {
  const theme = localStorage.getItem('theme')
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme
} catch {
  // Storage can be off; the system theme still applies.
}
