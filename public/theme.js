// The theme a visitor picked with the toggle, before anything paints. Without a
// choice (the toggle's “system”) the page follows prefers-color-scheme, live.
try {
  const theme = localStorage.getItem('theme')
  if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme
} catch {
  // Storage can be off; the system theme still applies.
}

// The language a visitor picked in the switcher, kept the same way: a front page or the
// gallery in another language goes to theirs before it paints. The wiki and the legal
// pages are English only, so they stay.
try {
  const picked = localStorage.getItem('locale')
  const other = ['ru', 'es']
  if (picked === 'en' || other.includes(picked)) {
    const parts = location.pathname.split('/')
    const current = other.includes(parts[1]) ? parts[1] : 'en'
    const rest = (current === 'en' ? parts.slice(1) : parts.slice(2)).join('/')
    if (picked !== current && (rest === '' || rest === 'gallery/')) {
      location.replace(
        `${picked === 'en' ? '' : `/${picked}`}/${rest}${location.search}${location.hash}`,
      )
    }
  }
} catch {
  // Storage can be off; the page's own language stays.
}
