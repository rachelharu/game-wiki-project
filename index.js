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
    console.log(response.data.results);
  };

    
    const input = document.querySelector('input');
    
    
    const onInput = event => {
      fetchData(event.target.value);
    };
    
    input.addEventListener('input', debounce(onInput, 450));
  
  
  