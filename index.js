const fetchData = async (searchTerm) => {
  const response = await axios.get(
    'https://rawg-video-games-database.p.rapidapi.com/games',
    {
      headers: {
        'X-RapidAPI-Key': '7813177d35mshc85ddf61935f917p12ead0jsn0e2bfb81f08e',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
      },
      params: {
        key: 'bb7842b2785541ce8a8dd7522bac4816',
        search: searchTerm,
      },
    }
  );

  return response.data.results.sort(sortBy('rating', true, parseInt));
};

//function to fetch even more details about a game using its id
const fetchDetails = async (id) => {
  const response = await axios.get(
    'https://rawg-video-games-database.p.rapidapi.com/games/' + id,
    {
      headers: {
        'X-RapidAPI-Key': '7813177d35mshc85ddf61935f917p12ead0jsn0e2bfb81f08e',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com',
      },
      params: {
        key: 'bb7842b2785541ce8a8dd7522bac4816',
      },
    }
  );

  details(response.data);
  console.log(response.data);
  return response.data.description_raw;
};

const root = document.querySelector('.autocomplete');
root.innerHTML = `
  <label><b class="inputTag">Search</b></label>
  <input class="input" />
  <div class="dropdown">
      <div class="dropdown-menu">
       <div class="dropdown-content results"></div>
      </div>
  </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');
const title = document.querySelector('.title');
const subtitle = document.querySelector('.subtitle');
const navInput = document.getElementById('nav');
const autoComplete = document.getElementById('autoCom');
const inputTag = document.querySelector('.inputTag');

//creates dropdown menu, when user clicks option onGameSelect will run
const onInput = async (event) => {
  const games = await fetchData(event.target.value);

  //hides dropdown menu when input field blank
  if (!event.target.value.length) {
    dropdown.classList.remove('is-active');
    return;
  }

  resultsWrapper.innerHTML = '';
  dropdown.classList.add('is-active');
  for (let game of games) {
    const option = document.createElement('a');

    option.classList.add('dropdown-item');
    option.innerHTML = `
        <img src="${game.background_image}" />
        <h1>${game.name}</h1>
        `;
    option.addEventListener('click', () => {
      dropdown.classList.remove('is-active');
      input.value = game.name;
      title.classList.add('hide');
      subtitle.classList.add('hide');
      navInput.appendChild(autoComplete);
      inputTag.classList.add('hide');
      input.classList.add('inputMargin');
      onGameSelect(game);
      fetchDetails(game.id);
    });

    resultsWrapper.appendChild(option);
  }
};

//puts a delay on input request to 450ms after typing
input.addEventListener('input', debounce(onInput, 450));

//function to close dropdown menu if user clicks outside root"
document.addEventListener('click', (event) => {
  if (!root.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});

// passes game id to details function to show results
const onGameSelect = async (game) => {
  console.log(game);
  details(id);
};


const details = async (id) => {
  const description = id.description_raw;
  const metaUrl = id.metacritic_url;
  document.querySelector('#summary').innerHTML = `
   <article class="media">
     <figure class="media-left">
      <p class="image">
       <img id="art" src="${id.background_image}" />
       </p>
       </figure>
        <div class="media-content">
          <div class="content">
            <h1>${id.name}</h1>
            <h5>Genres: </h5>
            <h4>${id.genres.map((o) => o.name).join(', ')}</h4>
            <h5>ESRB: </h5>
            <h4>${id.esrb_rating === null ? 'N/A' : id.esrb_rating.name}</h4>
          </div>
        </div>
    </article>
            <h3 id="description">${description.split('.', 2).join('.')}</h3>
      <article class="notification is-danger"> 
            <h5><a href=${metaUrl}>Metacritic Score:</a></h5>
            <h4>${id.metacritic === null ? 'N/A' : id.metacritic}</h4>
      </article>
      <article class="notification is-danger"> 
            <h5>Released: </h5>
            <h4>${id.released}</h4>
      </article>
      <article class="notification is-danger"> 
            <h5>Platforms: </h5>
            <h4>${id.platforms.map((o) => o.platform.name).join(', ')}</h4>
      </article>     
       `;
};

//reusable function to sort results by rating from highest to lowest
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

//code for title animations
let spanText = function spanText(text) {
  let string = text.innerText;
  let spaned = '';
  for (let i = 0; i < string.length; i++) {
    if (string.substring(i, i + 1) === ' ')
      spaned += string.substring(i, i + 1);
    else spaned += '<span>' + string.substring(i, i + 1) + '</span>';
  }
  text.innerHTML = spaned;
};

let headline = document.querySelector('.title');
let bottomline = document.querySelector('.subtitle');
spanText(headline);
spanText(bottomline);

let animations = document.querySelectorAll('.animation');

animations.forEach((animation) => {
  let letters = animation.querySelectorAll('span');
  letters.forEach((letter, i) => {
    letter.style.animationDelay = i * 0.1 + 's';
  });
});
