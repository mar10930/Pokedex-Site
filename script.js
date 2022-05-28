const url = "https://pokeapi.co/api/v2/"
let pokemonCall = new Array();
let  pokemonInfo = new Array();
//Fetch the api call

fetch(url+"pokemon?limit=151")
    //If the promise is fulfilled we get the json response
    .then(response => response.json())
    .then(data =>
    {
        //Go to next list of pokemon here
        pokemonCall = data.results;
        console.log(pokemonCall[120]);
        dispPokemon();
        
    })
    //If the call was not successful display error
    .catch(error => {console.log("Error couldn't retreive pokemon!!!",error);});
   
function dispPokemon()
{
    let ul = document.getElementById("list");
    document.body.appendChild(ul);
    var pokemonNum = 1;

    for(var i = 0; i < pokemonCall.length;i++)
    {
        if(pokemonNum >= 1 && pokemonNum < 10)
        {
            let li = document.createElement("li");
            li.setAttribute("id","name");
            let strEntry = String("#00" + pokemonNum + " " + pokemonCall[i].name);
            let buttonTxt = "<button type=\"button\"" + "id=\"pokemon" +pokemonNum +"\" " 
            + "class=\"pokemon\"" + "onClick=\"displayPokemon(this.id)\"" + "data-num=" +
            "\""+pokemonNum+"\">"+ strEntry+"</button>";
            li.innerHTML = buttonTxt;
            ul.appendChild(li);
        }

        else if(pokemonNum >= 10 && pokemonNum < 100)
        {
            let li = document.createElement("li");
            li.setAttribute("id","name");
            let strEntry = String("#0" + pokemonNum + " " + pokemonCall[i].name);
            let buttonTxt = "<button type=\"button\"" + "id=\"pokemon" +pokemonNum +"\" " 
            + "class=\"pokemon\"" + "onClick=\"displayPokemon(this.id)\"" + "data-num=" +
            "\""+pokemonNum+"\">"+ strEntry+"</button>";
            li.innerHTML = buttonTxt;
            ul.appendChild(li);
        }

        else if(pokemonNum >= 100)
        {
            let li = document.createElement("li");
            li.setAttribute("id","name");
            let strEntry = String("#" + pokemonNum + " " + pokemonCall[i].name);
            let buttonTxt = "<button type=\"button\"" + "id=\"pokemon" +pokemonNum +"\" " 
            + "class=\"pokemon\"" + "onClick=\"displayPokemon(this.id)\"" + "data-num=" +
            "\""+pokemonNum+"\">"+ strEntry+"</button>";
            li.innerHTML = buttonTxt;
            ul.appendChild(li);          
        }
        pokemonNum++;
    }

   
}

function displayPokemon(btnId)
{
    let num = parseInt(document.getElementById(btnId).getAttribute("data-num"));
    let dispNum = "";
    let pokeName = String(pokemonCall[num-1].name);
    let displayName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);

    //Call the api
    loadData(num)

    if(num >=1 && num <= 9)
    {
        dispNum = "#00" + num;
    }

    else if(num >= 10 && num <= 99)
    {
        dispNum = "#0" +num;
    }

    else{
        dispNum = "#" + num;
    }
    document.getElementById("pokeNum").innerHTML = dispNum;
    document.getElementById("pokemonHeader").innerHTML = displayName;
}

function loadData(num)
{
    fetch(url+"pokemon/"+num)
    .then(response =>response.json())
    .then(data=>
    {
        let spritePoke = data.sprites;
        console.log(spritePoke.back_default);
        document.getElementById("pokemonImg").src = spritePoke.front_default;
        getData(data);

    })
    .catch(error=>{console.log("error could not get sprite",error);});    

}

function getData(data)
{
    let types = data.types;
    let ability = data.abilities;
    let abilityStr = "Ability: ";
    let type = "";
    let weight = 0.0;
    let height = 0.0;

    //Format the ability text
    if(ability.length > 1)
    {
        for(let i = 0; i < ability.length;i++)
        {
            if(i == ability.length -1)
            {
                abilityStr += ability[i].ability.name;
            }

            else{
                abilityStr += ability[i].ability.name + ", ";
            }
        }
    }

    else{
        abilityStr += ability[i].ability.name
    }

    //Format the type text
    if(types.length > 1)
    {
        type = "Type: "+ types[0].type.name + "/" +types[1].type.name;
    }
    else{
        type = "Type: " + types[0].type.name;
    }

    //Get the height of the pokemon
    pokemonHeight = data.height;

    //Convert decimeter height to feet
    let feet = parseFloat(pokemonHeight) / 3.048;
    feet = feet.toFixed(1);

    //Convert decigram to lbs
    weight = Math.round((data.weight)/4.53592);

    document.getElementById("type").innerHTML = type;
    document.getElementById("ability").innerHTML = abilityStr;
    document.getElementById("height").innerHTML = "Height: "+feet+" ft";
    document.getElementById("weight").innerHTML = "Weight: " + weight + " lbs";
    
    
}


