
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

function getTrainers(){
  fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(data => renderTrainers(data))
}

function addClickLister(){
  document.addEventListener('click', (e) => {
    if (e.target.className === 'add') {
      handleAdd(e)
    } else if (e.target.className === 'release') {
      handleRemove(e)
    }
  })
}

function handleAdd(e){
  const reqObj = {
    method: 'POST', 
    headers: { 'Content-Type': 'application/json'}, 
    body: JSON.stringify({ trainer_id : e.target.dataset['id']}), 
  }

  fetch(POKEMONS_URL, reqObj)
    .then(resp => resp.json())
    .then(data => {
      const pokemonElement = assemblePokemon(data)
      e.target.nextSibling.append(pokemonElement)
    })
}

function handleRemove(e){
  fetch(`${POKEMONS_URL}/${e.target.dataset['id']}`, {method: 'DELETE'})
    .then(resp => resp.json())
    .then(data => e.target.parentNode.remove())
}

function main(){
  getTrainers()
  addClickLister()
}

main()
























function renderTrainers(trainers){
  trainers.forEach(renderTrainer)
}

function renderTrainer(trainer){
  const mainContainer = document.querySelector('main');
  const pokemonList = assemblePokemonList(trainer.pokemon)

  const trainerDiv = assembleTrainerDiv(trainer, pokemonList)
  mainContainer.append(trainerDiv)
}

function assemblePokemonList(pokemon){
    return pokemon.map((pokemon) => {
    pokemonLi= document.createElement('li')
    removePokemonBtn  = document.createElement('button')
    removePokemonBtn.innerHTML = 'Release Pokemon'
    removePokemonBtn.className = 'release'
    removePokemonBtn.dataset.id = pokemon.id

    pokemonLi.innerHTML = pokemon.species
    pokemonLi.append(removePokemonBtn) 
    return pokemonLi
  })
}

function assemblePokemon(pokemon){
    pokemonLi= document.createElement('li')
    removePokemonBtn  = document.createElement('button')
    removePokemonBtn.innerHTML = 'Release Pokemon'
    removePokemonBtn.className = 'release'
    removePokemonBtn.dataset.id = pokemon.id

    pokemonLi.innerHTML = pokemon.species
    pokemonLi.append(removePokemonBtn) 
    return pokemonLi
}



function assembleTrainerDiv(trainer, pokemonList){
  trainerDiv = document.createElement('div')
  nameP = document.createElement('p')
  unorderedList  = document.createElement('ul')
  addPokemonBtn  = document.createElement('button')
  addPokemonBtn.className = 'add'
  addPokemonBtn.innerHTML = 'Add Pokemon'
  addPokemonBtn.dataset.id = trainer.id


  nameP.innerHTML = trainer.name
  trainerDiv.className = "card"
  trainerDiv.dataset.id = trainer.id
  trainerDiv.append(nameP)
  trainerDiv.append(addPokemonBtn)


  pokemonList.forEach(pokeLi => unorderedList.append(pokeLi))
  trainerDiv.append(unorderedList)



  return trainerDiv
}






// `<div class="card" data-id="1"><p>${trainer.name}</p>
  // <button data-trainer-id="1">Add Pokemon</button>
  // <ul>
    // <li>Jacey (Kakuna) <button class="release" data-pokemon-id="140">Release</button></li>
    // <li>Zachariah (Ditto) <button class="release" data-pokemon-id="141">Release</button></li>
    // <li>Mittie (Farfetch'd) <button class="release" data-pokemon-id="149">Release</button></li>
    // <li>Rosetta (Eevee) <button class="release" data-pokemon-id="150">Release</button></li>
    // <li>Rod (Beedrill) <button class="release" data-pokemon-id="151">Release</button></li>
  // </ul>
// </div>`
