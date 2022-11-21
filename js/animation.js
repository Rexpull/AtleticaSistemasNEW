const carrossel = document.querySelector('.carrossel');
carrossel.classList.remove('animate__zoomIn');

// Create the observer, same as before:
const observercarrossel = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        carrossel.classList.add('animate__zoomIn');
      return;
    }

    carrossel.classList.remove('animate__zoomIn');
  });
});

observercarrossel.observe(document.querySelector('.carrossel'));





const diretoria = document.querySelector('.swiper-diretoria');
diretoria.classList.remove('animate__bounceIn');

// Create the observer, same as before:
const observerdiretoria = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        diretoria.classList.add('animate__bounceIn');
      return;
    }

    diretoria.classList.remove('animate__bounceIn');
  });
});

observerdiretoria.observe(document.querySelector('.swiper-diretoria'));





const atletica = document.querySelector('.atletica');
atletica.classList.remove('animate__bounceInLeft');

// Create the observer, same as before:
const observeratletica = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        atletica.classList.add('animate__bounceInLeft');
      return;
    }

    atletica.classList.remove('animate__bounceInLeft');
  });
});

observeratletica.observe(document.querySelector('.atletica'));




const rodape = document.querySelector('.home_rodape');
rodape.classList.remove('animate__slideInUp');

// Create the observer, same as before:
const observerrodape = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        rodape.classList.add('animate__slideInUp');
      return;
    }

    rodape.classList.remove('animate__slideInUp');
  });
});

observerrodape.observe(document.querySelector('.home_rodape'));




const rodapetext = document.querySelector('.about-background');
rodapetext.classList.remove('animate__jackInTheBox');

// Create the observer, same as before:
const observerrodapetext = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
        rodapetext.classList.add('animate__jackInTheBox');
      return;
    }

    rodapetext.classList.remove('animate__jackInTheBox');
  });
});

observerrodapetext.observe(document.querySelector('.about-background'));