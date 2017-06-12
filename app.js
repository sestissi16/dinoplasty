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
        const choiceOfPic = ['cute-dino-1.jpg', 'cute-dino-2.jpg', 'cute-dino-3.jpg', 'cute-dino-4.jpg', 'cute-dino-5.jpg', 'cute-dino-6.jpg']
        const randomNum = Math.floor(Math.random() * choiceOfPic.length)
        const picChoice = choiceOfPic[randomNum]
        const srcAtt = document.createAttribute('src')
        srcAtt.value = `${picChoice}`
        document.getElementById('picture').setAttributeNode(srcAtt)
        
        
        //add things to the beginning of the array instead of end
        this.dinos.unshift(dino)
        this.save()
        //console.log(dino)
        // if(item.nextSibling.nextSibling.classList.contains('template')){
        //     //console.log(listItem.nextSibling)
        //     const disableAtt = document.createAttribute('disabled')
        //     listItem.querySelector('.down').setAttributeNode(disableAtt)
        // }
        // else if (item === this.list.childNodes[1]){
        //     console.log(listItem)
        //     console.log(this.list.childNodes[1])
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
        item.childNodes[1].contentEditable = 'true'

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
        let textItem = null
        for(let i = 0; i < listItem.childNodes.length; i++){
            if(listItem.childNodes[i].className === 'dino-name' ){
                textItem = listItem.childNodes[i].textContent.toString()
                break
            }
        }
        for(let i = 0; i < this.dinos.length; i++){
            const currentId = this.dinos[i].id.toString()
            const dino = {
                    id: this.dinos[i].id,
                    name: textItem
                }
            if (listItem.dataset.id === currentId){
                this.dinos.splice(i, 1, dino)

                this.save()
                break
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
        //console.log(currentElement)
        const itemElement = currentElement.nextSibling.nextSibling
        //console.log(itemElement)
        const listElement = ev.target.closest('.no-bullet')
        listElement.insertBefore(itemElement, currentElement)

    },

    favDino(ev){
        const listItem = ev.target.closest('.dino')
        if(listItem.classList.contains('favColor')){
            listItem.classList.remove('favColor')
        }
        else{
            listItem.classList.add('favColor')
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
