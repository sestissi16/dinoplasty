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
                <button
                    id="upBtn"
                    class="button"
                    onclick="app.move()"

                >
                    Up
                </button>
                <button
                    id="downBtn"
                    class="button"
                    onclick="app.move()"
                >
                    Down
                </button>
            </div>
        `
        
        return item
    },
    
    move() {
        debugger
        const ul = document.getElementById('dino-list')
        const items = ul.getElementsByTagName('li')

        this.counter = 0
        this.previousItem = null
        this.moveNextItemUp = false

        for (let i = 0; i<items.length; i++){
            if(this.id === 'downBtn'){
                this.moveNextItemUp = true
            }
            else if ((this.id === 'upBtn') || (this.moveNextItemUp === true)){
                items[i].parentNode.insertBefore(item[i], items[i-1])
                break
            }
            this.previousItem = items[i]
            this.counter += 1
        }


    },
    

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})
