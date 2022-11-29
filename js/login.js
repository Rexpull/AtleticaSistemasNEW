function logar(){
    var email = document.getElementById('email')
    var senha = document.getElementById('senha')

    if(email.value == 'admin@admin.com' && senha.value == 'admin'){
        localStorage.setItem("acesso", true)
        alert("voce vai ser direcionado")
        window.location.href='adminAtletica.html'
    }else{
        alert("usuario ou senha invalido!")
    }
}