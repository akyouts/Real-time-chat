

const socket=io("http://localhost:3000");

var form = document.getElementById("form");
var messageInput = document.getElementById("messageInp");
var messageContainer  = document.querySelector(".container");

var name = prompt("Enter Your name to join the chat");


socket.emit('new-user-joined',name);

socket.on('user-joined',name=>{
    apppend( name+' joined the chat',"left")

});

socket.on('received',data=>{
    apppend(data.name +":"+" "+data.message, "left");

});

socket.on('left',data=>{
    apppend(data+" "+"Leave the chat", "left");

});


form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    if (messageInput.value.length === 0){
    
    alert("Text Area is Blank")
    }
    else{
        apppend("You: "+messageInput.value,"right")
        socket.emit('send',{message : messageInput.value , name : name });
        messageInput.value = "";
    }
})





function apppend(message , position){
    var Join = document.createElement("div");
    Join.innerHTML = message;
    Join.classList.add("message");
    Join.classList.add(position);
    messageContainer.append(Join)

}
