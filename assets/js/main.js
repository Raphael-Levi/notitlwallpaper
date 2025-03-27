// import APP from './class/app/app.js'
// import MAP from './class/map/map.js'
// import OPEN from './class/open/open.js'
// import LEFT from './class/left/left.js'
// import RIGHT from './class/right/right.js'

new Vue({
    el: '#wrap',
    data(){
        return{
            musics: [{path: 'sadf', title: 'asdf', duration: '00:00'}],
            objectModules: {
                app: App,
                map: Map
            },
            elementModules: {
                open: Open,
            },
            elements: {
                open: null,
            },
            volume: 60
        }
    },
    mounted(){
        this.init()
    },
    watch: {
        currentVolume(){
            if(!this.elements['left']) return

            this.getComp('left', 'player').setVolume(this.volume)
        }
    },
    computed: {
        getElement(){
            return (name, child) => {
                if(!this.elements[name]) return []
                else return this.elements[name].get(child)
            }
        },
        getStyle(){
            return (name, child) => {
                if(!this.elements[name]) return {}
                else return this.getComp(name, child).style
            }
        },
    },
    methods: {
        init(){
            this.initThree()
            this.initElement()
            this.animate()

            window.addEventListener('resize', this.onWindowResize, false)
        },


        // three
        initThree(){
            for(const module in this.objectModules){
                const instance = this.objectModules[module]
                
                OBJECT[module] = new instance(OBJECT)
            }
        },
        resizeThree(){
            for(const i in OBJECT){
                if(!OBJECT[i].resize) continue
                OBJECT[i].resize(OBJECT)
            }
        },
        renderThree(){
            for(const i in OBJECT){
                if(!OBJECT[i].animate) continue
                OBJECT[i].animate(OBJECT)
            }
        },


        // element
        addElement(){
            for(const module in this.elementModules){
                this.elements[module] = null
            } 
        },
        initElement(){
            for(const module in this.elementModules){
                const instance = this.elementModules[module]

                this.elements[module] = new instance({...OBJECT, ...this.elements, musics: this.musics})
            }  
        },
        resizeElement(){
            for(const i in this.elements){
                if(!this.elements[i].resize) continue
                this.elements[i].resize(OBJECT)
            }
        },
        animateElement(){
            for(const i in this.elements){
                if(!this.elements[i].animate) continue
                this.elements[i].animate(OBJECT)
            }
        },
        getComp(name, child){
            return this.elements[name].getComp(child)
        },


        // event
        onWindowResize(){
            this.resizeThree()
        },


        // render
        render(){
            this.renderThree()
            TWEEN.update()
        },
        animate(){
            this.render()
            this.animateElement()
            // requestAnimationFrame(this.animate)
            requestIdleCallback(this.animate)
        }
    }
})