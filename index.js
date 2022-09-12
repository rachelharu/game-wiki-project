const fetchData = async (searchTerm) => {
  const response = await axios.get(
    "https://rawg-video-games-database.p.rapidapi.com/games",
    {
      headers: {
        "X-RapidAPI-Key": "7813177d35mshc85ddf61935f917p12ead0jsn0e2bfb81f08e",
        "X-RapidAPI-Host": "rawg-video-games-database.p.rapidapi.com",
      },
      params: {
        key: "bb7842b2785541ce8a8dd7522bac4816",
        search: searchTerm,
      },
    }
  );
 
  
  console.log(response.data.results.sort(sortBy('rating', true, parseInt)));
  return response.data.results;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b>Search</b></label>
  <input class="input" />
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const resultsWrapper = document.querySelector(".results");


const onInput = async (event) => {
  const games = await fetchData(event.target.value);
  
  resultsWrapper.innerHTML = " ";
  dropdown.classList.add("is-active");
  for (let game of games) {
    const option = document.createElement("a");

    option.classList.add('dropdown-item');
    option.innerHTML = `
        <img src="${game.background_image}" />
        <h1>${game.name}</h1>
        
        `;

    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 450));

//event listener to check if a click was done outside of root if yes it close dropdown with "is-active"
document.addEventListener("click", event => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});


//function to sort results by rating
const sortBy = (field, reverse, primer) => {

  const key = primer ?
  function(x) {
    return primer(x[field])
  } :
  function(x) {
    return x[field]
  };

reverse = !reverse ? 1 : -1;

return function(a, b) {
  return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
}
}