const app = {
    init(selectors) {
        this.max = 0
        this.dinos = []
        this.list = document
            .querySelector(selectors.listSelector)
        this.template = document
            .querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addDino.bind(this))
        
        //makes it so you can just start typing without clicking on box
        /*document
            .querySelector(selectors.formSelector)
            .dinoName
            .focus()*/
        //could also type in autofocus as an attribute to input for html5
        //add attribute required to input so you can't submit an empty input
        
    },

    addDino(ev) {
        ev.preventDefault()

        const dino = {
            id: this.max + 1, 
            name: ev.target.dinoName.value,
        }

        const listItem = this.renderListItem(dino)
        //this.list.appendChild(listItem)
        this.list.insertBefore(listItem, this.list.firstChild)

        //add things to the beginning of the array instead of end
        this.dinos.unshift(dino)

        ++ this.max
        //this resets the input box after you click enter
        ev.target.reset()
    },

    /*favButton(){
        this.parentElement.style.backgroundColor = '#FFCA28'
    },*/

    renderListItem(dino) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = dino.id
        
        item
            .querySelector('.dino-name')
            .textContent = dino.name
        //commented out to be able to follow along with class
        /*const item = document.createElement('li')
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
        `*/
        item
            .querySelector('button.remove')
            .addEventListener('click', this.removeDino)
        return item
    },

    removeDino(ev) {
        const listItem = ev.target.closest('.dino')
        listItem.remove()
    },
    
    move() {
        //debugger
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
    templateSelector: '.dino.template',
})
