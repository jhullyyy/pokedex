const exibir20Div = document.querySelector(".exibir-20"); //div que vai exibir os 20 primeiros pokemons
const button20 = document.querySelector(".btn-20");

button20.addEventListener("click", async () => {
	exibir20Div.innerHTML = "";
	const pokemons = await fetchVintePokemon();

	for (const pokemon of pokemons) {
		const details = await fetchPokemon(pokemon.name); // busca detalhes, incluindo imagem
		const card = document.createElement("div");
		card.className = "pokemon-card";

		const img = document.createElement("img");
		img.src = details.sprites.front_default;
		img.alt = details.name;

		const name = document.createElement("p");
		name.textContent = details.name;

		card.appendChild(img);
		card.appendChild(name);
		exibir20Div.appendChild(card);
	}
});

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
