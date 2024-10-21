// Select the input and output elements
const countryInput = document.getElementById('countryInput');
const countryDataDiv = document.getElementById('countryData');

// Function to fetch country data from the API
async function fetchCountry(countryName) {
  try {
    const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
    
    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Country not found');
    }

    // Parse the JSON data
    const countries = await response.json();

    // Clear previous data
    countryDataDiv.innerHTML = '';

    // Get the first country
    const country = countries[0];

    // Create a new div for the country
    const countryDiv = document.createElement('div');
    countryDiv.classList.add('country');

    // Create div for country details (flag and name)
    const countryDetailsDiv = document.createElement('div');
    countryDetailsDiv.classList.add('country-details');
    countryDetailsDiv.innerHTML = `
      <h2>${country.name.common}</h2>
      <img src="${country.flags.png}" alt="Flag of ${country.name.common}">
    `;

    // Create div for additional country info (capital, population, etc.)
    const countryInfoDiv = document.createElement('div');
    countryInfoDiv.classList.add('country-info');
    countryInfoDiv.innerHTML = `
      <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
      <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
      <p><strong>Region:</strong> ${country.region}</p>
      <p><strong>Languages:</strong> ${Object.values(country.languages || {}).join(', ')}</p>
    `;

    // Append the two divs to the main country div
    countryDiv.appendChild(countryDetailsDiv);
    countryDiv.appendChild(countryInfoDiv);

    // Append the country div to the countryDataDiv
    countryDataDiv.appendChild(countryDiv);

  } catch (error) {
    countryDataDiv.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}

// Function triggered by the button click
function search() {
  const countryName = countryInput.value.trim();
  if (countryName) {
    fetchCountry(countryName);
  } else {
    countryDataDiv.innerHTML = '';  // Clear if input is empty
  }
}
