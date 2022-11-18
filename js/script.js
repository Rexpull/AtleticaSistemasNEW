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


  setTimeout(()=>{
    that.swiper.loopDestroy();
    that.swiper.loopCreate();
    console.log('reborn!')
  })

  var swiper = new Swiper(".slide-content-atletica", {
    slidesPerView: 3,
    spaceBetween: 1,
    loopedSlides:6,
    loopFillGroupWithBlank:true,
    centerSlide:'true',
    fade:'true',
    grabCursor:'true',
    effect:'card',
    preventClicks:true,
    rewind:true,
    coverflowEffect:{
      rotate:0,
      stretch: 0,
      depth:100,
      modifier: 2,
      slideShadows:true,
      
    },

   
  });