function renderTrainers(trainers){
  trainers.forEach(renderTrainer)
}

function renderTrainer(trainer){
  const mainElement = document.querySelector('main')
  const pokeCard = createCardElement(trainer)
  mainElement.append(pokeCard);
}

function deletePokemon(e){
  e.target.parentNode.remove()
}

function createPokemonListItems(pokemons){
   return pokemons.map((pokemon) => {
    const pokeLi = createPokeLi(pokemon)
    return pokeLi
  })
}

function createPokeLi(pokemon){
  const pokeLi = document.createElement('li');
  pokeLi.innerText = pokemon.species
  const releasePokemonBtn = document.createElement('button');
  releasePokemonBtn.innerText = 'Release Pokemon' 
  releasePokemonBtn.className = 'release'
  releasePokemonBtn.dataset['id'] = pokemon.id
  pokeLi.append(releasePokemonBtn)
  return pokeLi;
}

function createNewPokemon(pokemon, e){
  const pokeLi = createPokeLi(pokemon)
  e.target.nextSibling.append(pokeLi)
}

function createCardElement(trainer){
  const newDiv = document.createElement('div');
  const trainerNameP = document.createElement('p');
  const addPokemonBtn = document.createElement('button');
  const unorderedList = document.createElement('ul');
  const pokeLis= createPokemonListItems(trainer.pokemons)
  pokeLis.forEach((pokeLi) => {
    unorderedList.append(pokeLi)
  })

  newDiv.className = 'card';
  newDiv.dataset.id = trainer.id

  newDiv.innerText = trainer.name;

  addPokemonBtn.dataset.id = trainer.id
  addPokemonBtn.innerText = 'Add Pokemon'
  addPokemonBtn.className = 'add'



  newDiv.append(trainerNameP)
  newDiv.append(addPokemonBtn)
  newDiv.append(unorderedList)
  return newDiv
}
