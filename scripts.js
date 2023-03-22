// Gerar Cores Aleatórias
const generateColor = () => {
  const r = parseInt(Math.random() * 255, 0);
  const g = parseInt(Math.random() * 255, 0);
  const b = parseInt(Math.random() * 255, 0);

  return `rgb(${r}, ${g}, ${b})`;
};

// Captura de Elementos
const btnRandomColor = document.getElementById('button-random-color');
const randomColor = document.querySelectorAll('.color');
const pixelBoard = document.getElementById('pixel-board');
const btnClearBoard = document.getElementById('clear-board');

// Atribuição das cores a paleta, ao iniciar, para não iniciarem com cor branca
randomColor[0].style.background = 'black';
randomColor[0].classList.add('selected');
randomColor[1].style.background = 'red';
randomColor[2].style.background = 'green';
randomColor[3].style.background = 'blue';

// Função para percorrer toda paleta de cores e salvar as cores em um array
function newColor() {
  const arrayColor = [];
  for (let index = 0; index < randomColor.length; index += 1) {
    if (index === 0) {
      randomColor[index].style.background = 'black';
      arrayColor.push('black');
    } else {
      const color = generateColor();
      randomColor[index].style.background = color;
      arrayColor.push(color);
    }
  }
  localStorage.setItem('colorPalette', JSON.stringify(arrayColor));
}

// Evento do Botão Cores Aleatórias
btnRandomColor.addEventListener('click', newColor);

// Criação do quadro de Pixel
const createPixel = (value) => {
  for (let index = 0; index < value; index += 1) {
    const divFora = document.createElement('div');
    pixelBoard.appendChild(divFora);
    for (let index2 = 0; index2 < value; index2 += 1) {
      const divsPixels = document.createElement('div');
      divsPixels.classList.add('pixel');
      divFora.appendChild(divsPixels);
    }
  }
};

createPixel(5);

// Selecionar Cor da Paleta
const selectedColor = () => {
  const paletColor = document.getElementsByClassName('color');
  for (let index = 0; index < paletColor.length; index += 1) {
    paletColor[index].addEventListener('click', (event) => {
      const colorSelected = document.querySelector('.selected');
      if (colorSelected) {
        colorSelected.classList.remove('selected');
      }
      event.target.classList.add('selected');
    });
  }
};

selectedColor();

// Aplica cor selecionada no Pixel
const applyColor = () => {
  const pixelColor = document.getElementsByClassName('pixel');

  for (let index = 0; index < pixelColor.length; index += 1) {
    pixelColor[index].addEventListener('click', (event) => {
      const colorSelected = document.querySelector('.selected');
      if (colorSelected) {
        const pixel = event.target;
        pixel.style.background = colorSelected.style.background;
      }
    });
  }
};

applyColor();

// Limpa os pixel para branco
const clearBoard = () => {
  const pixelColor = document.getElementsByClassName('pixel');

  for (let index = 0; index < pixelColor.length; index += 1) {
    pixelColor[index].style.background = 'white';
  }
};

btnClearBoard.addEventListener('click', clearBoard);

// Recarrega Página e Aplica o LocalStorage a Paleta
window.onload = function reload() {
  const palet = JSON.parse(localStorage.getItem('colorPalette'));
  if (palet) {
    for (let index = 1; index < palet.length; index += 1) {
      randomColor[index].style.backgroundColor = palet[index];
    }
  } else {
    newColor();
  }
};

// Salva os pixels coloridos
function artStorage() {
  const pixelColor = document.getElementsByClassName('pixel');
  const colorsPicture = [];
  for (let index = 0; index < pixelColor.length; index += 1) {
    colorsPicture.push(pixelColor[index].style.backgroundColor);
  }
  localStorage.setItem('pixelBoard', JSON.stringify(colorsPicture));
}

// Carrega os pixels coloridos
function loadPictureStorage() {
  const colors = JSON.parse(localStorage.getItem('pixelBoard'));
  const pixelColor = document.getElementsByClassName('pixel');
  if (colors && colors.length === pixelColor.length) {
    for (let index = 0; index < pixelColor.length; index += 1) {
      pixelColor[index].style.background = colors[index];
    }
  }
}

loadPictureStorage();

// Colore os pixels
function fillPixel(pixel) {
  const currentPixel = pixel;
  currentPixel.style.backgroundColor = selectedColor;
  artStorage();
}

pixelBoard.addEventListener('click', (event) => {
  if (event.target.classList.contains('pixel')) {
    fillPixel(event.target);
  }
});
