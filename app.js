const app = {
    init(formSelector) {
        this.max = 0
        document
            .querySelector(formSelector)
            .addEventListener('submit', this.addDino.bind(this))
    },

    addDino(ev) {
        ev.preventDefault()

        const dino = {
            id: this.max + 1, 
            name: ev.target.dinoName.value,
        }

        console.log(dino.name, dino.id)
        ++ this.max
    },
}

app.init('#dino-form')