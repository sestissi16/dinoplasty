class Omni {
    constructor(selectors){
        this.max = 0
        this.omnivores = []

        this.list = document
            .querySelector(selectors.listSelector)
        this.template = document
            .querySelector(selectors.templateSelector)

        this.load()
    }

    load(){
        const omniJSON = localStorage.getItem('omnivores')

        const omniArray = JSON.parse(omniJSON)

        if(omniArray){
            omniArray
                .reverse()
                .map(this.addDino.bind(this))
        }
        
    }

    addDino(dino){
        const listItem = this.renderListItem(dino)
        this.list.insertBefore(listItem, this.list.firstChild)

        const choiceOfPic = ['plant-1.jpg', 'plant-2.jpg', 'plant-3.jpg', 'plant-4.jpg']
        const randomNum = Math.floor(Math.random() * choiceOfPic.length)
        const picChoice = choiceOfPic[randomNum]
        const srcAtt = document.createAttribute('src')
        srcAtt.value = `${picChoice}`
        document.getElementById('picture').setAttributeNode(srcAtt)

        if(dino.fav){
            listItem.classList.add('favColor')
        }

        this.omnivores.unshift(dino)
        this.save()

        if(dino.id > this.max){
            this.max = dino.id
        }
        ++ this.max
    }

    save(){
        localStorage
            .setItem('omnivores', JSON.stringify(this.omnivores))

    }

    renderListItem(dino){
        const item = this.template.cloneNode(true)
        item.classList.remove('template')
        item.dataset.id = dino.id

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
            .setAttribute = ('title', dino.name)

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

        const index = this.omnivores.findIndex((currentDino, i)=>{
            return currentDino.id === dino.id
        })
        if(index > 0){
            this.list.insertBefore(listItem, listItem.previousElementSibling)
            const previousDino = this.omnivores[index-1]
            this.omnivores[index-1] = dino
            this.omnivores[index] = previousDino
            this.save()
        }
    }

    moveDown(dino, ev){
        const listItem = ev.target.closest('.dino')

        const index = this.omnivores.findIndex((currentDino, i)=>{
            return currentDino.id === dino.id
        })

        if(index < this.omnivores.length - 1){
            this.list.insertBefore(listItem.nextElementSibling, listItem)

            const nextDino = this.omnivores[index + 1]
            this.omnivores[index+1] = dino
            this.omnivores[index] = nextDino
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

        for(let i = 0; i < this.omnivores.length; i++){
            const currentId = this.omnivores[i].id.toString()
            if(listItem.dataset.id === currentId){
                this.omnivores.splice(i, 1)
                this.save()
                break
            }
        }
        // for(let i = 0; i < this.omnivores.length; i++){
        //     this.omnivores[i].id = this.omnivores.length - i
        // }
        // this.max = this.omnivores.length 
        // this.save()
    }
}

const omni = new Omni({
    listSelector: '#omni-list',
    templateSelector: '.dino.template',
})