let imagenesCarrusel = [
    {
        "url": "../images/team1.jpg",
        "nombre": "Team 1",
        "descripcion": "Nuestro proyecto Esfuérzate y Sé Valiente tiene un carácter social y brinda apoyo a jóvenes, utilizando como plataformas las artes marciales mixtas y el mentoreo individual y grupal, para transformar de forma integral las vidas de sus participantes."

    },
    {
        "url": "../images/team2.jpg",
        "nombre": "Team 2",
        "descripcion": "No solo entrenamos el cuerpo, sino que también fortalecemos la mente, las emociones y el espíritu. Nuestro objetivo es que cada participante se convierta en una inspiración para su entorno."

    },
    {
        "url": "../images/team3.jpg",
        "nombre": "Team 3",
        "descripcion": "Únete a nuestra misión. Tu apoyo es esencial para que Esfuérzate y Sé Valiente siga transformando vidas y sea sostenible a largo plazo."



    },
]
let atras = document.getElementById('atras');
let adelante = document.getElementById('adelante');
let imagen = document.getElementById('img');
let puntos = document.getElementById('puntos');
let texto = document.getElementById('texto');
let actual = 0

posicionCarrusel()

atras.addEventListener('click', function(){
    actual -=1

    if (actual == -1){
        actual = imagenesCarrusel.length - 1
    }

    imagen.innerHTML = ` <img class="img" src="${imagenesCarrusel[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <p>${imagenesCarrusel[actual].descripcion}</p>
    `
    posicionCarrusel()
})  
adelante.addEventListener('click', function(){
    actual +=1

    if (actual == imagenesCarrusel.length){
        actual = 0
    }

    imagen.innerHTML = ` <img class="img" src="${imagenesCarrusel[actual].url}" alt="logo pagina" loading="lazy"></img>`
    texto.innerHTML = `
    <p>${imagenesCarrusel[actual].descripcion}</p>
    `
    posicionCarrusel()
})  

function posicionCarrusel() {
    puntos.innerHTML = ""
    for (var i = 0; i <imagenesCarrusel.length; i++){
        if(i == actual){
            puntos.innerHTML += '<p class="bold">.<p>'
        }
        else{
            puntos.innerHTML += '<p>.<p>'
        }
    } 
}