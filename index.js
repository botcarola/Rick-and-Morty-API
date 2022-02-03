const containerCards = document.querySelector(".container")
const buttonPrev = document.querySelector("#prev-button")
const buttonNext = document.querySelector("#next-button")
const searchForm = document.querySelector("#search-form")
const inputSearch = document.querySelector("#input-search")
const containerButtons = document.querySelector(".buttons-page")


const urlCharacters = "https://rickandmortyapi.com/api/character"
const urlLocations = "https://rickandmortyapi.com/api/location"
const urlEpisodes = "https://rickandmortyapi.com/api/episode"

let pagination = 1

const characterHtml = (data) => {
    const htmlCards = data.results.reduce((acc, curr) => {
        return acc + `
            <div class="card" id="${curr.id}">
                <div class="img-container">
                    <img src="${curr.image}">
                </div>
                <span>
                    ${curr.name}
                </span>
            </div>`
    }, "")
    return htmlCards
}

const fetchCharacter = () => {
    fetch(`https://rickandmortyapi.com/api/character/?page=${pagination}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        console.log(data.results)
        containerCards.innerHTML = characterHtml(data)
        idCharacter()
    })
}

fetchCharacter()

const idCharacter = () => {
    const cards = document.querySelectorAll(".card")
    console.log(cards)
    for (let i = 0; i < cards.length; i++){

        cards[i].onclick = () => {
            let id = cards[i].id
            console.log(id)
            modalCharacterHtml(id)
        }
    }
}

const modalCharacterHtml = (id) => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(res => res.json())
    .then(data => {
        modal(data)
        
    })
}

const modal = (data) => {

}

buttonPrev.onclick = () => {
    if(pagination !== 1){
        pagination--
    }
    fetchCharacter()
}

buttonNext.onclick = () => {
    if( pagination !== 42){
        pagination++
    }
    fetchCharacter()
}

searchForm.onsubmit = (e) => {
    e.preventDefault()
    containerButtons.style.display = "none"
    fetch(`https://rickandmortyapi.com/api/character/?name=${inputSearch.value}`)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        containerCards.innerHTML = characterHtml(data)
    })
    
}