import ComponentsBuilder from './components.js';

export default class TerminalController{
    constructor(){

    }

    #onInputReceveid(eventEmitter){
        return function(){
            const message = this.getValue()
            console.log(message)
            this.clearValue()
        }
    }

    #onMessageReceveid({screen, chat}){
        return msg=>{
            const { userName, message } = msg
            chat.addItem(`{bold}${userName}{/}: ${message}`)
            screen.render()
        }
    }

    #registerEvents(eventEmitter,components){ 
        eventEmitter.on('message:received', this.#onMessageReceveid(components)) 
    }

    async initializeTable(eventEmitter){
        const components = new ComponentsBuilder()
            .setScreen({title:'Hacker Chat'})
            .setLayoutComponent()
            .setInputComponent(this.#onInputReceveid(eventEmitter))
            .setChatComponent()
            .build()

        this.#registerEvents(eventEmitter,components)           
        
        components.input.focus()
        components.screen.render()
    
        setInterval(()=>{
            eventEmitter.emit('message:received',{message: 'hello',userName: 'lucas'})
            eventEmitter.emit('message:received',{message: 'hello',userName: 'lucas 2'})
        },2000)
    }
}