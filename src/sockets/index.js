export default {
  connect: function connect() {
    console.log('socket connected');
  },
  message: function message(data) {
    console.log('message', data);
  },
  echo: function echo(data) {
    console.log('echo', data);
  },
};
