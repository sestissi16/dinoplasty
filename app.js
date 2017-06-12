const app = {
    init(selectors) {
        this.max = 0
        // this.count = 0
        this.dinos = []
        this.list = document
            .querySelector(selectors.listSelector)
        this.template = document
            .querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addDinoFromForm.bind(this))
        
        //makes it so you can just start typing without clicking on box
        /*document
            .querySelector(selectors.formSelector)
            .dinoName
            .focus()*/
        //could also type in autofocus as an attribute to input for html5
        //add attribute required to input so you can't submit an empty input
        this.load()
    },

    load(){
        //load the JSON from localstorage
        const dinoJSON = localStorage.getItem('dinos')

        //convert the JSON back into an array
        const dinoArray = JSON.parse(dinoJSON)

        //set this.dinos with the dinos from that array
        if(dinoArray){
            dinoArray
                .reverse()
                .map(this.addDino.bind(this))
        }
    },

    addDinoFromForm(ev) {
        ev.preventDefault()

        const dino = {
            id: this.max + 1, 
            name: ev.target.dinoName.value + ', ' + ev.target.eatingHabits.value,
        }
        //console.log(ev.target)
        this.addDino(dino)
        //this resets the input box after you click enter
        ev.target.reset()
    },
    addDino(dino){
        const listItem = this.renderListItem(dino)
        //this.list.appendChild(listItem)
        this.list.insertBefore(listItem, this.list.firstChild)

        //add things to the beginning of the array instead of end
        this.dinos.unshift(dino)
        this.save()
        // if(listItem.nextSibling === listItem.template){
        //     const disableAtt = document.createAttribute('disabled')
        //     listItem.querySelector('.down').setAttributeNode(disableAtt)
        // }
        // else if (listItem.previousSibling === null){
        //     const disableAtt = document.createAttribute('disabled')
        //     listItem.querySelector('.up').setAttributeNode(disableAtt)
        // }

        ++ this.max
    },

    save(){
        localStorage
            .setItem('dinos', JSON.stringify(this.dinos))
    },

    renderListItem(dino) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = dino.id
        item.contentEditable = 'true'

        this.count = 0
        item
            .querySelector('.dino-name')
            .textContent = dino.name
        item
            .querySelector('button.remove')
            .addEventListener('click', this.removeDino.bind(this))
        item
            .querySelector('button.fav')
            .addEventListener('click', this.favDino.bind(this))
        item
            .querySelector('button.up')
            .addEventListener('click', this.moveUp.bind(this))
        item
            .querySelector('button.down')
            .addEventListener('click', this.moveDown.bind(this))
        item
            .querySelector('button.save')
            .addEventListener('click', this.saveText.bind(this))
        return item
    },

    saveText(ev){
        const listItem = ev.target.closest('.dino')
        //listItem.textContent = ev.target.parentElement.parentElement.textContent
        let textItem = null
        for(let i = 0; i < listItem.childNodes.length; i++){
            if(listItem.childNodes[i].className === 'dino-name' ){
                textItem = listItem.childNodes[i]
                break
            }
        }
        console.log(textItem)
        for(let i = 0; i < this.dinos.length; i++){
            const currentId = this.dinos[i].id.toString()
            if (listItem.dataset.id === currentId){
                const dino = {
                    id:this.dinos[i-1].id,
                    name: textItem
                }
                this.dinos.splice(i, 1, dino)
                //console.log(this.dinos)
                this.save()
            }
        }
    },

    moveUp(ev){
        const currentElement = ev.target.parentElement.parentElement
        const itemElement = currentElement.previousSibling
        const listElement = ev.target.closest('.no-bullet')
        listElement.insertBefore(currentElement, itemElement)

    },

    moveDown(ev){
        const currentElement = ev.target.parentElement.parentElement
        const itemElement = currentElement.nextSibling
        const listElement = ev.target.closest('.no-bullet')
        listElement.insertBefore(itemElement, currentElement)

    },

    favDino(ev){
        const listItem = ev.target.closest('.dino')
        if (this.count === 0 && listItem.style.backgroundColor === '' ){
            listItem.style.backgroundColor = '#FFCA28'
        }
        else if (this.count === 1 && listItem.style.backgroundColor === '#FFCA28'){
            listItem.style.backgroundColor = ''
        }
        else if (this.count === 0) {
            listItem.style.backgroundColor = ''
            this.count = 1
        }
        else {
            listItem.style.backgroundColor = '#FFCA28'
            this.count = 0
        }

    },

    removeDino(ev) {
        const listItem = ev.target.closest('.dino')
        listItem.remove()

        for(let i = 0; i < this.dinos.length; i++){
            const currentId = this.dinos[i].id.toString()
            if(listItem.dataset.id === currentId){
                this.dinos.splice(i, 1)
                this.save()
                break
            }
        }
        for(let i = 0; i < this.dinos.length; i++){
            this.dinos[i].id = this.dinos.length - i
        }
        this.max = this.dinos.length 
        this.save()
    },
    

}

app.init({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
})
