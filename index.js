const io = require('socket.io')(3000);

const user = {};

io.on("connection", socket =>{
    socket.on('new-user-joined', name =>{
        user[socket.id] = name;
        
        socket.broadcast.emit('user-joined',name);
    })

    socket.on('send', data =>{
        socket.broadcast.emit('received',{ message : data.message , name : user[socket.id]});
    })

    socket.on('disconnect', data =>{
        socket.broadcast.emit('left',user[socket.id]);
        delete user[socket.id];
    })
})
