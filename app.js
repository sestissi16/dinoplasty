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
        /*item.innerHTML += `
            <div class="button-group">
                <button
                    id="favBtn"
                    class="warning button" 
                >
                    Favorite
                </button>
                <button
                    id="delteBtn" 
                    class="alert button"
                >
                    Delete
                </button>
            </div>
        `*/
        const div = document.createElement('div')
        divClass = document.createAttribute('class')
        divClass.value = 'button-group'
        div.setAttributeNode(divClass)
        const favBtn = document.createElement('button')
        favBtnId = document.createAttribute('id')
        favBtnId.value = 'favButton'
        favBtn.setAttributeNode(favBtnId)
        favBtnClass = document.createAttribute('class')
        favBtnClass.value = 'warning button'
        favBtn.setAttributeNode(favBtnClass)
        favClick = document.createAttribute('onclick')
        favClick.value = 'this.favButton()'
        favBtn.setAttributeNode(favClick)
        favBtn.value = 'Favorite'
        div.appendChild(favBtn)
        const delBtn = document.createElement('button')
        delBtnId = document.createAttribute('id')
        delBtnId.value = 'delButton'
        delBtn.setAttributeNode(delBtnId)
        delBtnClass = document.createAttribute('class')
        delBtnClass.value = 'alert button'
        delBtn.setAttributeNode(delBtnClass)
        delBtn.value = 'Delete'
        div.appendChild(delBtn)
        item.appendChild(div)
        return item
    },


    

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
})
