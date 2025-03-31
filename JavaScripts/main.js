document.querySelector(".menu-toggle").addEventListener("click", function () {
  const sidebar = document.getElementById("sidebar");
  sidebar.classList.toggle("show");
});

// Automatically load "basic-java" when the page loads
window.addEventListener("DOMContentLoaded", () => {
  loadPage("basic-java"); // Default topic
});

function showData(data) {
  const container = document.getElementById("content");
  container.innerHTML = "";

  data.forEach((item, index) => {
    const section = document.createElement("div");
    section.id = item.id; // Set the section's ID from JSON data
    section.classList.add("code-block");

    // Create elements
    const title = document.createElement("h2");
    title.textContent = item.title;

    const description = document.createElement("p");
    description.textContent = item.description;

    const codeWrapper = document.createElement("div");
    codeWrapper.classList.add("code-wrapper");

    const code = document.createElement("pre");
    const codeContent = document.createElement("code");
    codeContent.classList.add("language-javascript"); // Adjust based on the language
    codeContent.textContent = item.code;
    code.appendChild(codeContent);

    const copyButton = document.createElement("button");
    copyButton.textContent = "Copy";
    copyButton.classList.add("copy-button");
    copyButton.setAttribute("data-index", index);
    copyButton.addEventListener("click", () => copyCode(item.code, copyButton));

    codeWrapper.appendChild(copyButton);
    section.appendChild(title);
    section.appendChild(description);
    section.appendChild(codeWrapper);
    section.appendChild(code);
    container.appendChild(section);
  });

  Prism.highlightAll(); // Apply syntax highlighting
}

const sideBar = document.getElementById("sidebar");
function loadPage(topic) {
  if (!topic) {
    console.error("No topic provided for loadPage.");
    return;
  }

  fetch(`data/${topic}.json`)
    .then((response) => response.json())
    .then((data) => {
      //   // Clear sidebar
      sideBar.innerText = "";

      data.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.id ? `#${item.id}` : "#"; // Set href dynamically
        link.textContent = item.title; // Set text content
        sideBar.appendChild(link);
      });

      showData(data);
      something();
    });
}

// Copy function
function copyCode(code, button) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      button.textContent = "Copied!";
      setTimeout(() => (button.textContent = "Copy"), 1500);
    })
    .catch((err) => console.error("Failed to copy:", err));
}



function something(){
  const sections = document.querySelectorAll(".code-block");
  console.log("Sections:", sections);
  
  const sidebarLinks = document.querySelectorAll("#sidebar a");
  console.log("Sidebar Links:", sidebarLinks);
  
  if (sections.length === 0 || sidebarLinks.length === 0) {
    console.error("Sections or sidebar links not found. Check your HTML structure.");
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          sidebarLinks.forEach((link) => link.classList.remove("active"));

          const activeLink = document.querySelector(`#sidebar a[href="#${entry.target.id}"]`);
          if (activeLink) {
            activeLink.classList.add("active");
          } else {
            console.warn(`No sidebar link found for #${entry.target.id}`);
          }
        }
      });
    },
    { threshold: 0.6 }
  );

  sections.forEach((section) => observer.observe(section));
};

