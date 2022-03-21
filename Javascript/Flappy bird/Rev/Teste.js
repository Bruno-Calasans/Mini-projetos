

    // criando objeto tela
    class Tela{

        constructor(id ,largura, altura){

            this.elemento = document.getElementById(id)
            // configuraçãoes iniciais da tela
            this.setLargura(largura)
            this.setAltura(altura)
        }

        // insere apenas um elemento na tela
        inserir(elemento){
            this.elemento.appendChild(elemento)
        }

        // inserindo mais de um elemento na tela
        inserirVários(array=[]){
            for(let elemento of array){
                this.inserir(elemento)
            }
        }

        // getters e setters
        get largura(){return Number(this.elemento.style.width.replace('px',''))}
        get altura(){return Number(this.elemento.style.height.replace('px',''))}

        setLargura(l){this.elemento.style.width = `${l}px`}
        setAltura(a){this.elemento.style.height = `${a}px`}
    }

    // criando um objeto score
    class Score{

        constructor(id){
            // configurações iniciais
            this.elementoScore = document.getElementById(id)
            this.elementoPontos = this.elementoScore.firstElementChild
        }

        // getters e setters
        get pontos(){return Number(this.elementoPontos.innerText)}
        setScore(valor){this.elementoPontos.innerText = valor}

        // manipulação de pontos
        aumentarScore(aumento=1){this.setScore(this.pontos + aumento)}
        diminuirScore(redução=1){this.setScore(this.pontos - redução)}

        resetar(){this.setScore(0)}
    }
    
    // criando objeto bird
    class Bird{

            constructor(id, largura, altura, posLeft, posBottom, alturaMax){

                // configurações iniciais do objeto bird
                this.elemento = document.getElementById(id)
                this.setLargura(largura)
                this.setAltura(altura)
                this.setX(posLeft)
                this.setY(posBottom)

                // configurando limites do pássaro
                this.posMax = alturaMax - this.altura
                this.posMin = 0
                this.voando = false
                this.animando = false

                // guardando alguns parâmetros
                this.posXOriginal = posLeft
                this.posYOriginal = posBottom
            }

            // getters e setters
            get largura(){
                return Number(this.elemento.style.width.replace('px', ''))
            }
            setLargura(l){this.elemento.style.width = `${l}px`}
    
            get altura(){
                return Number(this.elemento.style.height.replace('px', ''))
            }
            setAltura(a){this.elemento.style.height = `${a}px`}
    
            // métodos relacionados com a posição do pássaro
            get posX(){
                return Number(this.elemento.style.left.replace('px', ''))
            }
            setX(x){this.elemento.style.left = `${x}px`}
    
            get posY(){
                return Number(this.elemento.style.bottom.replace('px', ''))
            }

            setY(y){this.elemento.style.bottom = `${y}px`}

            resetar(){
                this.setX(this.posXOriginal)
                this.setY(this.posYOriginal)
            }
    
            // métodos relacionados com o movimento do pássaro
            subir(deslocamento){
    
                let posAtual = this.posY

                if(posAtual + deslocamento <= this.posMax){
                    this.setY(posAtual + deslocamento)
    
                }else{
                    this.setY(this.posMax)
                }
                
            }
    
            descer(deslocamento){
    
                let posAtual = this.posY
                if(posAtual - deslocamento >= this.posMin){
                    this.setY(posAtual - deslocamento)
    
                }else{
                    this.setY(this.posMin)
                }
                
            }
    
            // começa a animação
            start (subida=8, descida=5, velocidade=25){
    
                if(this.animando) this.stop()
                this.animando = true
                this.timerID = setInterval(()=>{
    
                    if(this.voando){
                        this.subir(subida)
    
                    }else{
                        this.descer(descida)
                    }
                }, velocidade)
            }

            animar(subida=8, descida=5){

                if(this.voando){
                    this.subir(subida)

                }else{
                    this.descer(descida)
                }
            }
    
            // para a animação
            stop(){
                clearInterval(this.timerID)
                this.animando = false
            }
    }


    // controles
    class Controles{

        constructor(objWindow, objBird){

            // objetos padrões
            this.bird = objBird
            this.window = objWindow

            // teclas padrões
            this.teclaVoar = ' '

            // configurando as teclas
            this.configBird(objWindow, objBird)
        }

        configBird(
            objTarget=this.window, 
            objBird=this.bird, 
            teclaVoar=this.teclaVoar
            ){

            // configurando as teclas para o pássaro
        
            // ao clciar ou segurar a tecla
            objTarget.onkeydown = function(e){
               if(e.key == teclaVoar) objBird.voando = true
            }

            // ao soltar a tecla
            objTarget.onkeyup = function(){objBird.voando = false}
        }

        configTeclaVoar(novaTecla){
            this.teclaVoar = novaTecla
            this.configBird()
        }
    }

    // funções genéricas -------------------------------------------------------
    function randomInt(min, max) {
        return Math.floor(Math.random() * (max - min) ) + min;
    }

    // criar elemento genérico
    function criarElemento(tag, classe){
        let novoElemento = document.createElement(tag)
        novoElemento.className = classe
        return novoElemento
    }

    // criando a classe cano
    class Head{

        constructor(largura, altura){

            this.elemento = criarElemento('div', 'head')
            // configurações iniciais
            this.setLargura(largura)
            this.setAltura(altura)
        }

        // métodos getters e setters
        setLargura(largura){this.elemento.style.width = `${largura}px`}
        setAltura(altura){this.elemento.style.height = `${altura}px`}
        get largura(){return Number(this.elemento.style.width.replace('px',''))}
        get altura(){return Number(this.elemento.style.height.replace('px',''))}
    }

    class Corpo{

        constructor(largura, altura){

            this.elemento = criarElemento('div', 'corpo')
            // configurações iniciais
            this.setLargura(largura)
            this.setAltura(altura)
        }

        // métodos getters e setters
        setLargura(largura){this.elemento.style.width = `${largura}px`}
        setAltura(altura){this.elemento.style.height = `${altura}px`}
        get largura(){return Number(this.elemento.style.width.replace('px',''))}
        get altura(){return Number(this.elemento.style.height.replace('px',''))}
    }

    class Cano{

        constructor(superior=true, 
            larguraCorpo=100, alturaCorpo=120,
            larguraHead=120, alturaHead=30){

            // criando as partes do cano
            this.corpo = new Corpo(larguraCorpo, alturaCorpo)
            this.head = new Head(larguraHead, alturaHead)
            
            if(superior){
                let canoSuperior = criarElemento('div', 'cano-superior')
                canoSuperior.appendChild(this.corpo.elemento)
                canoSuperior.appendChild(this.head.elemento)
                this.elemento = canoSuperior
    
            }else{
                let canoInferior = criarElemento('div', 'cano-inferior')
                canoInferior.appendChild(this.head.elemento)
                canoInferior.appendChild(this.corpo.elemento)
                this.elemento = canoInferior
            }
        }
    }

    // cria a classe canos
    class Canos{

        constructor(altura, largura, abertura, posLeft=50){

            // o elemento canos e o cano superior e inferior
            this.elemento = criarElemento('div', 'canos')
            this.canoSuperior = new Cano()
            this.canoInferior = new Cano(false)
    
            // inserindos os canos inferior e superior dentro do elemento pai
            this.elemento.appendChild(this.canoSuperior.elemento)
            this.elemento.appendChild(this.canoInferior.elemento)

            // configurações inicias dos cano
            this.sortearAlturas(altura, abertura)
            this.setPosX(posLeft)
            this.setLargura(largura)
    
            // alterando a visibilidade dos canos
            this.elemento.style.display = 'flex'
        }

        // getters e setters
        setLargura(l){this.elemento.style.width = `${l}px`}
        setPosX(pos){this.elemento.style.left = `${pos}px`}

        get posX(){return Number(this.elemento.style.left.replace('px', ''))}
        get largura(){
            return Number(this.elemento.style.width.replace('px', ''))
        }
        
        // criando um método para determinar alturas aleatórias
        sortearAlturas(altura, abertura){
                
            // calculando o valor que será utilizado para determinar as alturas do cano inferior e superior
            let alturaRestante = altura - abertura - 60 // heads

            let alturaSuperior = randomInt(0, alturaRestante) 
            let alturaInferior = alturaRestante - alturaSuperior

            // alterando as alturas dos canos superior e inferior
            this.canoSuperior.corpo.setAltura(alturaSuperior)
            this.canoInferior.corpo.setAltura(alturaInferior)
        }
    
    }

    
    // organizar os vários canos
    class OrganizaçãoCanos{

        constructor(altura, largura, abertura, posLeft, distancia, quantidade=0, objBird, objScore){

            this.canos = []
            // iniciando os métodos iniciais
            this.criarConjCanos(altura, largura, abertura, posLeft, quantidade)
            this.espaçarCanos(posLeft, distancia)

             // array apenas com os elementos da classe .canos
            this.elementos = this.canos.map((e) => e.elemento)

            // atributos relacionado com deslocamento
            this.deslocamento = 3
            this.altura = altura
            this.largura = largura
            this.abertura = abertura
            this.distancia = distancia
            this.quantidade = quantidade
            this.posLeft = posLeft

            //definindo os objetos que serão utilizados aqui
            this.bird = objBird
            this.score = objScore

            // atributos relacionados com animação
            this.timerID = null // identificador da função setInterval
            this.animando = false
        }

        // métodos iniciais
        criarConjCanos = function(alt, larg, abrt, pos, quantidade){
    
            for(let n = 1; n <= quantidade; n++){
                let cano = new Canos(alt, larg, abrt, pos)
                this.canos.push(cano)
            }
        }

        espaçarCanos = function(pos, dist){

            for(let cano of this.canos){
                cano.setPosX(pos)
                pos += dist + cano.largura
            }
        }

        // reinicia para as posições iniciais dos canos
        resetarPos(){this.espaçarCanos(this.posLeft, this.distancia)}

        // métodos para lidar com o deslocamento
        deslocar(deslocamento=this.deslocamento, direção='left'){
            
            // deslocamento para esquerda
            if(direção == 'left' || direção == ''){

                // cada elemento é um par de canos(superior e inferior)
                for(let par of this.canos){

                    // posição de cada par de canos
                    let posAtual = par.posX
                    par.setPosX(posAtual - deslocamento)

                    // verificando se o par saiu da tela
                    if(posAtual < -par.largura){ 
                        const calculo = this.quantidade * (this.largura + this.distancia)
                        par.sortearAlturas(this.altura, this.abertura)
                        par.setPosX(calculo)
                    }

                    // ajustando placar
                    let largPosBird = this.bird.largura + this.bird.posX
                    let largPosCano = posAtual + this.largura

                    //console.log(this.canos[1].posX);

                    // verificando se o cano passou do pássaro
                    const cond1 = largPosCano <= largPosBird 
                    const cond2 = largPosCano > largPosBird - this.deslocamento
                    
                    if(cond1 && cond2){
                        //console.log('teste: ', largPosCano);
                        this.score.aumentarScore()
                    }
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
    
        // métodos relacionados com animação

        // começa a animação
        start(intervalo=20, deslocamento=3){

            // verificando se já existe alguma animação rodando
            if(this.animando) this.stop()

            // transformando para segundos
            //const segundos = intervalo * 1000
            this.animando = true
            this.colidiu = false
            this.timerID = setInterval(
                ()=>{this.deslocar(deslocamento)}, intervalo
            )
        }

        animar(deslocamento=3){

            if(this.animando) this.stop()
            this.deslocar(deslocamento)
        }

        // para a animação
        stop(){
            clearInterval(this.timerID)
            this.animando = false
        }

    }
    
    // classe final
    class FlappyBird{

        constructor(){

            this.tela = new Tela('tela', 800, 400)
            this.score = new Score('score')
            this.bird = new Bird('bird', 50, 35, 200, 200, this.tela.altura)
            this.controles = new Controles(window, this.bird)
            this.orgCanos = new OrganizaçãoCanos(
                this.tela.altura,
                120,
                100,
                this.tela.largura - 100,
                200,
                4,
                this.bird,
                this.score
            )

            // configurações iniciais
            this.tela.inserirVários(this.orgCanos.elementos)
            this.parado = false
        }

        startGame(velocidade=20){

            // se já existe um game rodando
            if(!this.parado) this.stopGame()
            this.parado = true

            this.temporizador = setInterval(

                () =>{

                    this.bird.animar()
                    this.orgCanos.animar()

                    // verificando colisão
                    let colidiram = colidiu(this.bird.elemento, this.orgCanos.canos)

                    if(colidiram) this.stopGame()
                    
                }
                ,velocidade
            )
        }

        stopGame(){
            clearInterval(this.temporizador)
            this.parado = false
        }

        reinciar(){

            if(!this.parado) this.stopGame()
            this.orgCanos.resetarPos()
            this.bird.resetar()
            this.score.resetar()
            this.startGame()
        }
    }

    function checkColisão(elementoA, elementoB){

        const a = elementoA.getBoundingClientRect()
        const b = elementoB.getBoundingClientRect()

        // verificando as colisões

        // elementoA colide com a frente do elementoB
        const colFrontal = a.left + a.width >= b.left + b.width

        // elementoA colide com a traseira do elementoB
        const colTraseira = b.left + b.width >= a.left

        // colisão horizontal *
        const horizontal = colFrontal && colTraseira

        // elementoA colide em cima do elementoB
        const colSuperior = a.top + a.height >= b.top

        // elementoA colide embaixo do elementoB
        const colInferior = b.top + b.height >= a.top

        // colisão vertical
        const vertical = colSuperior && colInferior

        return horizontal && vertical
    }

    function colidiu(bird, canos){

        let colidiram = false
        // verificando colisões

        canos.forEach(

            (cano) => {

            let colSup = checkColisão(bird, cano.canoSuperior.elemento)
            let colInf = checkColisão(bird, cano.canoInferior.elemento)
            
            if(colSup || colInf)colidiram = true
            return colidiram 
        })
    }


    const game = new FlappyBird
    //game.startGame()


    


    