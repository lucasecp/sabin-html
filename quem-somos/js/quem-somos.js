import Carrossel from "./carrossel.js";

const options = {
    mediaQuery:{
        200:{
            perPage: 1,
        },
        767:{
            perPage: 3,
            
        }
    }
}
$(window).ready(()=>{
    cancelCarrosselOnDesktop()
   const carrosselQuemSomos =  new Carrossel('.quem-somos',options);
   carrosselQuemSomos.init()
})

function cancelCarrosselOnDesktop(){
    const media = window.matchMedia('(min-width: 768px)').matches;
    if(media){ 
        $('.quem-somos [data-carrossel="container"] ').addClass('cancel-carrossel')
        $('.quem-somos [data-carrossel="container"].cancel-carrossel').off('mousemove')
       }
    else $('.quem-somos [data-carrossel="container"] ').removeClass('cancel-carrossel');
}
$(window).resize(cancelCarrosselOnDesktop)