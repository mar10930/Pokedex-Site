const url = "https://pokeapi.co/api/v2/"
let pokemonCall = new Array();
let pokeName = "";
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

    document.getElementById("model").style.visibility = "hidden";

   
}

function displayPokemon(btnId)
{
    let num = parseInt(document.getElementById(btnId).getAttribute("data-num"));
    let dispNum = "";
    pokeName = String(pokemonCall[num-1].name);
    let displayName = pokeName.charAt(0).toUpperCase() + pokeName.slice(1);

    //Call the api
    loadData(num,pokeName)

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
    document.getElementById("noPokemon").style.visibility = "hidden";


}

function loadData(num,name)
{
    fetch(url+"pokemon/"+num)
    .then(response =>response.json())
    .then(data=>
    {
        document.getElementById("model").style.visibility = "visible";
        let spritePoke = data.sprites;
        let divModel = document.createElement("div");
        document.getElementById("pokemonImg").src = spritePoke.front_default;
        getData(data,name);

    })
    .catch(error=>{console.log("error could not get sprite",error);});
    


}

function getData(data,name)
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
        abilityStr += ability[0].ability.name
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
    let buttonTxt = "<button type=\"button\"" + " id=\"cry\" " + " onClick=\"playCry()\">"+ 
    "Cry"+"</button>";
    document.getElementById("cryButton").innerHTML = buttonTxt;

    //Retreive the pokemon description
    fetch(url+"pokemon-species/"+name)
    .then(response =>response.json())
    .then(data=>
    {
        let versions = new Array();
        versions = data.flavor_text_entries;
        let description = "";

        //Check for the description in Pokemon Red games
        for(let i = 0; i < versions.length;i++)
        {
            if(versions[i].version.name === "red")
            {
                description = versions[i].flavor_text;
                break;
            }
        }
        document.getElementById("description").innerHTML = description;

    })
    .catch(error=>{console.log("error could not get description",error);});


    
}

function playCry()
{
    let name = pokeName;
    if(name == "nidoran-m")
    {
        name = "nidoranm";
    }

    else if(name == "nidoran-f")
    {
        name = "nidoranf";
    }

    else if(name == "mr-mime")
    {
        name = "mrmime";
    }
    let url = new Audio("https://play.pokemonshowdown.com/audio/cries/"+name+".mp3");
    url.volume = .5;
    url.play();

}


