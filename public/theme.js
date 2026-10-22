// The theme a visitor picked with the toggle, before anything paints. Without a
// choice (the toggle's “system”) the page follows prefers-color-scheme, live.
try {
  const theme = localStorage.getItem('theme')
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme
} catch {
  // Storage can be off; the system theme still applies.
}
