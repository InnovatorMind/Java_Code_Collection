document.getElementById('mobile-menu').addEventListener('click', function() {
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');
});


function copyCode(button) {
  const codeBlock = button.nextElementSibling.textContent;
  const tempTextArea = document.createElement('textarea');
  tempTextArea.value = codeBlock;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand('copy');
  document.body.removeChild(tempTextArea);
  button.textContent = 'Copied!';
  setTimeout(() => {
      button.textContent = 'Copy';
  }, 2000);
}
