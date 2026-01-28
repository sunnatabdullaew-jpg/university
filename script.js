  const searchBtn = document.getElementById("searchBtn");
    const countryInput = document.getElementById("countryInput");
    const universitiesContainer = document.getElementById("universities");
    const status = document.getElementById("status");

    const defaultCountry = "Uzbekistan"; 


    async function fetchUniversities(country = defaultCountry) {
      const query = country.trim(); 

      if (!query) { 
        status.textContent = "Please enter a country name!";
        universitiesContainer.innerHTML = "";
        return;
      }

      status.textContent = "Loading...";
      universitiesContainer.innerHTML = "";

      try {
        const response = await fetch(`http://universities.hipolabs.com/search?country=${query}`);
        const data = await response.json();

        if (data.length === 0) {
          status.textContent = `No universities found for "${query}"`;
          return;
        }

        status.textContent = ""; 

        // Universitetlarni chiqarish
        universitiesContainer.innerHTML = data.map(univ => `
          <div class="card">
            <h3>${univ.name}</h3>
            <p><strong>Country:</strong> ${univ.country}</p>
            <p><strong>Website:</strong> <a href="${univ.web_pages[0]}" target="_blank">${univ.web_pages[0]}</a></p>
          </div>
        `).join("");

      } catch (error) {
        status.textContent = "Error fetching universities. Please try again later.";
        console.error(error);
      }
    }

    searchBtn.addEventListener("click", () => {
      fetchUniversities(countryInput.value);
    });

    countryInput.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        fetchUniversities(countryInput.value);
      }
    });

    window.addEventListener("DOMContentLoaded", () => {
      countryInput.value = defaultCountry;
      fetchUniversities(defaultCountry);
    });