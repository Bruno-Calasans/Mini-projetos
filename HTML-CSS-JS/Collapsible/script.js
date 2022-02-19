
    var btns = document.getElementsByClassName('btn')
    var tamanho = btns.length

    for(var cont=0; cont < tamanho; cont++){

       btns[cont].onclick = function(){

            var content = this.nextElementSibling
            this.classList.toggle("active")
            
            if(content.style.display == 'block'){
                content.style.display = 'none'
                content.style.maxHeight = '0px'

            }else{
                content.style.display = 'block'
                content.style.maxHeight = content.scrollHeight + 'px'

                /*transição para o maxHeight não funcinou se um valor específico for atribuido a esta propriedade */
                
            }

        
        }


    }

   
