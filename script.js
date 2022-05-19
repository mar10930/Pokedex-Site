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

function getNames()
{
    let pokeList = document.getElementById("pokeList");
    var buttons = "";
    var pokemonNum = 1;

    for(var i = 0; i < pokemonCall.length;i++)
    {
        if(pokemonNum >= 1 && pokemonNum < 10)
        {
            let li = document.createElement("li");
            li.innerText = "#00" + pokemonNum + " " + pokemonCall[i].name;
            console.log(pokemonCall[10].name);
            pokeList.appendChild(li);
        }

        else if(pokemonNum >= 10 && pokemonNum < 100)
        {
            let li = document.createElement("li");
            li.innerText = "#0" + pokemonNum + " " + pokemonCall[i].name;
            pokeList.appendChild(li);
        }

        else if(pokemonNum >= 100)
        {
            let li = document.createElement("li");
            li.innerText = "#" + pokemonNum + " " + pokemonCall[i].name;
            pokeList.appendChild(li);
        }

        pokemonNum++;
        
    }

    pokeList.innerHTML = buttons;
} 

