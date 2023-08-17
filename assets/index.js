let ul = document.querySelectorAll(".card-list")[0]

function pokemonCard({name, img, types, id}){
    return `
        <li class="card ${types[0]}">
        <div>
            <span class="pokemonId">#${id}</span>
            <h1 class="card__title">${name}</h1>
        </div>
        <div>
            <img src="${img}"/>
                <ul class="type-list">
                    ${types.map(type=>`
                    <li class="${type}">${type}</li>
                    `).join(" ")}
                </ul>
            </div>

        </li>
    `
}
function getPokemonDetailNewFormat(poke){
    const pokemon = new Pokemon();
    pokemon.name = poke.name,
    pokemon.img = poke.sprites.other.dream_world.front_default,
    pokemon.types = poke.types.map(type=>type.type.name)
    pokemon.id = poke.id
    return pokemon
}
let offset = 0
let limit = 5
function getAndPrintPokemon(offset, limit){

    pokeApi.getPokemons(offset, limit)
        .then(allPokemon=>{
            let list = allPokemon.map(pokemonCard)
            ul.innerHTML += list.join("")
        })
        .catch(error=>{
            ul.innerHTML = `<li>Error ao carregar...</li>`
        })
}
getAndPrintPokemon(offset, limit)

let button = document.querySelectorAll(".loadMore")[0]
const maxQuantity = 151

button.onclick = e => {
    if(limit === 1)return

    offset += limit
    
    if(offset + limit > maxQuantity){
        limit = 1
        e.target.style.display = "none"   
    }
    getAndPrintPokemon(offset, limit)
}
