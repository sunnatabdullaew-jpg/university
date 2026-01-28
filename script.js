const universitiesContainer = document.getElementById("universities");
const searchBtn = document.getElementById("searchBtn");
const countryInput = document.getElementById("countryInput");
const statusText = document.getElementById("status");

const API_URL = "http://universities.hipolabs.com/search";

document.addEventListener("DOMContentLoaded", () => {
  fetchUniversities("Uzbekistan");
});

async function fetchUniversities(country) {
  universitiesContainer.innerHTML = "";
  statusText.textContent = "Loading...";

  try {
    const response = await fetch(`${API_URL}?country=${country}`);
    const data = await response.json();

    if (data.length === 0) {
      statusText.textContent = "University not found";
      return;
    }

    statusText.textContent = "";
    renderUniversities(data);

  } catch (error) {
    statusText.textContent = "Error loading data";
    console.error(error);
  }
}

function renderUniversities(universities) {
  universitiesContainer.innerHTML = "";

  universities.forEach(university => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${university.name}</h3>
      <p><strong>Country:</strong> ${university.country}</p>
      <p>
        <a href="${university.web_pages[0]}" target="_blank">
          Visit Website
        </a>
      </p>
    `;

    universitiesContainer.appendChild(card);
  });
}

searchBtn.addEventListener("click", () => {
  const country = countryInput.value.trim();

  if (country === "") {
    alert("Please enter a country name");
    return;
  }

  fetchUniversities(country);
});
