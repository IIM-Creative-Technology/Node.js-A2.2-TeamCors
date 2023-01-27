const socket = io("http://localhost:3000");

socket.on("hello", (arg) => {
    console.log(arg);
})

let form = document.querySelector("#create-room-form")
// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Get the room name and max players values
    const roomName = document.getElementById('room-name').value;

    // Send a POST request to the server to create the room
    const response = await fetch('http://localhost:3000/api/room/create', {
        method: 'POST',
        body: JSON.stringify({ name: roomName }),
        headers: { 'Content-Type': 'application/json' }
    });
    // Handle the response from the server
    if (response.ok) {
        alert("Yeah,you create a room")
        const { link } = await response.json();

        // Redirect the user to the room link
        window.location.href = link;
    } else {
        alert('Failed to create room');
    }
});

