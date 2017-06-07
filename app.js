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

    renderListItem(dino) {
        const item = document.createElement('li')
        item.textContent = dino.name
        item.innerHTML += `
            <div class="button-group">
                <a class="warning button">Favorite</a>
                <a class="alert button">Delete</a>
            </div>
        `
        //deleteButton = $('<span />').addClass('')
        return item
    },

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})