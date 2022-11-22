const membrosCollection = firebase.firestore().collection('membros');
membrosCollection.get().then((querySnapshot) => {
    querySnapshot.docs.forEach((doc) => {
        const membroJson = doc.data();

        const template = document.querySelector("#membrosCardsTemplate");
        const copy = template.content.cloneNode(true);
        copy.querySelector('.name-dir .name').innerHTML = membroJson.nome;
        copy.querySelector('.name-dir .nickname').innerHTML = membroJson.apelido;
        copy.querySelector('.name-dir .description').innerHTML = membroJson.cargo;
        template.parentNode.appendChild(copy);
    });

    var swiper = new Swiper(".slide-content", {
        slidesPerView: 3,
        spaceBetween: 125,
        loop: true,
        loopedSlides: 0,
        loopedSlidesLimit: false,
        centerSlide:'true',
        fade:'true',
        grabCursor:'true',
        effect:'card',
        loopFillGroupWithBlank: true,
        centeredSlidesBounds:true,
        watchSlidesProgress:true,
        coverflowEffect:{
          rotate:0,
          stretch: 0,
          depth:100,
          modifier: 2,
          slideShadows:true,
          
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
    
        breakpoints:{
            0: {
                slidesPerView: 1,
            },
            520: {
                slidesPerView: 2,
            },
            950: {
                slidesPerView: 3,
            }
        },
      });

    VanillaTilt.init(document.querySelectorAll(".swiper-diretoria .swiper-slide"), {
        max:20,
        speed:400,
        glare: true,
        "max-glare": 0.3,
        gyroscopeMaxAngleZ:0,
        gyroscopeMinAngleZ:0,
    });
});