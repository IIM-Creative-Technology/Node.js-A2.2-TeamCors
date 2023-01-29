const socket = io("http://localhost:3000");

console.log(document.URL)
if ( document.URL.includes("lobby.html") ) {

    let members =[]
    const username = localStorage.getItem("username");

    const roomIde = document.URL.split('/')[5];
    socket.emit("join room",{roomIde:roomIde,members:members})

    members.push(username)

    const roomId =localStorage.getItem("roomId");
    document.querySelector("#username").innerHTML = username;

   // socket.emit("user entered", { username ,roomIde});

    socket.on("user entered", (data) => {
        console.log("New user in the  chat : " + data)
        const list = document.querySelector("#user-list");
        const item = document.createElement("li");
        item.innerHTML = data;
        list.appendChild(item);
        console.log(members)

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

}

socket.on("set username",(data)=>{
    console.log(data)
    localStorage.setItem("username", data);
})


socket.on("hello", (arg) => {
    console.log(arg);
})



let forme = document.querySelector("#create-room-form")
let joinForm = document.querySelector("#join-form")

forme.addEventListener('submit', async (e) => {
    e.preventDefault();

    const roomName = document.querySelector('#room-name').value;

    const response = await fetch('http://localhost:3000/api/room/create', {
        method: 'POST',
        body: JSON.stringify({ name: roomName }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        alert("Yeah,you create a room");
        const { link } = await response.json();
        console.log(link);
        const roomId = link.split('/')[2];
        localStorage.setItem("roomId", roomId);
        socket.emit("new user")


        window.location.href = 'lobby.html?roomId=' + roomId;

    } else {
        alert('Failed to create room');
    }
})

joinForm.addEventListener('submit',async (e)=>{
    e.preventDefault();
    let roomId = document.querySelector("#room-id").value
    console.log(roomId)
    const response = await fetch('http://localhost:3000/api/room/'+ roomId, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });
    console.log(response)

    if(response.ok){
        alert("Yeah,you joined the room");
        const { link } = await response.json();
        console.log(link);
        console.log(roomId)
        localStorage.setItem("roomId", roomId);
        socket.emit("new user")
        // Redirect the user to the room link
        window.location.href = 'lobby.html?roomId=' + roomId;

    }else{
        alert("this room doesn't exist")
    }
})


let form = document.getElementById('form');
let input = document.getElementById('input');
let convo = document.querySelector(".chat-window")

/*form.addEventListener('submit', function(e) {
    e.preventDefault();
    if (input.value) {
        console.log(name)
        const response =  fetch('http://localhost:3000/api/message/create', {
            method: 'POST',
            body: JSON.stringify({ message: input.value }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok){
            alert("yeah")
        }else{
            ("nul")
        }
        input.value = '';
    }
});*/




