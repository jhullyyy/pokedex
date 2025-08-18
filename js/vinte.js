const exibir20Div = document.querySelector(".exibir-20");
const button20 = document.querySelector(".btn-estilo.btn-20");
const buttonCarregarMais = document.querySelector(".btn-estilo.carregar_mais");
// Altere o valor inicial de offset para 0
let offset = 20;
const limit = 20;
const maxPokemon = 650;

// Reutiliza a função de criar card para todos os botões
const createPokemonCard = async (pokemon) => {
    // A função já recebe o objeto 'pokemon' com os detalhes
    const cardLink = document.createElement("a");
    cardLink.className = "pokemon-card";
    cardLink.href = `habilidades.html?pokemon=${pokemon.name}`;
    cardLink.setAttribute("data-id", pokemon.id);

    const img = document.createElement("img");
    img.src = pokemon.sprites.front_default;
    img.alt = pokemon.name;

    const name = document.createElement("p");
    name.textContent = pokemon.name;

    cardLink.appendChild(img);
    cardLink.appendChild(name);
    
    return cardLink;
};

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    return null;
};

const fetchAllPokemons = async (currentOffset) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${currentOffset}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data.results;
    }
    return [];
};

// Carrega os 20 primeiros e limpa a tela
button20.addEventListener("click", async () => {
    exibir20Div.innerHTML = "";
    offset = 0; // Reseta o offset
    const pokemons = await fetchAllPokemons(offset);

    for (const pokemon of pokemons) {
        const details = await fetchPokemon(pokemon.name);
        const cardLink = await createPokemonCard(details);
        exibir20Div.appendChild(cardLink);
    }
    offset += limit; // Atualiza o offset para a próxima leva
    buttonCarregarMais.style.display = "block";
});

// Carrega mais 20 Pokemons (a partir do último offset)
buttonCarregarMais.addEventListener("click", async () => {
    if (offset >= maxPokemon) return;
    const pokemons = await fetchAllPokemons(offset);

    for (const pokemon of pokemons) {
        const details = await fetchPokemon(pokemon.name);
        const cardLink = await createPokemonCard(details);
        exibir20Div.appendChild(cardLink);
    }
    offset += limit;
});

// Lógica de pesquisa - no final do arquivo
const searchInput = document.querySelector(".pesquisa-pokemon");

searchInput.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const pokemonName = searchInput.value.toLowerCase();
        exibir20Div.innerHTML = "";

        const pokemonData = await fetchPokemon(pokemonName);

        if (pokemonData) {
            const cardLink = await createPokemonCard(pokemonData);
            exibir20Div.appendChild(cardLink);
        } else {
            exibir20Div.innerHTML = `<p>Pokémon "${pokemonName}" não encontrado!</p>`;
        }
    }
});