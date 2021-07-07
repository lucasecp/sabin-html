export default class Carrossel {
    constructor(carrosselName, options){
        this.carrosselName = carrosselName
        this.container =  $(`${carrosselName}  [data-carrossel="container"]`);
        this.btnNext = $(`${carrosselName} [data-carrossel="right"]`);
        this.btnPrev = $(`${carrosselName} [data-carrossel="left"]`);
        this.item = $(`${carrosselName} [data-carrossel="container"] > *`);
        this.options = options;
        this.index = 0;
        this.links = [];
        this.groupSlide  = [];
        this.dist = {start: 0, final : 0 , moviment: 0}
        this.perPage = this.options && this.options.perPage ? this.options.perPage : 4
        
    }
    transition(active){
        active ? this.container.css('transition' ,`${this.slideOptions.tempoTransicao}s transform`) : this.container.css('transition' ,'none')
        
    }
    //passar para o próximo slide 
    handleNextSlide(){
        this.index += 1;
        if(this.index > this.groupSlide.length - 1)  return this.handleChangeAcive(this.groupSlide.length - 1);
        this.handleChangeAcive(this.index)
    }
    // passar para o slide anterior
    handlePrevSlide(){
        if(this.index <= 0) return this.handleChangeAcive(0)
        this.index -= 1;
        this.handleChangeAcive(this.index)
    }
    // definir o index de acordo com o link clicado
    handleLink(event){
        event.preventDefault()
        this.index = Number(event.target.getAttribute(`data-carrossel-link${this.carrosselName.replace('.','')}`));
        this.handleChangeAcive(this.index)
        
    }
    // atualizar posição a cada movimento do mouse ou dedo
    updatePosition(clientX){
        this.dist.moviment = (this.dist.start - clientX )* 1.2;
        return this.dist.final - this.dist.moviment
    }
    // movimentando o slide a partir do cálculo da posição
    moveSlide(distX){
        this.dist.movePosition = distX;
        this.container.css('transform', `translate3d(${distX}px,0,0)`);
    } 
    // pegando a posição do mouse ao clicar 
    MouseDown(event){
        if(event.type === 'mousedown'){
            event.preventDefault()
            this.dist.start = event.clientX;
            this.container.mousemove(this.MouseMove);
        }
        else{ this.dist.start = event.changedTouches[0].clientX;
            this.container.on('touchmove',this.MouseMove);
        }
        
    } 
    //movendo o slide
    MouseMove(event){
        this.transition(false)
        const eventPosition = event.type === 'mousemove'? event.clientX : event.changedTouches[0].clientX
        const finalPosition = this.updatePosition(eventPosition)
        
        this.moveSlide(finalPosition)
    }
    // peagando a posição ao soltar o mouse e removendo o evento de mover 
    MouseUp(event){
        const moveType = event.type === 'mouseup' ? 'mousemove': 'touchmove'
        this.dist.final = this.dist.movePosition
        this.container.off(moveType)
        this.transition(true)
        this.changeSlideOnUp()
    }
    // mudando o slide a partir de um determinado movimento
    changeSlideOnUp(){
        
        if(this.dist.moviment > 120 ){
            this.handleNextSlide()
        } else if(this.dist.moviment < -120 ){
            this.handlePrevSlide()
        }
        else this.handleChangeAcive(this.index)
    }
    // alterando o index e classes do slide ativo
    handleChangeAcive(index){
        this.index = index
        this.links.forEach(function (el) {el.removeClass('active-link')});
        this.links[index].addClass('active-link');
        const activeSlide = this.groupSlide[index];
     
        this.groupSlide.forEach(function (el) {
            if(el.el === undefined) return
            el.el.classList.remove('active-slide')
        });
        activeSlide.el.classList.add('active-slide');
        this.moveSlide(activeSlide.position)
        this.dist.final = activeSlide.position;
        
    }
    // criando a navegação de acordo com a quantidade de items no slide 
    createNavigation(){
        this.links = []
        const hasNav = $(`${this.carrosselName} [data-carrossel='nav']`)
        const nav = $('<nav></nav>')
        nav.attr('data-carrossel','nav')
        hasNav.each(function(e){
            $(this).remove()
        } )
        this.container.after(nav)
        
        for(let i = 0; i < Math.ceil(this.item.length /this.perPage); i++){
            const a =$(`<a  data-carrossel-link${this.carrosselName.replace('.','')}=${i} class='link-${this.carrosselName.replace('.','')}'></a>`);
            nav.append(a);
            this.links.push(a)
        }
        this.links.forEach(el => el.click(this.handleLink));
        
    }
    // criando o grupo de items de acordo com a quantidade de items por página passado
    createGroupSlide(){
        this.groupSlide = []
        let j = 0
        const items = this.item
        const children =$(`${this.carrosselName}  [data-carrossel="container"] > ul[data-carrossel='item']`)
        if(children.length){
            
            children.each(function (){
                $(this).remove()
            })
            
        }
        for(let i = 1; i <= Math.ceil(this.item.length /this.perPage); i++){
            const ul = $('<ul></ul>');
            
            ul.attr('data-carrossel','item')
            //No segundo laço , passe pro próximo grupo do item
            if(i >= 2) { 
                j = this.perPage * (i - 1)
                
            }
            for(let index = 0 ; index <  this.perPage; index++){
                ul.append(this.item[j])
                j++
            }
            
            this.groupSlide.push(ul)
            
            this.container.append(ul)
        }
        
        this.copySlide()
        
    }
    copySlide(){
        // copiando o primeiro e segundo slide 
        const lastClone = this.groupSlide[Math.ceil(this.item.length /this.perPage) - 1].el ? this.groupSlide[Math.ceil(this.item.length /this.perPage) - 1].el.cloneNode() : this.groupSlide[this.groupSlide.length -1].clone()
        const firstClone = this.groupSlide[0].el ? this.groupSlide[0].el.cloneNode() : this.groupSlide[0].clone()
        if(this.groupSlide[Math.ceil(this.item.length /this.perPage) -1].el)  {
            lastClone.setAttribute('id','last-clone')
            firstClone.setAttribute('id','first-clone')
            this.container.prepend(lastClone)
            this.container.append(firstClone)
        }
        else  {
            lastClone.attr('id','last-clone')
            firstClone.attr('id','first-clone')
            lastClone.prependTo(this.container)
            firstClone.appendTo(this.container)
        }

          this.groupSlide.push(lastClone)
          this.groupSlide.unshift(firstClone)
    }
    automaticSlide(){
        setInterval(()=>{
            this.handleNextSlide()
        },this.slideOptions.tempo)
    }
    customSlide(){
        this.slideOptions = JSON.parse($(`${this.carrosselName}`).attr('carrossel-options'));
        this.slideOptions.scrollAutomatico = this.slideOptions && Object.keys(this.slideOptions).indexOf('scrollAutomatico') !== -1 ? this.slideOptions.scrollAutomatico : false
        this.slideOptions.tempo = this.slideOptions && Object.keys(this.slideOptions).indexOf('tempo') !== -1 ? this.slideOptions.tempo : 3000
        this.slideOptions.tempoTransicao = this.slideOptions && Object.keys(this.slideOptions).indexOf('tempoTransicao') !== -1 ? Number(this.slideOptions.tempoTransicao) : 0.5
        // if(this.slideOptions.scrollAutomatico) //return this.automaticSlide()
    }
    // definindo cada item a sua posição em relação a esquerda 
    slideConfig(){
        this.groupSlide = Array.from(this.container.children()).map((el)=>{
            return  { el, position: this.positionSlide(el) } 
        })
    }
    // valor de cada slide e deixar centralizado
    positionSlide(slide){
        const wind = $(window)
        const margin = this.marginLeft   || (wind.outerWidth() - $(slide).outerWidth()) /2;
        return -($(slide).offset().left - Number(margin ))
    }
    events(){
        this.btnNext.click(this.handleNextSlide);
        this.btnPrev.click(this.handlePrevSlide);
        this.container.mousedown(this.MouseDown);
        this.container.mouseup(this.MouseUp);
        this.container.on('touchstart',this.MouseDown)
        this.container.on('touchend',this.MouseUp)
        this.windowEvent()
    }
    onResize(){
        
        setTimeout(() => {
            
            this.mediaQuery()
            this.slideConfig()
            this.handleChangeAcive(0)
            
        }, 1000);
    }
    windowEvent(){
        $(window).resize(this.onResize)
        
    }
    bindEvents(){
        this.handleNextSlide = this.handleNextSlide.bind(this);
        this.handlePrevSlide = this.handlePrevSlide.bind(this);
        this.handleLink = this.handleLink.bind(this);
        this.MouseDown = this.MouseDown.bind(this)
        this.MouseMove = this.MouseMove.bind(this)
        this.MouseUp = this.MouseUp.bind(this)
        this.onResize = this.onResize.bind(this)
    }
    init(){
        this.bindEvents()
        this.customSlide()
        this.transition(true)
        this.mediaQuery()
        this.events()
       this.slideConfig()
       this.handleChangeAcive(this.index)
    }
    mediaQuery(){
        const mediaOpt = Object.keys(this.options.mediaQuery);
       
        for(let i= 0 ; i< mediaOpt.length;i++){
            const media = window.matchMedia(`(min-width:${String(mediaOpt[i])}px)`).matches;
            const {perPage} = this.options.mediaQuery[mediaOpt[i]];
            const {marginLeft} = this.options.mediaQuery[mediaOpt[i]];
            
            if(media && perPage){
                this.perPage = perPage;
                this.createGroupSlide();
                this.createNavigation();
                if(marginLeft >=0) this.marginLeft = marginLeft
                else this.marginLeft = ''
            }

            
        }
    }

}



