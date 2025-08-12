const pokemonName = document.querySelector(".pokemon_name"); //variavel global
const pokemonNumber = document.querySelector(".pokemon_number"); //variavel global
const pokemonImage = document.querySelector(".pokemon_image"); //variavel global

const form = document.querySelector(".form");
const input = document.querySelector(".input_search");

const fetchPokemon = async (pokemon) => {
	const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.toLowerCase()}`);
	const data = APIResponse.json();
	return data;
};

const renderPokemon = async (pokemon) => {
	const data = await fetchPokemon(pokemon);
	pokemonName.innerHTML = data.name;
	pokemonNumber.innerHTML = data.id;
	pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"];
};

form.addEventListener("submit", (event) => {
	event.preventDefault();
	renderPokemon(input.value);
});
