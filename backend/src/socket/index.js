export const registerSockets = (io) => {
  io.on('connection', (socket) => {
    socket.on('room:join', ({ roomCode, username }) => { socket.join(roomCode); io.to(roomCode).emit('room:message', { user: 'system', text: `${username} joined` }); });
    socket.on('room:chat', ({ roomCode, user, text }) => io.to(roomCode).emit('room:message', { user, text }));
    socket.on('pomodoro:start', ({ roomCode, durationSec }) => io.to(roomCode).emit('pomodoro:update', { isRunning: true, durationSec, startedAt: Date.now() }));
    socket.on('pomodoro:stop', ({ roomCode }) => io.to(roomCode).emit('pomodoro:update', { isRunning: false }));
  });
};
