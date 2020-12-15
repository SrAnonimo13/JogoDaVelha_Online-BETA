const socket = io();
let vez;
let trava;
let jogadores;
let MyData;
let Area

socket.on('startGame', (data) =>{
    jogadores = data
    trava = true
})

socket.on('sendid', (data) =>{
    MyData = data;
})

socket.on('FimDeJogo', data =>{
    alert('O jogo acabou')
})

socket.on('sendArea', (data) =>{
    Area = data;
    for (let i = 0; i < Area.length; i++) {
        for (let h = 0; h < Area.length; h++) {
            switch(Area[i][h].id){
                case 1:
                    $("#"+Area[i][h].ButtonId).addClass('x').val('x')
                    break;
                case 2:
                    $("#"+Area[i][h].ButtonId).addClass('o').val('o')
                    break;
            }
        }
    }
})
//Anotação Global:  0 = x 1 = o
setTimeout(()=>{
    $('#player').addClass(MyData.simbolo).text(MyData.simbolo)
}, 66)
$(document).ready(function(){
    $("input").click(function(){
        if(trava){
            socket.emit('sendButton', {ButtonId:$(this).attr("id"),PlayerId:MyData.id})
        }
    });
});