const membrosCollection = firebase.firestore().collection("membros");
membrosCollection.get().then((querySnapshot) => {
  querySnapshot.docs.forEach((doc) => {
    const json = doc.data();

    const template = document.querySelector("#membrosCardsTemplate");
    const copy = template.content.cloneNode(true);
    copy.querySelector("#fotoPerfil").src = json.imagem;
    copy.querySelector(".name-dir .name").innerHTML = json.nome;
    copy.querySelector(".name-dir .nickname").innerHTML = json.apelido;
    copy.querySelector(".name-dir .description").innerHTML = json.cargo;
    copy.querySelector("a.rede-button").href = json.link;
    template.parentNode.appendChild(copy);
  });

  setTimeout(() => {
    $(".toast-enable").click(() => {
      Toastify({
        text: "Item adicionado!",
        duration: 3000,
        gravity: "bottom",
        position: "right",
        close: true,
        style: {
          background: bgColors[i % 2],
        },
      }).showToast();
      i++;
    });
  }, 500);

  var swiper = new Swiper(".slide-content", {
    slidesPerView: 3,
    spaceBetween: 125,
    loop: true,
    loopedSlides: 0,
    loopedSlidesLimit: false,
    centerSlide: "true",
    fade: "true",
    grabCursor: "true",
    effect: "card",
    loopFillGroupWithBlank: true,
    centeredSlidesBounds: true,
    watchSlidesProgress: true,
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2,
      slideShadows: true,
    },

    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      520: {
        slidesPerView: 2,
      },
      950: {
        slidesPerView: 3,
      },
    },
  });

  VanillaTilt.init(
    document.querySelectorAll(".swiper-diretoria .swiper-slide"),
    {
      max: 20,
      speed: 400,
      glare: true,
      "max-glare": 0.3,
      gyroscopeMaxAngleZ: 0,
      gyroscopeMinAngleZ: 0,
    }
  );
});

const produtosCollection = firebase.firestore().collection("produtos");
produtosCollection.get().then((querySnapshot) => {
  window.produtosDisponiveis = {};
  querySnapshot.docs.forEach((doc, index) => {
    const id = doc.id;
    const json = doc.data();
    window.produtosDisponiveis[id] = json;

    const template = document.querySelector("#produtosCardsTemplate");
    const copy = template.content.cloneNode(true);
    copy.querySelector(".card-3d").style.setProperty("--i", index + 1);
    copy
      .querySelector(".card-3d")
      .style.setProperty("--card-amount", querySnapshot.docs.length);
    copy.querySelector(".card-3d-img img").src = json.imagem;
    copy.querySelector(".card-3d-title").innerHTML = json.nome;
    // copy.querySelector('').innerHTML = json.preco;
    copy.querySelector(".link_wrapper button").onclick = () =>
      adicionarAoCarrinho(id);
    template.parentNode.appendChild(copy);
  });
});
