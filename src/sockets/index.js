export default {
  connect: function connect() {
    console.log('socket connected');
    this.$socket.send('echo');
  },
  message: function message(data) {
    console.log('message', data);
  },
  echo: function echo(data) {
    console.log('echo', data);
  },
};
