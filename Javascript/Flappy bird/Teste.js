

    // utilizando classes
    class Tela{

        constructor(id ,largura, altura){
            this.elemento =  document.getElementById(id)
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
        getLargura = () => Number(this.elemento.style.width.replace('px', ''))

        setLargura(l){
            this.elemento.style.width = `${l}px`
            this.largura = l
        }

        getAltura(){this.elemento.clientHeight}
        tsetAltura(a){
            this.elemento.style.height = `${a}px`
        }

        // configurações iniciais da tela
        setLargura(largura)
        setAltura(altura)
    }