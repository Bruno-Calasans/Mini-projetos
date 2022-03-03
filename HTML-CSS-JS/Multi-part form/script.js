
// variável global
var abaAtual = 0
mostrarAba(abaAtual)

function mostrarAba(n){

    let tabs = document.getElementsByClassName('tab')
    tabs[n].style.display = 'block'

    // ajeitando os botões
    if(n == 0){ 
        document.getElementById('prevBtn').style.display = 'none'
        
    }else{
        document.getElementById('prevBtn').style.display = 'block'
    }

    if(n < (tabs.length - 1)){
        let tab = document.getElementById('nextBtn')
        tab.innerHTML = 'Próximo'
        tab.style.display = 'block'

    }else{
        let tab = document.getElementById('nextBtn')
        tab.innerHTML = 'Enviar'
        tab.style.display = 'block'
    }

    // ajustando o step
    ajustadorStep(n)

}

function mudarAba(n){

    let tabs = document.getElementsByClassName('tab')

    // se quiser avançar de aba a o formulário está inválido
    if(n == 1 & !validarForm()){return false}
    
    tabs[abaAtual].style.display = 'none' // ocultando a aba atual
    abaAtual = abaAtual + n // mudando a variável abaAtual

    // se chegou na última aba
    if(abaAtual >= tabs.length){
        document.getElementById('multiForm').submit()
        return true
    }

    // mostrando a aba
    mostrarAba(abaAtual)
    
}

function validarForm(){

    // pegando os inputs da aba atual
    let tabs = document.getElementsByClassName('tab')
    let inputs = tabs[abaAtual].getElementsByTagName('input')
    let validade = true
    
    for (let input of inputs){
        
        if(input.value == ''){
            input.className += ' invalid'
            validade = false

        }else{
            input.className.replace(' invalid', '')
        }
    }

    // ajustando o step para válido
    if(validade){
        document.getElementsByClassName('step')[abaAtual].className += ' finish'
    }

    return validade

}

function ajustadorStep(n){

    let steps = document.getElementsByClassName('step')

    // limpando as classes 'active' dos steps
    for (let step of steps){
        step.className.replace('active', '')
    }

    // colocando a classe 'active' no step n
    steps[n].className += ' active'

}