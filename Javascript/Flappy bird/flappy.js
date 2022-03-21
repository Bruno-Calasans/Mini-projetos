
    // objeto globais ----------------------------------------------------------
    
    function Tela(id, largura, altura){

        this.elemento =  document.getElementById(id)

        // insere apenas um elemento na tela
        this.inserir = function(elemento){
            this.elemento.appendChild(elemento)
        }

        // inserindo mais de um elemento na tela
        this.inserirVários = function(array=[]){
            for(let elemento of array){
                this.inserir(elemento)
            }
        }

        // getters e setters
        this.getLargura = () => Number(this.elemento.style.width.replace('px', ''))
        this.setLargura = (l) => {
            this.elemento.style.width = `${l}px`
            this.largura = l
        }

        this.getAltura = () => this.elemento.clientHeight
        this.setAltura = (a) => {
            this.elemento.style.height = `${a}px`
        }

        // configurações iniciais da tela
        this.setLargura(largura)
        this.setAltura(altura)
    }

    // criando uma tela
    const tela = new Tela('tela', 800, 400)

    // criando um objeto score
    function Score(id){

        this.elemento = document.getElementById(id)
        this.ponto = this.elemento.firstElementChild

        this.getScore = () => Number(this.ponto.innerText)
        this.setScore = (valor) => {this.ponto.innerText = valor}

        this.aumentarScore = (aumento=1) => {
            this.setScore(this.getScore() + aumento)
        }

        this.diminuirScore = (redução=1) => {
            this.setScore(this.getScore() - redução)
        }

        this.resetar = () => {this.setScore(0)}
    }

    // criando um escore
    const score = new Score('score')

    function Bird(id, largura, altura, posLeft, posTop, alturaMax){

        this.elemento = document.getElementById(id)

        // criando os métodos
        this.getLargura = () => Number(this.elemento.style.width.replace('px', ''))

        this.setLargura = (l) => {
            this.elemento.style.width = `${l}px`
            this.largura = l
        }

        this.getAltura = () => Number(this.elemento.style.height.replace('px', ''))

        this.setAltura = (a) => {
            this.elemento.style.height = `${a}px`
            this.altura = a
        }

        this.getX = () => Number(this.elemento.style.left.replace('px', ''))
        this.setX = (x) => {this.elemento.style.left = `${x}px`}

        this.getY = () => Number(this.elemento.style.bottom.replace('px', ''))
        this.setY = (y) => {this.elemento.style.bottom = `${y}px`}
        this.resetar = () => {
            this.setX(posLeft)
            this.setY(posTop)
        }

        // configurações iniciais do bird
        this.setLargura(largura)
        this.setAltura(altura)
        this.setX(posLeft)
        this.setY(posTop)
        
        // configurando limites do pássaro
        this.posMax = alturaMax - this.altura
        this.posMin = 0
        var voando = false

        // configurando o voo
        this.subir = (deslocamento) => {

            let posAtual = this.getY()
            if(posAtual + deslocamento <= this.posMax){
                this.setY(posAtual + deslocamento)

            }else{
                this.setY(this.posMax)
            }
            
        }

        this.descer = (deslocamento) => {

            let posAtual = this.getY()
            if(posAtual - deslocamento >= this.posMin){
                this.setY(posAtual - deslocamento)

            }else{
                this.setY(this.posMin)
            }
            
        }

        // ao clicar ou segurar a teclad configurada
        window.onkeydown = (e) =>{if(e.key == ' ') voando = true}          

        // ao soltar a tecla
        window.onkeyup = () =>{voando = false}

        this.start = (subida=8, descida=5, velocidade=25) =>{

            this.stop()
            this.timerID = setInterval(()=>{

                if(voando){
                    this.subir(subida)

                }else{
                    this.descer(descida)
                }
            }, velocidade)
        }

        this.stop = () =>{
            clearInterval(this.timerID)
        }
    }

    // criando o pássaro
    const bird = new Bird('bird', 50, 35, 200, 200, tela.altura)

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
    function Canos(altura, largura, abertura, posLeft=50){

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
        this.getPosX = () => Number(this.elementoPai.style.left.replace('px', ''))
        
        this.setPosX = (pos) => {
            this.elementoPai.style.left = `${pos}px`
        }

        this.getLargura = () => Number(this.elementoPai.style.width.replace('px', ''))
        
        this.setLargura = (l) => {this.elementoPai.style.width = `${l}px`}

        // configurando os canos iniciais
        this.sortearAltura(altura, abertura)
        this.setPosX(posLeft)
        this.setLargura(largura)

        // alterando a visibilidade dos canos
        this.elementoPai.style.display = 'flex'
    }

    // organizar os vários canos
    function OrganizarCanos(altura, largura, abertura, posLeft, distancia, quantidade=0){

        // criando os métodos iniciais
        this.canos = []
        this.criarConjCanos = function(alt, larg, abrt, pos, quantidade){

            for(let n = 1; n <= quantidade; n++){
                let cano = new Canos(alt, larg, abrt, pos)
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
        this.criarConjCanos(altura, largura, abertura, posLeft, quantidade)
        this.espaçarCanos(posLeft, distancia)

        // array apenas com os elementos da classe .canos
        this.elementos = this.canos.map((e)=>e.elementoPai)

        // lidando com o deslocamento
        var deslocamento = 5
        this.getDeslocamento = () => deslocamento
        this.setdeslocamento = (d) => {deslocamento = d}

        this.deslocar = function(deslocamento, direção='left'){
            
            let d = deslocamento?? this.getDeslocamento()

            // deslocamento para esquerda
            if(direção == 'left' || direção == ''){

                // cada elemento é um par de canos(superior e inferior)
                for(let elemento of this.canos){

                    // posição de cada par de canos
                    let posAtual = elemento.getPosX()
                    elemento.setPosX(posAtual - d)

                    // verificando se o elemento saiu da tela
                    if(posAtual < -elemento.getLargura()){ 

                        const calculo = quantidade * (largura + distancia)
                        elemento.sortearAltura(altura, abertura)
                        elemento.setPosX(calculo)
                    }

                    // ajustando placar
                    let largPosBird = bird.getLargura() + bird.getX()
                    let largPosCano = posAtual + largura

                    // verificando se o cano passou do pássaro
                    const cond1 = largPosCano <= largPosBird 
                    const cond2 = largPosCano > largPosBird - deslocamento
                    if(cond1 && cond2){score.aumentarScore()}
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
        var timerID = null // identificador da função setInterval
        var animando = false
        this.isAnimando = () => animando

        // começa a animação
        this.start = function(intervalo=0.02, deslocamento=3){

            // verificando se já existe alguma animação rodando
            if(animando) this.stop()

            // transformando para segundos
            const segundos = intervalo * 1000
            animando = true
            timerID = setInterval(
                ()=>{this.deslocar(deslocamento)}, segundos
            )
        }

        // para a animação
        this.stop = () => {
            clearInterval(timerID)
            animando = false
        }

        // reinicia para as posições iniciais dos canos
        this.resetarPos = function(){
            this.espaçarCanos(posLeft, distancia)  
        }
    }

    const conjCanos = new OrganizarCanos(
        tela.altura, // altura
        120, // largura
        100, // abertura entre os canos
        tela.largura - 100, // posLeft inicial
        200, // distância entre os canos
        5 // quantidade de canos
    )

    tela.inserirVários(conjCanos.elementos)

    
    

   
    


    



    
    
    



    





