  const fetchData = async searchTerm => {
    const response = await axios.get('https://rawg-video-games-database.p.rapidapi.com/games',
    {
      headers: {
        'X-RapidAPI-Key': '7813177d35mshc85ddf61935f917p12ead0jsn0e2bfb81f08e',
        'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
      },
      params: {
        key: 'bb7842b2785541ce8a8dd7522bac4816',
        search: searchTerm
      }  
    });

    return response.data.results;   
  };

    
    const input = document.querySelector('input');
    
    
    const onInput = async event => {
      const games = await fetchData(event.target.value);
      
      for (let game of games) {
        const div = document.createElement('div');

        div.innerHTML = `
        <img src="${game.background_image}" />
        <h1>${game.name}</h1>
        `;

        document.querySelector('#target').appendChild(div);
      }
    };
    
    input.addEventListener('input', debounce(onInput, 450));
  
  
  