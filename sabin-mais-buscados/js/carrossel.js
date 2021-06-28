class Carrossel {
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
    }
    init(){
        this.bindEvents()
        this.transition(true)
        this.events()
        this.createNavigation()
        this.createGroupSlide()
        this.slideConfig()
        this.handleChangeAcive(this.index)
    }
    transition(active){
        active ? this.container.css('transition' ,'transform .5s') : this.container.css('transition' ,'none')
        console.log(active);
    }
    handleNextSlide(){
        this.index += 1;
      if(this.index > this.groupSlide.length - 1)  return this.handleChangeAcive(this.groupSlide.length - 1);
      this.handleChangeAcive(this.index)
    }
    handlePrevSlide(){
        if(this.index <= 0) return this.handleChangeAcive(0)
        this.index -= 1;
        this.handleChangeAcive(this.index)
    }
    handleLink(event){
        this.index = event.target.getAttribute(`data-link-${this.carrosselName.replace('.','')}`);
        this.handleChangeAcive(this.index)
    }
    updatePosition(clientX){
       this.dist.moviment = (this.dist.start - clientX )* 1.2;
       return this.dist.final - this.dist.moviment
    }
    moveSlide(distX){
       this.dist.movePosition = distX;
       this.container.css('transform', `translate3d(${distX}px,0,0)`);
    } 
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
    MouseMove(event){
        this.transition(false)
        const eventPosition = event.type === 'mousemove'? event.clientX : event.changedTouches[0].clientX
        const finalPosition = this.updatePosition(eventPosition)
        
       this.moveSlide(finalPosition)
    }
    MouseUp(event){
        const moveType = event.type === 'mouseup' ? 'mousemove': 'touchmove'
        this.dist.final = this.dist.movePosition
        this.container.off(moveType)
        this.transition(true)
        this.changeSlideOnUp()
    }
    changeSlideOnUp(){
      
        if(this.dist.moviment > 120 ){
            this.handleNextSlide()
        } else if(this.dist.moviment < -120 ){
            this.handlePrevSlide()
        }
        else this.handleChangeAcive(this.index)
    }
    events(){
        this.btnNext.click(this.handleNextSlide);
        this.btnPrev.click(this.handlePrevSlide);
        this.links.forEach(el => el.click(this.handleLink));
        this.container.mousedown(this.MouseDown);
        this.container.mouseup(this.MouseUp);
        this.container.on('touchstart',this.MouseDown)
        this.container.on('touchend',this.MouseUp)

    }
    handleChangeAcive(index){
        this.index = index
        this.links.forEach(function (el) {el.removeClass('active-link')});
        this.links[index].addClass('active-link');
        this.groupSlide.forEach(function (el) {el.el.removeClass('active-slide')});
        this.groupSlide[index].el.addClass('active-slide');
        this.moveSlide(this.groupSlide[index].position)
        this.dist.final = this.groupSlide[index].position
    }
    createNavigation(){
        const nav = $('<nav></nav>')
        this.container.after(nav)
        this.perPage = this.options && this.options.perPage ? this.options.perPage : 4
        
       for(let i = 0; i < Math.ceil(this.item.length /this.perPage); i++){
           const a =$(`<a href="#" data-link-${this.carrosselName.replace('.','')}=${i} class='link-${this.carrosselName.replace('.','')}'></a>`);
           nav.append(a);
           this.links.push(a)
       }
       this.links[this.index].addClass('active-link')
    }
    createGroupSlide(){

        let j = 0
    
       for(let i = 1; i <= Math.ceil(this.item.length /this.perPage); i++){
        const ul = $('<ul></ul>');

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
    }
    slideConfig(){
        this.groupSlide = this.groupSlide.map(el=>{
            return{ el, position: this.positionSlide(el) }
        })
    }
    positionSlide(slide){
        const c = $(window)
       const margin = (c.outerWidth() - slide.outerWidth()) / 2;
       return -(slide.offset().left - margin)
    }
   
    bindEvents(){
       this.handleNextSlide = this.handleNextSlide.bind(this);
       this.handlePrevSlide = this.handlePrevSlide.bind(this);
       this.handleLink = this.handleLink.bind(this);
       this.MouseDown = this.MouseDown.bind(this)
       this.MouseMove = this.MouseMove.bind(this)
       this.MouseUp = this.MouseUp.bind(this)
    }
}

new Carrossel('.sabin-mais-buscados',{perPage: 4}).init();
