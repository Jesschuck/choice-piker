const tagsEl = document.getElementById('tags')
const textarea = document.getElementById('textarea')

//O cursor é colocado no textarea assim que a página é carregada.
textarea.focus()

/* addEventListener é adicionado ao textarea para o evento de tecla liberada (keyup). 
Quando uma tecla é liberada, a função anônima é chamada, que realiza as seguintes ações:
- Chama a função createTags passando o valor atual do textarea.
- Se a tecla pressionada for 'Enter', limpa o textarea após 10 milissegundos (usando setTimeout) e chama a função randomSelect. */
textarea.addEventListener('keyup', (e) => {
  createTags(e.target.value)

  if (e.key === 'Enter') {
    setTimeout(() => {
      e.target.value = ''
    }, 10)

    randomSelect()
  }
})

/*Recebe um input (string), que contém tags separadas por vírgulas. 
Remove espaços em branco desnecessários e cria elementos span para cada tag. 
Esses elementos span são adicionados ao elemento com o ID 'tags' no HTML. */
function createTags(input) {
  const tags = input
    .split(',')
    .filter((tag) => tag.trim() !== '')
    .map((tag) => tag.trim())

  tagsEl.innerHTML = ''

  tags.forEach((tag) => {
    const tagEl = document.createElement('span')
    tagEl.classList.add('tag')
    tagEl.innerText = tag
    tagsEl.appendChild(tagEl)
  })
}

/*Realiza uma animação de destaque aleatório entre as tags. 
Durante um intervalo de tempo, escolhe aleatoriamente uma tag, a destaca e, após 100 milissegundos, remove o destaque. 
Este processo é repetido várias vezes */
function randomSelect() {
  const times = 30

  const interval = setInterval(() => {
    const randomTag = pickRandomTag()

    highlightTag(randomTag)

    setTimeout(() => {
      unHighlightTag(randomTag)
    }, 100)
  }, 100)

  setTimeout(() => {
    clearInterval(interval)

    setTimeout(() => {
      const randomTag = pickRandomTag()

      highlightTag(randomTag)
    }, 100)
  }, times * 100)
}

//Retorna uma tag HTML aleatória do conjunto de tags existentes.
function pickRandomTag() {
  const tags = document.querySelectorAll('.tag')
  return tags[Math.floor(Math.random() * tags.length)]
}

//Adiciona ou remove a classe 'highlight' de uma tag específica que é usada para dar o destaque visual à tag escolhida.
function highlightTag(tag) {
  tag.classList.add('highlight')
}

function unHighlightTag(tag) {
  tag.classList.remove('highlight')
}
