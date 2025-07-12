document.getElementById('goBtn').addEventListener('click', () => {
  const lang = document.getElementById('language').value;
  console.log(lang)
  if (!lang) {
    alert('Please select a language to start.');
    return;
  }
  // Redirect with language in query string
  window.location.href = `dashboard.html?lang=${lang}`;
});
