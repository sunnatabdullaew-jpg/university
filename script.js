// script.js

const searchBtn = document.getElementById("searchBtn");
const countryInput = document.getElementById("countryInput");
const universitiesContainer = document.getElementById("universities");
const status = document.getElementById("status");

// Default country
const defaultCountry = "Uzbekistan";

// Function to fetch universities from API
async function fetchUniversities(country = defaultCountry) {
  const query = country.trim();

  if (!query) {
    status.textContent = "Please enter a country name!";
    universitiesContainer.innerHTML = "";
    return;
  }

  // Show loading message
  status.textContent = "Loading...";
  universitiesContainer.innerHTML = "";

  try {
    // API request
    const response = await fetch(
      `http://universities.hipolabs.com/search?country=${query}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (data.length === 0) {
      status.textContent = `University not found for "${query}"`;
      return;
    }

    universitiesContainer.innerHTML = data.map((univ) => {
        return `
          <div class="card">
            <h3>${univ.name}</h3>
            <p><strong>Country:</strong> ${univ.country}</p>
            <p><strong>Website:</strong> 
              <a href="${univ.web_pages[0]}" target="_blank">${univ.web_pages[0]}</a>
            </p>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    status.textContent = "Error fetching universities. Please try again later.";
    console.error("Fetch error:", error);
  }
}

// Event listeners
searchBtn.addEventListener("click", () =>
  fetchUniversities(countryInput.value)
);
countryInput.addEventListener("keypress", (event) => {
  if (event.key === "Enter") fetchUniversities(countryInput.value);
});

// Load default country on page load
window.addEventListener("DOMContentLoaded", () => {
  countryInput.value = defaultCountry;
  fetchUniversities(defaultCountry);
});
