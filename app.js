class App {
    constructor(selectors) {
        this.max = 0
        // this.count = 0
        this.dinos = []
        this.carnivores = []
        this.herbivores = []
        this.omnivores = []
        this.list = document
            .querySelector(selectors.listSelector)
        
        this.template = document
            .querySelector(selectors.templateSelector)
        document
            .querySelector(selectors.formSelector)
            .addEventListener('submit', this.addDinoFromForm.bind(this))

        this.load()
    }

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
    }

    addDinoFromForm(ev) {
        ev.preventDefault()

        const dino = {
            id: this.max + 1, 
            name: ev.target.dinoName.value,
            fav: false,
            diet: ev.target.diet.value,
        }
        //console.log(ev.target)
        this.addDino(dino)
        //this resets the input box after you click enter
        ev.target.reset()
    }
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
        //makes fav persist and come back
        if(dino.fav){
            listItem.classList.add('favColor')
        }
        if(dino.diet === 'carnivore'){
            this.carnivores.unshift(dino)
        }
        if(dino.diet === 'herbivore'){
            this.herbivores.unshift(dino)
        }
        if(dino.diet === 'omnivore'){
            this.omnivores.unshift(dino)
        }
        //add things to the beginning of the array instead of end
        this.dinos.unshift(dino)
        this.save()

        //this below fixes the id problem without changing the id
        if(dino.id > this.max){
            this.max = dino.id
        }
        ++ this.max
    }

    save(){
        localStorage
            .setItem('dinos', JSON.stringify(this.dinos))
        
        localStorage
            .setItem('carnivores', JSON.stringify(this.carnivores))

        localStorage
            .setItem('herbivores', JSON.stringify(this.herbivores))

        localStorage
            .setItem('omnivores', JSON.stringify(this.omnivores))
    }

    renderListItem(dino) {
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = dino.id
        //item.childNodes[3].contentEditable = 'true'


        // if(dino.fav){
        //     item.classList.add('favColor')
        // }

        if(dino.diet){
            item
                .querySelector('.dino-diet')
                .textContent = dino.diet
        }

        item
            .querySelector('.dino-name')
            .textContent = dino.name

        item
            .querySelector('.dino-name')
            .setAttribute =('title', dino.name)

        item
            .querySelector('.dino-name')
            .addEventListener('keypress', this.saveOnEnter.bind(this, dino))

        item
            .querySelector('.dino-diet')
            .addEventListener('keypress', this.saveOnEnter.bind(this, dino))
        
        item
            .querySelector('button.remove')
            .addEventListener('click', this.removeDino.bind(this))
        item
            .querySelector('button.fav')
            .addEventListener('click', this.favDino.bind(this, dino))
        item
            .querySelector('button.up')
            .addEventListener('click', this.moveUp.bind(this, dino))
        item
            .querySelector('button.down')
            .addEventListener('click', this.moveDown.bind(this, dino))
        // item
        //     .querySelector('button.save')
        //     .addEventListener('click', this.saveText.bind(this))
        item
            .querySelector('button.edit')
            .addEventListener('click', this.editDino.bind(this, dino))
        
        return item
    }

    saveOnEnter(dino, ev){
        if (ev.key === 'Enter'){
            this.editDino(dino, ev)
        }
    }

    editDino(dino, ev){
        const listItem = ev.target.closest('.dino')
        const nameField = listItem.querySelector('.dino-name')
        const dietField = listItem.querySelector('.dino-diet')

        const btn = listItem.querySelector('button.edit')
        const icon = btn.querySelector('i.fa')

        if(nameField.isContentEditable){
            //make it no longer editable
            nameField.contentEditable = false
            dietField.contentEditable = false
            icon.classList.remove('fa-floppy-o')
            icon.classList.add('fa-pencil')
            btn.classList.remove('success')
            //save changes
            dino.name = nameField.textContent
            dino.diet = dietField.textContent
            this.save()
        }
        else{
            nameField.contentEditable = true
            dietField.contentEditable = true
            nameField.focus()
            icon.classList.remove('fa-pencil')
            icon.classList.add('fa-floppy-o')
            btn.classList.add('success')
        }
        
    }

    moveUp(dino, ev){
        const listItem = ev.target.closest('.dino')

        const index = this.dinos.findIndex((currentDino, i)=>{
            return currentDino.id === dino.id
        })
        if(index > 0){
            this.list.insertBefore(listItem, listItem.previousElementSibling)
            const previousDino = this.dinos[index-1]
            this.dinos[index-1] = dino
            this.dinos[index] = previousDino
            this.save()
        }
    }

    moveDown(dino, ev){
        const listItem = ev.target.closest('.dino')

        const index = this.dinos.findIndex((currentDino, i)=>{
            return currentDino.id === dino.id
        })

        if(index < this.dinos.length - 1){
            this.list.insertBefore(listItem.nextElementSibling, listItem)

            const nextDino = this.dinos[index + 1]
            this.dinos[index+1] = dino
            this.dinos[index] = nextDino
            this.save()
        }
    }

    favDino(dino, ev){
        const listItem = ev.target.closest('.dino')
        dino.fav = !dino.fav
        if(dino.fav){
            listItem.classList.add('favColor')
        }
        else{
            listItem.classList.remove('favColor')
        }
        //saves it to local storage
        this.save()
    }

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
        // for(let i = 0; i < this.dinos.length; i++){
        //     this.dinos[i].id = this.dinos.length - i
        // }
        // this.max = this.dinos.length 
        // this.save()
    }
}

const app = new App({
    formSelector: '#dino-form',
    listSelector: '#dino-list',
    templateSelector: '.dino.template',
})


