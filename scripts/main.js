/* Script Global    Autor : Victor Koga */
const pokemonList = document.getElementById("pokemonList")
const pokemonListDetail = document.getElementById("pokemonListDetail")
const loadMoreButton = document.getElementById("loadMoreButton")
const limit = 5
let offset = 0
const maxRecords = 1000
let detailFuncao = 0

//Função para listagem de pokemons
function convertPokemonToLi(pokemon) {
  return `<li class="pokemon ${pokemon.type}" onClick=detailPokemon(#${pokemon.number})>
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                  ${pokemon.types.map((type) =>`<li class="type ${type}">${type}</li>`).join(" ")}
                </ol>
                  <img src="${pokemon.photo}" alt="imagem pokemom ${pokemon.name}">
            </div>
          </li>`
}
//Função para mostar pokemon em destaque
function convertPokemonToDetail(pokemon){
  return  `<form class="pokemonDetailForm">
              <div class="pokemonDetail ${pokemon.type}" >
                  <span class="name">${pokemon.name}</span>
                  <div class="detail">
                      <div class="numberDiv">
                           <span class="number">Pokemon numero # ${pokemon.number}</span>
                      </div>       
                      <ol class="types">
                          ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join(' ')}
                      </ol>
                      <img src="${pokemon.photo}" alt="imagem pokemom ${pokemon.name}">
                  </div>    
                      
                      <div class="status">
                              <h3 class="statusH3"> Base Status </h3>
                              <ol class="statusOl">
                                  <div class="statusOlDiv1">
                                      ${pokemon.statusName.map((statName) => `<li class="statusLi1">${statName} - </li>`).join(' ' , '-')}
                                  </div> 
                                  <div class="statusOlDiv2">
                                      ${pokemon.statusNum.map((statNum) => `<li class="statusLi2">${statNum}</li>`).join(' ')}
                                  </div> 
                              </ol>
                      </div>
              </div>
          </form>`
}

// Função de chamada da listagem de Pokemons
function loadPokemonsItens(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons) => {
    pokemonList.innerHTML += newList = pokemons.map(convertPokemonToLi).join(" ")
  })
}
// carrega primeira lista de pokemons
loadPokemonsItens(offset, limit)

// Evento de clique para carregar mais pokemons na tela
loadMoreButton.addEventListener("click", () => {
  if (detailFuncao == 1) {
    pokemonListDetail.innerHTML = ""
    detailFuncao = 0
    loadPokemonsItens(0, offset)
  }
  offset += limit
  if (offset < maxRecords) {loadPokemonsItens(offset, limit);
  } else {
    loadMoreButton.parentElement.removeChild(loadMoreButton);
  }
})
// Função que é chamada para dar destaque ao pokemon na tela
function detailPokemon(number) {
  detailFuncao = 1
  unico = '#' + number - 1
  pokemonList.innerHTML = ""
  pokeApi.getPokemons(unico, 1).then((pokemons) => {
    pokemonListDetail.innerHTML += newList = pokemons.map(convertPokemonToDetail).join(" ")
  })
}
