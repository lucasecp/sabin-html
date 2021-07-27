  /*  CARROSSEL PRINCIPAL */
  if(document.querySelector('.carrossel-principal')){
    let slideOptions = JSON.parse(document.querySelector(`.carrossel-principal`).getAttribute('carrossel-options'));
    let scrollAutomatico = slideOptions && Object.keys(slideOptions).indexOf('scrollAutomatico') !== -1 ? slideOptions.scrollAutomatico : false
    let tempo = slideOptions && Object.keys(slideOptions).indexOf('tempo') !== -1 ? slideOptions.tempo : 3000
    let tempoTransicao = slideOptions && Object.keys(slideOptions).indexOf('tempoTransicao') !== -1 ? Number(slideOptions.tempoTransicao) : 0.5
    let pauseOnHover = slideOptions && Object.keys(slideOptions).indexOf('pausarNoHover') !== -1 ? slideOptions.pausarNoHover : false
    let slideContainer = '.carrossel-principal .carrossel-splide';
     hasOneItemSlide(slideContainer)  
    new Splide( slideContainer, {
      type: scrollAutomatico ? 'loop' : 'slide',
      autoplay: scrollAutomatico || false,
      interval:  tempo || 3000 ,
      pauseOnHover: pauseOnHover,
      speed: tempoTransicao || 1000,
      perPage:1,
    } ).mount();
}
function hasOneItemSlide(slideContainer){
    const item = document.querySelectorAll(`${slideContainer} .splide__list > li`).length;
    if(item === 1) document.querySelector(`${slideContainer} `).classList.add('cancel-carrossel');
}

/* MAIS BUSCADOS */
if(document.querySelector('.sabin-mais-buscados')){
  let slideOptions = JSON.parse(document.querySelector(`.sabin-mais-buscados`).getAttribute('carrossel-options'));
  let scrollAutomatico = slideOptions && Object.keys(slideOptions).indexOf('scrollAutomatico') !== -1 ? slideOptions.scrollAutomatico : false
  let tempo = slideOptions && Object.keys(slideOptions).indexOf('tempo') !== -1 ? slideOptions.tempo : 3000
  let tempoTransicao = slideOptions && Object.keys(slideOptions).indexOf('tempoTransicao') !== -1 ? Number(slideOptions.tempoTransicao) : 0.5
  let pauseOnHover = slideOptions && Object.keys(slideOptions).indexOf('pausarNoHover') !== -1 ? slideOptions.pausarNoHover : false
  let slideContainer = '.carrossel-sabin-mais-buscados';
  hasOneItemSlide(slideContainer)
  new Splide(slideContainer, {
      rewind: true,
      autoplay: scrollAutomatico || false,
      interval:  tempo || 3000 ,
      pauseOnHover: pauseOnHover,
      speed: tempoTransicao || 1000,
      perPage: 4,
      perMove: 4,
      focus: 'start',
      breakpoints: {
          1100: {
              perPage: 3, 
              perMove: 3,
          },
          767:{
              perPage: 2,
              perMove: 2,
          },
          500: {
              perPage: 1,
              perMove: 1,
          }
      },
  } ).mount();
}

/* QUEM SOMOS */
if(document.querySelector('.quem-somos')){
    let slideOptions = JSON.parse(document.querySelector(`.quem-somos`).getAttribute('carrossel-options'));
    let scrollAutomatico = slideOptions && Object.keys(slideOptions).indexOf('scrollAutomatico') !== -1 ? slideOptions.scrollAutomatico : false
    let tempo = slideOptions && Object.keys(slideOptions).indexOf('tempo') !== -1 ? slideOptions.tempo : 3000
    let tempoTransicao = slideOptions && Object.keys(slideOptions).indexOf('tempoTransicao') !== -1 ? Number(slideOptions.tempoTransicao) : 0.5
    let pauseOnHover = slideOptions && Object.keys(slideOptions).indexOf('pausarNoHover') !== -1 ? slideOptions.pausarNoHover : false
    let slideContainer = '.carrossel-quem-somos';
    hasOneItemSlide(slideContainer)
    new Splide(slideContainer, {
        rewind: true,
        autoplay: scrollAutomatico || false,
        interval:  tempo || 3000 ,
        pauseOnHover: pauseOnHover,
        speed: tempoTransicao || 1000,
        destroy: true,
        focus: 'start',
        breakpoints: {
            767:{
                perPage: 1,
                perMove: 1,
            },
            500:{
                autoWidth: true,
            },
        },
    } ).mount();
  
  }

/* O SABIN */
if(document.querySelector('.o-sabin')){
    let slideOptions = JSON.parse(document.querySelector(`.o-sabin`).getAttribute('carrossel-options'));
    let scrollAutomatico = slideOptions && Object.keys(slideOptions).indexOf('scrollAutomatico') !== -1 ? slideOptions.scrollAutomatico : false
    let tempo = slideOptions && Object.keys(slideOptions).indexOf('tempo') !== -1 ? slideOptions.tempo : 3000
    let tempoTransicao = slideOptions && Object.keys(slideOptions).indexOf('tempoTransicao') !== -1 ? Number(slideOptions.tempoTransicao) : 0.5
    let pauseOnHover = slideOptions && Object.keys(slideOptions).indexOf('pausarNoHover') !== -1 ? slideOptions.pausarNoHover : false
    let slideContainer = '.carrossel-o-sabin';
    hasOneItemSlide(slideContainer)
    new Splide(slideContainer, {
        rewind: true,
        autoplay: scrollAutomatico || false,
        interval:  tempo || 3000 ,
        pauseOnHover: pauseOnHover,
        speed: tempoTransicao || 1000,
        destroy: true,
        focus: 'start',
        autoWidth: true,
        breakpoints: {
            767:{
                perPage: 1,
                perMove: 1,
            },
        },
    } ).mount();
  
  }

/* NOSSA HISTÓRIA*/
if(document.querySelector('.nossa-historia')){
    let slideOptions = JSON.parse(document.querySelector(`.nossa-historia`).getAttribute('carrossel-options'));
    let scrollAutomatico = slideOptions && Object.keys(slideOptions).indexOf('scrollAutomatico') !== -1 ? slideOptions.scrollAutomatico : false
    let tempo = slideOptions && Object.keys(slideOptions).indexOf('tempo') !== -1 ? slideOptions.tempo : 3000
    let tempoTransicao = slideOptions && Object.keys(slideOptions).indexOf('tempoTransicao') !== -1 ? Number(slideOptions.tempoTransicao) : 0.5
    let pauseOnHover = slideOptions && Object.keys(slideOptions).indexOf('pausarNoHover') !== -1 ? slideOptions.pausarNoHover : false
    let slideContainer = '.carrossel-nossa-historia';
    hasOneItemSlide(slideContainer)
    new Splide(slideContainer, {
        rewind: true,
        autoplay: scrollAutomatico || false,
        interval:  tempo || 3000 ,
        pauseOnHover: pauseOnHover,
        speed: tempoTransicao || 1000,
        focus: 'start',
        perPage: 3,
        perMove: 3,
        autoWidth: true,
        breakpoints: {
            767:{
                perPage: 1,
                perMove: 1,
            },
        },
    } ).mount();
  
  }
