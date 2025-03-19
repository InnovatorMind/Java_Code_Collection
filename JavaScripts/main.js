document.getElementById('mobile-menu').addEventListener('click', function() {
  var sidebar = document.getElementById('sidebar');
  sidebar.classList.toggle('show');
});


// Automatically load "basic-java" when the page loads
window.addEventListener("DOMContentLoaded", () => {
  // loadSideBar()
  loadPage("basic-java"); // Default topic
});


function loadPage(topic) {
  if (!topic) {
    console.error("No topic provided for loadPage.");
    return; // Exit the function
  }

  // side bar
  const sideBar = document.getElementById('sidebar');
  sideBar.innerText = "";

  fetch(`data/${topic}.json`)
  .then((response) => response.json())
  .then((data) =>  {
    data.forEach((item) => {
      const link = document.createElement("a");
        link.href = item.id ? `#${item.id}` : "#"; // Set href dynamically
        link.textContent = item.title; // Set text content
        sideBar.appendChild(link);
    });
  });

  fetch(`data/${topic}.json`)
    .then((response) => response.json())
    .then((data) => {
      
      const contentContainer = document.querySelector("#content");
      contentContainer.innerHTML = "";

      data.forEach((item) => {
        const section = document.createElement("section");
        section.classList.add("sidebar-link");
        section.id = item.id; // Set the section's ID from JSON data

        section.innerHTML = `
          <h2>${item.title}</h2>
          <p>${item.description}</p>
          <div class="code-container">
            <button class="copy-btn">Copy</button>
            <pre><code class="language-java"></code></pre>
          </div>
        `;

        // Append section before setting code text
        contentContainer.appendChild(section);

        // Select the code element and set text properly
        const codeElement = section.querySelector("pre code");
        codeElement.textContent = item.code; // Properly formats code with line breaks

        // Apply syntax highlighting after content is added
        Prism.highlightElement(codeElement);

        // Add copy functionality
        section
          .querySelector(".copy-btn")
          .addEventListener("click", function () {
            copyCode(item.code, this);
          });
      });
    })
    .catch((error) => console.error("Error loading tutorial data:", error));

    Prism.highlightAll();
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
