const io = require("socket.io")(4000, {
    cors: {
        origin: "http://localhost:3000",
    },
});


io.on('connection', (socket) => {
    console.log('aa new user is connected');

    //add post events
    socket.on('addPost', data => {
        
        io.emit('newPost', data)
    })

    //addcomment evets
    socket.on('PostChanged', data => {
      
        io.emit("refreshPost", data)
    })

})