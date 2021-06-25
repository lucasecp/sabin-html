$(document).ready(function(){
    $('a.nav-link + .dropdown-menu').each(function(i){
          this.setAttribute('dropdown-menu', i)
         const currentDropdown = this.getAttribute('dropdown-menu')
         const div = $('<div></div>');
         div.addClass('card-container')
         if($(`[dropdown-menu=${currentDropdown}] .card-largo`) || $(`[dropdown-menu=${currentDropdown}] .card-pequeno`)){
             $(`[dropdown-menu=${currentDropdown}] .card-pequeno`).each((i, ele)=>{
                  div.append(ele)
             })
             $(`[dropdown-menu=${currentDropdown}] .card-largo`).each((i, ele)=>{
               div.append(ele)
          })
             $(`[dropdown-menu=${currentDropdown}]`).append(div)
             
         }
       })

})
 