window.addEventListener('load', () => {
    let socket = io.connect('https://letschitchatweb.herokuapp.com/');
    let name = window.prompt('Please enter your Good Name!')
    let userMessage = document.querySelector('#userMessage')
    let userHandle = document.querySelector('#userHandle')
    let sendMessagebtn = document.querySelector('#sendMessagebtn')
    let output = document.querySelector('#output')
    let typing = document.querySelector('#typing');

    userHandle.value = name

    sendMessagebtn.addEventListener('click', function () {
        socket.emit('chat', {
            userMessage: userMessage.value,
            userHandle: userHandle.value
        });

    });
    userMessage.addEventListener('keypress', function () {
        socket.emit('typing', userHandle.value);

    })
    socket.on('chat', function (data) {
        typing.innerHTML = "";
        userMessage.value = "";
        output.innerHTML += '<p><strong class="userName">' + data.userHandle + ': </strong>' + data.userMessage + '</p>';
    });
    socket.on('typing', function (data) {
        typing.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
    });
    socket.on('joined', function (data) {
        console.log(data)
    })
});
// $('#messages').scrollTop($('#messages')[0].scrollHeight);
