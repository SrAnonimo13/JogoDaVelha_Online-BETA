const express = require('express')
const app = express()
const server = require('http').createServer(app)
const path = require('path')
const io = require('socket.io')(server)

app.use(express.static(path.join(__dirname, 'public')))

server.listen(3000, ()=>{
    console.log('Servidor iniciado')
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////
const jogadores = []
let Area = [
    [{id:0, ButtonId:"bt1"},{id:0, ButtonId:"bt2"},{id:0, ButtonId:"bt3"}],
    [{id:0, ButtonId:"bt4"},{id:0, ButtonId:"bt5"},{id:0, ButtonId:"bt6"}],
    [{id:0, ButtonId:"bt7"},{id:0, ButtonId:"bt8"},{id:0, ButtonId:"bt9"}]
]

function getSimbolo(){
    if(jogadores.length == 0 || jogadores[0].simbolo == 1){
        return 0
    }else{
        return 1
    }
}

io.on('connection', (socket) =>{
    let sbl
    if(getSimbolo() == 0){
        sbl = 'x'
    }else{
        sbl = 'o'
    }
    socket.emit('sendid', {id:socket.id,simbolo:sbl})
    io.emit('sendArea', Area)
    if(jogadores.length == 2){
        console.log(`O Usuario de id:${socket.id} estão olhando o jogo`)
    }else{
        jogadores.push({id:socket.id,simbolo:getSimbolo()})
        console.log(`O Usuario de id:${socket.id} entrou no jogo`)
        if(jogadores.length == 2){
            io.emit('startGame', jogadores)
        }
    }
    console.log(jogadores)
    /*let pos = jogadores.map(function(e){return e.id}).indexOf(socket.id)
    let saida = 'o'
    if(jogadores[pos].simbolo == 0){
        saida = 'x'
    }*/
    
    socket.on('disconnect', () =>{
        console.log('O Usuario de id',socket.id,'saiu')
        let pos = jogadores.map(function(e){return e.id}).indexOf(socket.id)  
        jogadores.splice(pos, 1)
        console.log(jogadores)
    })
    //Anotação Global:  0 = x 1 = o
    socket.on('sendButton', data =>{
        let pos = jogadores.map(function(e){return e.id}).indexOf(data.PlayerId)
        let jogador = jogadores[pos]
        let error = false
        switch(data.ButtonId){
            case "bt1":
                if(Area[0][0].id == 0)
                    Area[0][0].id = jogador.simbolo +1
                else
                    error = true
                break;
            case "bt2":
                if(Area[0][1].id == 0)
                    Area[0][1].id = jogador.simbolo +1
                else
                    error = true
                break;
            case "bt3":
                if(Area[0][2].id == 0)
                    Area[0][2].id = jogador.simbolo +1
                else
                    error = true
                break;
            case "bt4":
                if(Area[1][0].id == 0)
                    Area[1][0].id = jogador.simbolo +1
                else
                    error = true
                break;
            case "bt5":
                if(Area[1][1].id == 0)
                    Area[1][1].id = jogador.simbolo +1
                else
                    error = true
                break;
            case "bt6":
                if(Area[1][2].id == 0)
                    Area[1][2].id = jogador.simbolo +1
                else
                    error = true
                break;
            case "bt7":
                if(Area[2][0].id == 0)    
                    Area[2][0].id = jogador.simbolo +1
                else
                    error = true
                break;
            case "bt8":
                if(Area[2][1].id == 0)
                    Area[2][1].id = jogador.simbolo +1
                else
                    error = true
                break;
            case "bt9":
                if(Area[2][2].id == 0)
                    Area[2][2].id = jogador.simbolo +1
                else
                    error = true
                break;
        }
        io.emit('sendArea', Area)
    })
})