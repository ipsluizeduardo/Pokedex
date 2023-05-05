
const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
let search = document.getElementById("search")
const maxRecords = 200;
const limit = 5;
let offset = 0;

function convertPkemonToLi(pokemon) {
    return  `
    <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                
            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}"
                        alt="${pokemon.name}">
                </div>
    </li>`  
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPkemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

function searchPokemons(inName) {
    pokeApi.getNamePokemons(inName).then((pokemon) => {
       const hmtlSearch = `

       <li class="pokemon ${pokemon.types}">
                <span class="number">#${pokemon.order}</span>
                <span class="name">${pokemon.name}</span>
                    
                <div id="detail">
                    <img src="${pokemon.sprites.other.home.front_default}"
                        alt="${pokemon.name}">
                </div>
       </li>`
        pokemonList.innerHTML = hmtlSearch
    })}

search.addEventListener("click", (e) => {
let inName = document.getElementById("inName").value
    e.preventDefault()
    searchPokemons(inName)
})

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener("click", () => {
        offset += limit

        const qtRecordNexpage = offset + limit

        if (qtRecordNexpage >= maxRecords) {
            const newLimit = maxRecords - offset

            loadPokemonItens(offset, newLimit)

            loadMoreButton.parentElement.removeChild(loadMoreButton)
        }else {
            loadPokemonItens(offset, limit)
        }
})



