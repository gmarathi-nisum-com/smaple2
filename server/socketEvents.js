exports = module.exports = function (io) {
  // Set socket.io listeners.
  io.on('connection', (socket) => {
    // console.log('a user connected');

    // On conversation entry, join broadcast channel
    socket.on('enter conversation', (conversation) => {
      socket.join(conversation);
      // console.log('joined ' + conversation);
    });

    socket.on('leave conversation', (conversation) => {
      socket.leave(conversation);
      // console.log('left ' + conversation);
    });

    socket.on('new message', (conversation) => {
      io.sockets.emit('refresh messages', conversation);
    });

    socket.on('new friend request', (friend) => {
      // console.log("friendId: ", friend)
      io.sockets.emit('new friend', friend);
    });

    socket.on('disconnect', () => {
      // console.log('user disconnected');
    });
  });
};
