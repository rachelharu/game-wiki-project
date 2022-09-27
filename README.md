# game lookup

### a game wiki that uses html, css, javascript, bulma, and rawg api to deliver details about your favorite games right at your fingertips.


## HOW IT WORKS

search for your favorite game in the input bar, once you've clicked details will be shown about the game you've chosen.

## WHAT I LEARNED

how to display a single value for an object in an array 

` game.esrb_rating === null ? "N/A" : game.esrb_rating.name `

also how to access a value in an object thats in an array instead of the entire object 
such as here: 

genres.map((o) => o.name).join(", ")

which creates a new array with the desired values 

example

` let genres = 
[
   {
      "id":4,
      "name":"Action",
      "slug":"action"
   },
   {
      "id":11,
      "name":"Arcade",
      "slug":"arcade"
   },
   {
      "id":14,
      "name":"Simulation",
      "slug":"simulation"
   },
   {
      "id":51,
      "name":"Indie",
      "slug":"indie"
   },
   {
      "id":59,
      "name":"Massively Multiplayer",
      "slug":"massively-multiplayer"
   }
] `


example of results 

Action, Arcade, Simulation, Indie, Massively Multiplayer


## THINGS TO DO

-improve dropdown box styling 
-possibly make results styling look prettier.