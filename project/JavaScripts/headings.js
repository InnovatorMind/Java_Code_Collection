const urlParams = new URLSearchParams(window.location.search);
const selectedLanguage = urlParams.get("lang"); // "java", "cpp", etc.
// console.log(selectedLanguage)

async function fetchNavData() {
    try {
        // Replace with your actual API endpoint
          const res = await fetch(`https://raw.githubusercontent.com/InnovatorMind/logic-builder-data/refs/heads/main/${selectedLanguage}/heading.json`);
          const data = await res.json();

        // 1. Update the first <li> in the <ul>
        const ul = document.querySelector('#main-nav');
        if (ul && ul.children.length > 0) {
            ul.children[0].innerHTML = `<a href="#">${data.mainNavItem}</a>`;
        }

        // 2. Generate scroll-content HTML exactly like your sample
        const scrollDiv = document.getElementById('scroll-content');
        scrollDiv.innerHTML = ''; // Clear previous

        // Add the arrow link first
        scrollDiv.innerHTML += `<a href="#">-></a>`;

        // Loop over scroll links and add inline onclick attribute
        data.scrollLinks.forEach(item => {
            scrollDiv.innerHTML += `<a href="#" onclick="loadPage('${item.page}')">${item.label}</a>`;
        });

    } catch (error) {
        console.error("Failed to load nav data:", error);
    }
}

window.addEventListener('DOMContentLoaded', fetchNavData);