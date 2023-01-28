const socket = io("http://localhost:3000");

socket.on("hello", (arg) => {
    console.log(arg);
})




let form = document.getElementById('form');
let input = document.getElementById('input');
let convo = document.querySelector(".chat-window")

form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        console.log(name)
        socket.emit('chat message', input.value);
        input.value = '';

    }

});
socket.on("chat message",function(msg){
    let status= document.querySelector(".status")
    status.innerHTML=""
    let item = document.createElement('li');
    console.log(msg)
    item.textContent+= msg
    item.classList="messages"
    convo.appendChild(item);
})