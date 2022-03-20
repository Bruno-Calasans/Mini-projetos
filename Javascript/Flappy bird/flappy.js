
    // objeto globais ----------------------------------------------------------
    
    function criarTela(id){

        this.elemento =  document.getElementById(id)
        this.largura = this.elemento.clientWidth
        this.altura = this.elemento.clientHeight
        this.backgroundColor = this.elemento.style.backgroundColor

        this.inserir = function(elemento){
            this.elemento.appendChild(elemento)
        }
    }

    // criando tela
    const tela = new criarTela('tela')

    // criando um objeto score
    function Score(id){

        let elemento = document.getElementById(id)
        this.elemento = elemento
        this.ponto = this.elemento.firstElementChild

        this.getScore = () => Number(this.ponto.innerText)
        this.setScore = (valor) => this.ponto.innerText = valor

        this.aumentarScore = (aumento=1) => {
            this.setScore(this.getScore() + aumento)
        }

        this.diminuirScore = (redução=1) => {
            this.setScore(this.getScore() - redução)
        }

        this.resetar = () => {this.setScore(0)}
    }

    // criando escore
    const score = new Score('score')

    // funções ----------------------------------------------------------------

    // sortear um número aletatório
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    // criar elemento genérico
    function criarElemento(tag, classe){
        let novoElemento = document.createElement(tag)
        novoElemento.className = classe
        return novoElemento
    }

    // criar elemento cano específico
    function Cano(superior=true, altura=50){

        this.head = criarElemento('div', 'head')
        this.corpo = criarElemento('div', 'corpo')

        // ajeitando a altura do corpo
        this.setAltura = (altura) => this.corpo.style.height = `${altura}px`

        if(superior){
            let canoSuperior = criarElemento('div', 'cano-superior')
            canoSuperior.appendChild(this.corpo)
            canoSuperior.appendChild(this.head)
            this.elemento = canoSuperior

        }else{
            let canoInferior = criarElemento('div', 'cano-inferior')
            canoInferior.appendChild(this.head)
            canoInferior.appendChild(this.corpo)
            this.elemento = canoInferior
        }
    }

    // cria um conjunto de canos com alturas específicas
    function Canos(altura, abertura, posLeftInicial=50, largura=120){

        // o elemento canos e o cano superior e inferior
        this.elementoPai = criarElemento('div', 'canos')
        this.canoSuperior = new Cano()
        this.canoInferior = new Cano(false)

        // inserindos os canos inferior e superior dentro do elemento pai
        this.elementoPai.appendChild(this.canoSuperior.elemento)
        this.elementoPai.appendChild(this.canoInferior.elemento)

        // criando um método para determinar as alturas aleatórias
        this.sortearAltura = (altura, abertura) =>{
            
            // calculando as alturas superior e inferior
            let alturaRestante = altura - abertura - 60 // heads

            let alturaSuperior = randomInt(0, alturaRestante) 
            let alturaInferior = alturaRestante - alturaSuperior

            // alterando as alturas dos canos superior e inferior
            this.canoSuperior.setAltura(alturaSuperior)
            this.canoInferior.setAltura(alturaInferior)
        }

        // métodos para pegar e mudar a posição horizontal do elementos .canos
        // em relação à esquerda da tela
        this.getPosX = () => {
            return Number(this.elementoPai.style.left.replace('px', ''))
        }

        this.setPosX = (posLeft) => {
            this.elementoPai.style.left = `${posLeft}px`
        }
        this.getLargura = () => {
            return Number(this.elementoPai.style.width.replace('px', ''))
        }

        this.setLargura = (l) => this.elementoPai.style.width = `${l}px`

        // configurando os canos iniciais
        this.sortearAltura(altura, abertura)
        this.setPosX(posLeftInicial)
        this.setLargura(largura)

        // alterando a visibilidade dos canos
        this.elementoPai.style.display = 'flex'
    }

    // organizar os vários canos
    function organizarCanos(altura, abertura, posLeft, distancia, quantidade=0){

        
        // criando os métodos iniciais
        this.canos = []
        this.criarConjCanos = function(alt, abrt, pos){

            for(let n = 1; n <= quantidade; n++){
                let cano = new Canos(alt, abrt, pos)
                this.canos.push(cano)
            }
        }

        this.espaçarCanos = function(pos, dist){

            for(let cano of this.canos){

                cano.setPosX(pos)
                pos += dist + cano.getLargura()
            }
        }

        // iniciando os métodos iniciais
        this.criarConjCanos(altura, abertura, posLeft)
        this.espaçarCanos(posLeft, distancia)

        // array apenas com os elementos da classe .canos
        this.elementos = this.canos.map((e)=>e.elementoPai)

        // inserindo todos os elementos na tela
        this.inserirTodosNaTela = function(objetoTela){

            for(let elemento of this.elementos){
                objetoTela.inserir(elemento)
            }

        }

        // lidando com o deslocamento
        this.deslocamento = 5
        this.getDeslocamento = () => this.deslocamento
        this.setdeslocamento = (d) => {this.deslocamento = d}

        this.deslocar = function(deslocamento, direção='left'){
            
            let d = deslocamento?? this.getDeslocamento()

            // deslocamento para esquerda
            if(direção == 'left' || direção == ''){

                for(let elemento of this.canos){

                    let posAtual = elemento.getPosX()
                    let largura = elemento.getLargura()
                    elemento.setPosX(posAtual - d)

                    // verificando se o elemento saiu da tela
                    if(posAtual < -elemento.getLargura()){ 

                        let calculo = quantidade * (largura + distancia)
                        elemento.sortearAltura(altura, abertura)
                        elemento.setPosX(calculo)
                    }

                    // ajustando placar
                    let meioCanos = elemento.getLargura() / 2
                    let passouCano = (posAtual + largura )
                }

            }
            // deslocamento para direita
            else if(direção == 'right'){

                for(let elemento of this.canos){
                    let posAtual = elemento.getPosX()
                    elemento.setPosX(posAtual + d)
                }
            }
            
        }

        // relacionados com animação
        this.timerID = null
        this.animando = false
        this.setAnimando = (estado) => {this.animando = estado}

        // começar a animação
        this.start = function(intervalo=0.02, deslocamento=3){

            this.timerID = null
            this.setAnimando(true)
            let segundos = intervalo * 1000
            this.timerID = setInterval(
                ()=>{
                    this.deslocar(deslocamento)
                }, segundos
            )
        }

        // parar a animação
        this.stop = () => {

            clearInterval(this.timerID)
            this.setAnimando(false)
            this.timerID = null
        }

        this.resetarPos = function(){
            this.espaçarCanos(posLeft, distancia)  
        }
    }

    let conjCanos = new organizarCanos(
        tela.altura, 
        100, 
        tela.largura - 100, 
        100, 
        5
    )


    conjCanos.inserirTodosNaTela(tela)

    
    

   
    


    



    
    
    



    





