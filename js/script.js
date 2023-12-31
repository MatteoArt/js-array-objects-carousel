const carouselContainer = document.querySelector(".carousel-container");
const thumbEl = document.querySelector(".thumbnails-container");

const btnLeft = document.getElementById("control-left");
const btnRight = document.getElementById("control-right");

//recupero icone start, stop e reverse
const startEl = document.getElementById("start");
const stopEl = document.getElementById("stop");
const revEl = document.getElementById("reverse");

//imposto un contatore globale con l'indice dell'immagine al momento
//visibile
let globalCounter = 0;
let autoSlider = undefined;

//array di oggetti con dati immagini carosello
const images = [
    {
        image: 'img/01.webp',
        title: 'Marvel\'s Spiderman Miles Morales',
        text: 'Experience the rise of Miles Morales as the new hero masters incredible, explosive new powers to become his own Spider-Man.',
    }, {
        image: 'img/02.webp',
        title: 'Ratchet & Clank: Rift Apart',
        text: 'Go dimension-hopping with Ratchet and Clank as they take on an evil emperor from another reality.',
    }, {
        image: 'img/03.webp',
        title: 'Fortnite',
        text: "Grab all of your friends and drop into Epic Games Fortnite, a massive 100 - player face - off that combines looting, crafting, shootouts and chaos.",
    }, {
        image: 'img/04.webp',
        title: 'Stray',
        text: 'Lost, injured and alone, a stray cat must untangle an ancient mystery to escape a long-forgotten city.',
    }, {
        image: 'img/05.webp',
        title: "Marvel's Avengers",
        text: 'Marvel\'s Avengers is an epic, third-person, action-adventure game that combines an original, cinematic story with single-player and co-operative gameplay.',
    }
];

//ciclo con foreach sull'array di oggetti e creo dinamicamente carosello
images.forEach((element, i) => {
    //creo dinamicamente i container delle img del carousel
    let imageContainer = document.createElement("div");
    imageContainer.classList.add("image-container");
    carouselContainer.append(imageContainer); //aggiungo img container

    //se mi trovo nella prima immagine la rendo subito visibile
    if (i === 0) {
        imageContainer.classList.add("active");
    }

    //recupero url immagine da oggetto
    const url = element.image;

    //creo dinamicamente immagine
    let imgCarousel = document.createElement("img");
    imgCarousel.classList.add("carousel-image");
    imgCarousel.src = url;
    imageContainer.append(imgCarousel); //inserisco immagine dentro image container

    //creo dinamicamente div contenente descrizione
    const descrEl = document.createElement("div");
    descrEl.classList.add("description");

    descrEl.innerHTML = `<h2>${element.title}</h2>
    <p class="txt">${element.text}</p>`;

    imageContainer.append(descrEl);

    /* creo thumbnails item dinamicamente nel container affianco */
    
    const item = document.createElement("div");
    item.classList.add("thumbnails-item");
    item.style.flexBasis = `calc(100% / ${images.length})`;
    item.style.backgroundImage = `url(${element.image})`;
    thumbEl.append(item);


    //creo div in sovrapposizione per fare effetto bordo active
    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    item.append(overlay);
    if (i === 0) {
        overlay.classList.add("overlay-active");
    }

    let overArr = document.querySelectorAll(".overlay");
    let imgCont = document.querySelectorAll(".image-container");

    item.addEventListener("click", function () {
        const overActive = document.querySelector(".overlay-active");
        overActive.classList.remove("overlay-active");
        overArr[i].classList.add("overlay-active");
        globalCounter = i;

        let imgActive = document.querySelector(".image-container.active");
        imgActive.classList.remove("active");
        imgCont[i].classList.add("active");
    })
});

btnRight.addEventListener("click", function () {
    //recupero tutti i div container delle immagini
    let arrNode = document.querySelectorAll(".image-container");

    //recupero el con bordo colorato
    let thumbArr = document.querySelectorAll(".overlay");

    //accedo all'elemento che ha classe active
    const activeEl = arrNode[globalCounter];
    activeEl.classList.remove("active"); //rimuovo la classe

    const activeThumb = thumbArr[globalCounter];
    activeThumb.classList.remove("overlay-active");

    if (globalCounter === arrNode.length - 1) {
        globalCounter = 0;
    } else {
        //incremento di 1 il contatore globale
        globalCounter++;
    }

    //recupero elemento successivo e aggiungo classe active
    let nextEl = arrNode[globalCounter];
    nextEl.classList.add("active");

    let nextThumb = thumbArr[globalCounter];
    nextThumb.classList.add("overlay-active");
});

btnLeft.addEventListener("click", function () {
    //recupero tutti i div container delle immagini
    let arrNode = document.querySelectorAll(".image-container");

    let thumbArr = document.querySelectorAll(".overlay");

    //accedo all'elemento che ha classe active
    const activeEl = arrNode[globalCounter];
    activeEl.classList.remove("active"); //rimuovo la classe

    const activeThumb = thumbArr[globalCounter];
    activeThumb.classList.remove("overlay-active");

    if (globalCounter === 0) {
        globalCounter = arrNode.length - 1;
    } else {
        globalCounter--;
    }
    

    let nextEl = arrNode[globalCounter];
    nextEl.classList.add("active");

    let nextThumb = thumbArr[globalCounter];
    nextThumb.classList.add("overlay-active");
});

autoSlider = setInterval(autoPlay,3000);

stopEl.addEventListener("click", function () {
    clearInterval(autoSlider);
});

startEl.addEventListener("click", function () {
    //se ci sta già un timer attivo lo fermo
    if (autoSlider !== undefined) {
        clearInterval(autoSlider);
    }

    //faccio partire il timer
    autoSlider = setInterval(autoPlay,3000);
});

revEl.addEventListener("click", function () {
    if (autoSlider !== undefined) {
        clearInterval(autoSlider);
    }

    autoSlider = setInterval(reversePlay,3000);
});

function autoPlay() {
    //recupero tutti i div container delle immagini
    let arrNode = document.querySelectorAll(".image-container");

    //recupero el con bordo colorato
    let thumbArr = document.querySelectorAll(".overlay");

    //accedo all'elemento che ha classe active
    const activeEl = arrNode[globalCounter];
    activeEl.classList.remove("active"); //rimuovo la classe

    const activeThumb = thumbArr[globalCounter];
    activeThumb.classList.remove("overlay-active");

    if (globalCounter === arrNode.length - 1) {
        globalCounter = 0;
    } else {
        //incremento di 1 il contatore globale
        globalCounter++;
    }

    //recupero elemento successivo e aggiungo classe active
    let nextEl = arrNode[globalCounter];
    nextEl.classList.add("active");

    let nextThumb = thumbArr[globalCounter];
    nextThumb.classList.add("overlay-active");
}

function reversePlay() {
    //recupero tutti i div container delle immagini
    let arrNode = document.querySelectorAll(".image-container");

    let thumbArr = document.querySelectorAll(".overlay");

    //accedo all'elemento che ha classe active
    const activeEl = arrNode[globalCounter];
    activeEl.classList.remove("active"); //rimuovo la classe

    const activeThumb = thumbArr[globalCounter];
    activeThumb.classList.remove("overlay-active");

    if (globalCounter === 0) {
        globalCounter = arrNode.length - 1;
    } else {
        globalCounter--;
    }

    let nextEl = arrNode[globalCounter];
    nextEl.classList.add("active");

    let nextThumb = thumbArr[globalCounter];
    nextThumb.classList.add("overlay-active");
}