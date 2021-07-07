import Carrossel from "./carrossel.js";
const options = {
    mediaQuery:{
        768:{
            perPage: 1,
        },
        200:{
            perPage: 1,
            marginLeft: 10
        }
    }
}
if($('.carrossel-principal').length) new Carrossel('.carrossel-principal',options).init();