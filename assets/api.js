const pokeApi = {}

pokeApi.getPokemonDetail = async(pokemon) => {

    return fetch(pokemon.url)
    .then(res=>res.json())
    .then(getPokemonDetailNewFormat)

}

pokeApi.getPokemons = async(offset = 0, limit = 5) => {
    try{
        let res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
        let json = await res.json()
        let namesList = await json.results.map(pokeApi.getPokemonDetail)
        let all = await Promise.all(namesList)
        return all
        
    }
    catch(error){
        console.log(error)
    }
}