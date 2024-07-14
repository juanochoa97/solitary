let slideIndex = 0;

function showSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }

    const sliderWidth = document.querySelector('.slider').clientWidth;
    document.querySelector('.slides').style.transform = `translateX(-${slideIndex * sliderWidth}px)`;
}

function prevSlide() {
    slideIndex--;
    showSlide();
}

function nextSlide() {
    slideIndex++;
    showSlide();
}

// Auto reproducciónSS
setInterval(() => {
    slideIndex++;
    showSlide();
}, 5000);

function mostrar(idseccion){
    //ocultar secciones
    var secciones=document.getElementsByTagName('section');
    for (var i=0; i<secciones.length;i++)
    {
        secciones[i].style.display='none';

    }
    //visualisaciones de secciones
    var secciones=document.getElementById(idseccion);
    secciones.style.display="block";
}

  
  