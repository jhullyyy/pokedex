const pokemonName = document.querySelector(".pokemon_name"); //variaveis globais
const pokemonNumber = document.querySelector(".pokemon_number");
const pokemonImage = document.querySelector(".pokemon_image");

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");
const buttonPrev = document.querySelector(".btn-prev");
const buttonNext = document.querySelector(".btn-next");
const exibir20Div = document.querySelector(".exibir-20"); //div que vai exibir os 20 primeiros pokemons
const button20 = document.querySelector(".btn-20");

button20.addEventListener("click", async () => {
	exibir20Div.innerHTML = "";
	const pokemons = await fetchVintePokemon();
	pokemons.forEach((pokemon) => {
		const pokemonItem = document.createElement("div");
		pokemonItem.textContent = pokemon.name;
		exibir20Div.appendChild(pokemonItem);
	});
});

let searchPokemon = 1; //site abre no primeiro pokemon

const fetchPokemon = async (pokemon) => {
	//função que mostra os pokemons
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
	if (APIResponse.status === 200) {
		const data = await APIResponse.json();
		return data;
	} else {
		return null;
	}
};

const fetchVintePokemon = async () => {
	//função que mostra os vinte primeiros pokemons
	const APIResponse = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20&offset=0");
	if (APIResponse.status === 200) {
		const data = await APIResponse.json();
		return data.results;
	} else {
		return [];
	}
};

const renderPokemon = async (pokemon) => {
	//função que renderiza os pokemons
	pokemonName.innerHTML = "Loading...";
	pokemonNumber.innerHTML = "";

	const data = await fetchPokemon(pokemon);
	console.log(data);
	if (data) {
		//se o pokemon existir
		pokemonImage.style.display = "block";
		pokemonName.innerHTML = data.name;
		pokemonNumber.innerHTML = data.id;
		pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
		input.value = "";
		searchPokemon = data.id;
	} else {
		//se não existir
		pokemonImage.style.display = "none";
		pokemonName.innerHTML = "Not Found :(";
		pokemonNumber.innerHTML = "";
	}
};

form.addEventListener("submit", (event) => {
	event.preventDefault();
	renderPokemon(input.value.toLowerCase()); //valor do input emminusculo
});

buttonPrev.addEventListener("click", () => {
	//button volta
	if (searchPokemon > 1) {
		searchPokemon -= 1;
		renderPokemon(searchPokemon);
	}
});

buttonNext.addEventListener("click", () => {
	//button seguir
	searchPokemon += 1;
	renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
