const url = "https://pokeapi.co/api/v2/pokemon?limit=151"
let pokemonCall = new Array();
//Fetch the api call

fetch(url)
    //If the promise is fulfilled we get the json response
    .then(response => response.json())
    .then(data =>
    {
        //Go to next list of pokemon here
        pokemonCall = data.results;
        console.log(pokemonCall[120]);
    })
    //If the call was not successful display error
    .catch(error => {console.log("Error couldn't retreive pokemon!!!",error);});



