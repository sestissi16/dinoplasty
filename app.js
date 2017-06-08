const app = {
    init(selectors) {
        this.max = 0
        this.dinos = []
        this.list = document.querySelector(selectors.listSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addDino.bind(this))
        
    },

    addDino(ev) {
        ev.preventDefault()

        const dino = {
            id: this.max + 1, 
            name: ev.target.dinoName.value,
        }

        const listItem = this.renderListItem(dino)
        this.list.appendChild(listItem)

        this.dinos.push(dino)

        ++ this.max
    },

    favButton(){
        this.parentElement.style.backgroundColor = '#FFCA28'
    },

    renderListItem(dino) {
        const item = document.createElement('li')
        item.textContent = dino.name
        item.innerHTML += `
            <div class="button-group">
                <button
                    id="favBtn"
                    class="warning button"
                    onclick="this.parentElement.parentElement.style.backgroundColor = '#FFCA28'"
                    ondblclick="this.parentElement.parentElement.style.backgroundColor = ''" 
                >
                    Favorite
                </button>
                <button
                    id="delteBtn" 
                    class="alert button"
                    onclick="this.parentElement.parentElement.remove()"
                >
                    Delete
                </button>
            </div>
        `
        return item
    },


    

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})
