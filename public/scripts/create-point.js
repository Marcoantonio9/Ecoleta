let populateUfs = () => {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( (res) => {
        return res.json()
    })
    .then( (states) => {

        for(const state of states) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
          }

    })
}
populateUfs()

let getCities = (event) => {
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = '<option value>Selecione a cidade</option>'
    citySelect.disabled = true

    fetch(url)
    .then( (res) => {
        return res.json()
    })
    .then( (cities) => {
 
        for(const city of cities) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }

        citySelect.disabled = false

    })

}






document.querySelector('select[name=uf]')
        .addEventListener("change", getCities)


//Itens de coleta 
//Pegar todos os Li's
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id


    //Verificar se existem itens selecionados, se sim
    //Pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(function(item){
        const itemFound = item == itemId //True ou false
        return itemFound
    })

    //Se já estiver selecionado, tirar da seleção
    if(alreadySelected >= 0){
        //Tirar da seleção
        const filteredItems = selectedItems.filter((item) => {
            const itemIsDifferent = item != itemId //false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    }else{
        //Se não tiver selecionado, adicionar a seleção

        selectedItems.push(itemId)
    }

    console.log(selectedItems)

    //Atualizar o campo escondido com os dados selecionados
    collectedItems.value = selectedItems

}