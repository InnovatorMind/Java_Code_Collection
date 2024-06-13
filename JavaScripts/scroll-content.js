
document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('section');

  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              entry.target.classList.remove('hidden');
          } else {
              entry.target.classList.add('hidden');
              entry.target.classList.remove('visible');
          }
      });
  }, {
      threshold: 0.1
  });

  sections.forEach(section => {
      section.classList.add('hidden');
      observer.observe(section);
  });
});



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



