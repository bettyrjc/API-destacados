var arr= new Array();
var elemento;
(async function load() {

async function getdatos(url){
  const responde = await fetch(url);
  const data = await responde.json();
  arr = data.results;
  return data;
}

function template(results, i){
  return(
  `<div class="box" id="${i}">
      <img src="${results.picture.large}" alt="">
      <p><strong>Nombre:</strong> ${results.name.first} </p>
      <p><strong>Apellido:</strong> ${results.name.last}</p>
      <p><strong>Ciudad:</strong> ${results.location.city}</p>
    </div>
    `
  )
}
const $container = document.getElementById('container');
const $modal = document.getElementById('modal');
const $overlay = document.getElementById('overlay');
const $hide = document.getElementById('hide-modal')
const $modalTitle = $modal.querySelector('h2')
const $modalImage = $modal.querySelector('img')
const $modalDescription = $modal.querySelector('p')

function clickealo($element){
  console.log($element);
  $element.addEventListener('click', ()=>{
    showModal($element)
  })
}
const randomUsername = await getdatos('https://randomuser.me/api/?results=9');

console.log(randomUsername);


function createTemplate (HTMLString){
  const html = document.implementation.createHTMLDocument();
  html.body.innerHTML = HTMLString;
  return html.body.children[0];
}

function item(i){
    const user = randomUsername.results[i];
    console.log(user)
}

randomUsername.results.forEach((result, items)=>{// objeto, indice
  const HTMLString = template(result,items);
  const contenedor = createTemplate (HTMLString);
  $container.append(contenedor);
  clickealo(contenedor)
  })


function showModal($element){
  $overlay.classList.add('active');
  $modal.style.animation = 'modalIn .8s forwards';

  const id = parseInt($element.id);
  console.log(arr[id])

   $modalImage.setAttribute('src', arr[id].picture.large);
   $modalTitle.textContent = `Nombre: ${arr[id].name.first} ${arr[id].name.last}`;
   $modalDescription.textContent = `Email: ${arr[id].email}`;

}

$hide.addEventListener('click', hideModal);
function hideModal() {
  $overlay.classList.remove('active');
  $modal.style.animation='modalOut .8s forwards';
}

})()
