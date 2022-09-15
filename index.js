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

  console.log(response.data.results.sort(sortBy("rating", true, parseInt)));
  return response.data.results;
};

const root = document.querySelector(".autocomplete");
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

  if (!event.target.value.length) {
    dropdown.classList.remove("is-active");
    return; 
  }

  resultsWrapper.innerHTML = "";
  dropdown.classList.add("is-active");
  for (let game of games) {
    const option = document.createElement("a");

    option.classList.add("dropdown-item");
    option.innerHTML = `
        <img src="${game.background_image}" />
        <h1>${game.name}</h1>
        `;
    option.addEventListener("click", () => {
      dropdown.classList.remove("is-active");
      input.value = game.name;
      onGameSelect(game);
    });

    resultsWrapper.appendChild(option);
  }
};

input.addEventListener("input", debounce(onInput, 450));

//function to close dropdown menu if user clicks outside root"
document.addEventListener("click", (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove("is-active");
  }
});

//reusable function to sort results by rating
const sortBy = (field, reverse, primer) => {
  const key = primer
    ? function (x) {
        return primer(x[field]);
      }
    : function (x) {
        return x[field];
      };

  reverse = !reverse ? 1 : -1;

  return function (a, b) {
    return (a = key(a)), (b = key(b)), reverse * ((a > b) - (b > a));
  };
};

const onGameSelect = (game) => {
  console.log(game);

  document.querySelector("#summary").innerHTML = `
   <article class="media">
     <figure class="media-left">
      <p class="image">
       <img id="art" src="${game.background_image}" />
       </p>
       </figure>
        <div class="media-content">
          <div class="content">
            <h1>${game.name}</h1>
            <h5>Genres: </h5>
            <h4>${game.genres.map((o) => o.name).join(", ")}</h4>
            <h5>ESRB: </h5>
            <h4>${
              game.esrb_rating === null ? "N/A" : game.esrb_rating.name
            }</h4>
          </div>
        </div>
    </article>
      <article class="notification is-danger"> 
            <h5>Metacritic Score: </h5>
            <h4>${game.metacritic === null ? "N/A" : game.metacritic}</h4>
      </article>
      <article class="notification is-danger"> 
            <h5>Released: </h5>
            <h4>${game.released}</h4>
      </article>
      <article class="notification is-danger"> 
            <h5>Platforms: </h5>
            <h4>${game.platforms.map((o) => o.platform.name).join(", ")}</h4>
      </article>     
       `;
};
