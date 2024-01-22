document.addEventListener('DOMContentLoaded', function() {
  const fetchDataBtn = document.getElementById('fetch-data-btn');
  const countryInput = document.getElementById('country-input');
  const dataContainer = document.getElementById('data-container');

  fetchDataBtn.addEventListener('click', fetchData);

  function fetchData() {
    const countryName = countryInput.value.toLowerCase();
    const apiUrl = `https://restcountries.com/v3/name/${countryName}`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        dataContainer.innerHTML = '';

        const countryInfo = document.createElement('div');
        countryInfo.innerHTML = `<strong>Country:</strong> ${data[0].name.common}<br>
                                <strong>Capital:</strong> ${data[0].capital[0]}<br>
                                <strong>Population:</strong> ${data[0].population}<br>
                                <strong>Country Code:</strong> ${data[0].cca2}<br>
                                <strong>Flag:</strong> <img src="${data[0].flags[0]}" alt="Flag of ${data[0].name.common}">`;

        dataContainer.appendChild(countryInfo);
      })
      .catch(error => {
        console.error('Fetch Error:', error);
        dataContainer.innerHTML = 'Error fetching data or country not found.';
      });
  }
});

