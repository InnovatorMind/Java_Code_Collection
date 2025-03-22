document.getElementById('mobile-menu').addEventListener('click', function() {
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');
});

// Automatically load "basic-java" when the page loads
window.addEventListener("DOMContentLoaded", () => {
  loadPage("basic-java"); // Default topic
});

function loadPage(topic) {
  if (!topic) {
    console.error("No topic provided for loadPage.");
    return; // Exit the function
  }

  // Clear sidebar
  const sideBar = document.getElementById('sidebar');
  sideBar.innerText = "";

  // Load sidebar items
  fetch(`data/${topic}.json`)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((item) => {
        const link = document.createElement("a");
        link.href = item.id ? `#${item.id}` : "#"; // Set href dynamically
        link.textContent = item.title; // Set text content
        sideBar.appendChild(link);
      });
    });

  // Load content
  fetch(`data/${topic}.json`)
    .then((response) => response.json())
    .then((data) => {
      
      const contentContainer = document.querySelector("#content");
      contentContainer.innerHTML = "";

      data.forEach((item) => {
        const section = document.createElement("section");
        section.classList.add("sidebar-link");
        section.id = item.id; // Set the section's ID from JSON data

        // Create elements
        const title = document.createElement("h2");
        title.textContent = item.title;
        
        const description = document.createElement("p");
        description.textContent = item.description;
        
        const codeContainer = document.createElement("div");
        codeContainer.className = "code-container";
        
        const pre = document.createElement("pre");
        const codeElement = document.createElement("code");
        codeElement.className = "language-java";
        codeElement.textContent = item.code;
        
        const copyBtn = document.createElement("button");
        copyBtn.className = "copy-btn";
        copyBtn.textContent = "Copy";
        
        // Append elements in proper order
        pre.appendChild(codeElement);
        codeContainer.appendChild(copyBtn);
        codeContainer.appendChild(pre);
        
        section.appendChild(title);
        section.appendChild(description);
        section.appendChild(codeContainer);
        
        // Append section to the content container
        contentContainer.appendChild(section);

        // Apply syntax highlighting after content is added
        Prism.highlightElement(codeElement);

        // Add copy functionality
        copyBtn.addEventListener("click", function() {
          copyCode(item.code, this);
        });
      });
    })
    .catch((error) => console.error("Error loading tutorial data:", error));
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