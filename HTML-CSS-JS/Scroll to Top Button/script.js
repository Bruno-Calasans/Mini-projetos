
 let btnTop = document.getElementById('btnTop')

//document.onscroll = function(){scroll()} // primeira forma
window.onscroll = function(){scroll()} // segunda forma 

function scroll(){

    //document.body é para safira
    //document.documentElement é para Chrome, Mozilla, Opera e IE
    // use sempre o document.documentElement para não dar erro

    if(document.documentElement.scrollTop > 20 || document.body.scrollTop > 20){
        btnTop.style.display = 'block'

    }else{
        btnTop.style.display = 'none'
    }

}

function scrollToTop(){
    document.body.scrollTop = '0' // safira
    document.documentElement.scrollTop = '0' // chrome, mozilla, opera e IE
    
}


