const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


  // X get all the trainers and associated pokemon from the backend + render them
  // X Add a new pokemon to a particular trainer
  // release a pokemon 




function getTrainers(){
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => renderTrainers(data))
}

function handleAddPokemon(e){
  const reqObj = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify({foo: e.target.dataset.id}),
  }
  fetch(POKEMONS_URL, reqObj)
    .then(resp => resp.json())
    .then(data => createNewPokemon(data, e))
}

function handleReleasePokemon(e){
  fetch(`${POKEMONS_URL}/${e.target.dataset.id}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(data => deletePokemon(e))
}

function addClickListener(){
  const mainElement = document.querySelector('main')
  mainElement.addEventListener('click', (e) => {
    if (e.target.className === 'add') {
      handleAddPokemon(e)
    } else if (e.target.className === 'release'){
      handleReleasePokemon(e)
    }
  })
}


function main(){
  document.addEventListener('DOMContentLoaded', () => {
    getTrainers();
    addClickListener()
  })
}

main()
