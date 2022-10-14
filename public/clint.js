const socket = io()
let name
let messageArea = document.querySelector('.massages')

let textArea = document.querySelector('#input')
do {
  name = prompt('please enter your name: ')
} while (!name)

textArea.addEventListener('keyup', (e) => {
  if (e.key == 'Enter') {
    sendMessage(e.target.value)
  }
})

function sendMessage(msg) {
  let masg = {
    user: name,
    message: msg.trim(),
  }
  //Append
  appendMessage(masg, 'ingoing')
  textArea.value = ''
  scrollToBottom()
  //send to server
  socket.emit('message', masg)
}

function appendMessage(msg, type) {
  let mainDiv = document.createElement('div')
  let className = type
  mainDiv.classList.add(className)

  let markupp = `
<h4>${msg.user}</h4>
<p>${msg.message}</p>
`
  mainDiv.innerHTML = markupp
  messageArea.appendChild(mainDiv)
}

//recevie message

socket.on('message', (msg) => {
  appendMessage(msg, 'outgoing')
  scrollToBottom()
})

function scrollToBottom() {
  messageArea.scrollTop = messageArea.scrollHeight
}
