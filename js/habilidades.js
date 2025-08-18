// A função de busca reutilizada
const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (APIResponse.status === 200) {
        const data = await APIResponse.json();
        return data;
    }
    return null;
};

document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const pokemonName = urlParams.get("pokemon");
    const container = document.getElementById("mostrar_habilidade");

    if (pokemonName) {
        const pokemonData = await fetchPokemon(pokemonName);

        if (pokemonData) {
            // 1. Cria a variável para os stats
            const maxStatValue = 255;
            const statsHTML = pokemonData.stats.map(statInfo => {
                const statName = statInfo.stat.name;
                const baseStat = statInfo.base_stat;
                return `
                    <div class="stat-bar-container">
                        <span class="stat-label">${statName}: ${baseStat}</span>
                        <div class="stat-bar" style="width: ${ (baseStat / maxStatValue) * 100 }%;"></div>
                    </div>
                `;
            }).join('');

            // 2. Monta o HTML do card ampliado
            const cardHTML = `
                <div class="pokemon-card-ampliado">
                    <img id="pokemon-sprite" src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
                    <h2>${pokemonData.name}</h2>
                    <div class="trade-buttons">
                        <button id="btn-normal">Normal</button>
                        <button id="btn-shiny">Shiny</button>
                    </div>
                    <h3>Estatísticas:</h3>
                    <div class="stats-graph">
                        ${statsHTML}
                    </div>
                    <h3>Habilidades:</h3>
                    <ul>
                        ${pokemonData.abilities.map(abilityInfo => `
                            <li>${abilityInfo.ability.name}</li>
                        `).join('')}
                    </ul>
                </div>
            `;
            
            // 3. Insere o HTML na página
            container.innerHTML = cardHTML;

            // 4. Encontra e adiciona os eventos aos botões
            // É essencial que esta parte venha DEPOIS de container.innerHTML = cardHTML;
            const pokemonSprite = document.getElementById("pokemon-sprite");
            const btnNormal = document.getElementById("btn-normal");
            const btnShiny = document.getElementById("btn-shiny");

            if (pokemonSprite && btnNormal && btnShiny) {
                btnNormal.addEventListener("click", () => {
                    pokemonSprite.src = pokemonData.sprites.front_default;
                });

                btnShiny.addEventListener("click", () => {
                    pokemonSprite.src = pokemonData.sprites.front_shiny;
                });
            }

        } else {
            container.innerHTML = "<p>Pokémon não encontrado!</p>";
        }
    } else {
        container.innerHTML = "<p>Nenhum Pokémon especificado.</p>";
    }
});
