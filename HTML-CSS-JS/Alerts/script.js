
var closes = document.getElementsByClassName('closeBtn')
var tamanho = closes.length

// função para colocar event clique em todos os botões de fechar
for(var cont = 0; cont < tamanho; cont++){

    var elementoAtual = closes[cont];

    elementoAtual.onclick = function(){
      
        var div = this.parentElement
        div.style.opacity = 0
        div.style.transition = 'opacity 0.5s'

        setTimeout(function(){div.style.display='none'}, 600)
    
    }
  
}

