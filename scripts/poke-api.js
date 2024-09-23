/*    Script Api Pokemon   Autor : Victor Koga    */

const pokeApi = {}

// Função de conversão para lista de pokemon padrão
function convertPokeApiDetailToPokemon (pokeDetail){
    const pokemon = new Pokemon()
        pokemon.name = pokeDetail.name
        pokemon.number = pokeDetail.id
    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types
        pokemon.types = types
        pokemon.type = type
        pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
        pokemon.statusName = pokeDetail.stats.map((statName) => statName.stat.name)
        pokemon.statusNum = pokeDetail.stats.map((statNum) => statNum.base_stat)
    return pokemon
}    
// carrega a lista de pokemons
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
       .then((response) => response.json())
       .then((convertPokeApiDetailToPokemon))
}        
//efetua busca na PokeApi e retorna uma requisição
pokeApi.getPokemons = (offset = 0,limit = 10 ) => {
   const url=`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
        return fetch (url)
          .then((response) => response.json())
          .then((jsonBody) => jsonBody.results)
          .then((pokemonsurl) => pokemonsurl.map(pokeApi.getPokemonDetail)) 
          .then((detailsRequests) => Promise.all(detailsRequests))
          .catch((error) => console.error(error))
          .finally(function(){console.log("Requisição Concluida!")})
}