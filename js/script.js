'use strict'
//Declaración de variables
const ROCK = "Piedra";
const PAPER = "Papel";
const SCISSORS = "Tijeras";
const TIE = 0;
const WIN = 100;
const LOST = -30;

const loginBtn = document.getElementById("login");
const form = document.getElementById("form");
const startBtn = document.getElementById("go");
const exitBtn = document.getElementById("exit");
const choiceText =  document.getElementById("text-game");
const btnGame = document.getElementById("group-btn");
const rockBtn = document.getElementById("rock");
const paperBtn = document.getElementById("paper");
const scissorsBtn = document.getElementById("scissors");
const resultText = document.getElementById("gamer");
const scoreFinal = document.getElementById("finalResult");
const turnGame = document.getElementById("turn");
const gamerImg = document.getElementById("gamer-img");
const gamerIaImg = document.getElementById("gamer-ia-img");
const recordlList = document.getElementById("record-score");

let gamerOption = "";
let score = 0;
let turn = 0;
let scoreRecords = [0,0,0,0,0];

     //Carga de los puntajes almacenados de la ultima sesion de juego
     window.addEventListener("DOMContentLoaded", function () {
        document.getElementById("wrapper").style.display = 'block';
        let scoresRecordLS = localStorage.getItem('scoreRecords');
        let scoreRecords2 = [];
    if(scoresRecordLS == null){                      //Realiza una validación la cual permite no mostrar los puntajes vacios en caso de no tener datos en LocalStorage
        scoresRecordLS = [0,0,0,0,0];
        scoreRecords2 = scoresRecordLS;
    }else{
        scoreRecords2 = JSON.parse(scoresRecordLS);
        scoreRecords = scoreRecords2;
    }
        recordlList.innerHTML = `<li>Puntaje: ${scoreRecords2[4]}</li><br><li>Puntaje: ${scoreRecords2[3]}</li><br><li>Puntaje: ${scoreRecords2[2]}</li><br><li>Puntaje: ${scoreRecords2[1]}</li><br><li>Puntaje: ${scoreRecords2[0]}</li><br>`;
    });


//-------------------------------------Script para el formulario de login--------------------------
    loginBtn.onclick = function() {             // Validación de usuario y contraseña
    const user = document.getElementById("user");
    const pass = document.getElementById("passwrd");

    if(user.value === "admin" && pass.value === "admin"){
        document.getElementById("wrapper").style.display = 'none';
        document.getElementById("game").style.display = 'flex';
    }
    else if(user.value === "" || pass.value === ""){
        alert("El usuario y/o contraseña no deber estar vacíos");
    }
    else{
        alert("El usuario y/o contraseña no son válidos, inténtalo de nuevo");
    }
}

//-------------------------------------Script para el juego--------------------------
document.getElementById("wrapper").style.display = 'none';
btnGame.style.display = 'none';
exitBtn.style.display = 'none';
choiceText.style.display = 'none';

turnGame.innerHTML = "Turno N° " + turn; 

startBtn.onclick = function(){           //Función del botón para empezar a jugar
     btnGame.style.display = 'flex';
     choiceText.style.display = 'block';
     startBtn.style.display = 'none';
     exitBtn.style.display = 'none';
     scoreFinal.style.display = 'none';
     score = 0;
     turn = 0;
     resultText.innerHTML = "Resultado: -";
     turnGame.innerHTML = "Turno N° " + turn;
}

exitBtn.onclick = function(){           //Función del botón para salir del juego
    location.reload();
}

//Funciones para la opción seleccionada por el jugador
rockBtn.addEventListener("click", () => {
    play(ROCK);
});

paperBtn.addEventListener("click", () => {
    play(PAPER);
});

scissorsBtn.addEventListener("click", () => {
    play(SCISSORS);
});

function calcResult(userOption,iaOption){       //Función que determina si empatan o si el jugador gana o pierde
    if(userOption === iaOption){
        return TIE; 
     }else if(userOption === ROCK ){

         if (iaOption === PAPER) return LOST;
         if (iaOption === SCISSORS) return WIN;
 
     }else if(userOption === PAPER){

         if (iaOption === SCISSORS) return LOST;
         if (iaOption === ROCK) return WIN;
 
     }else if(userOption === SCISSORS){

         if (iaOption === ROCK) return LOST;
         if (iaOption === PAPER) return WIN;
     }
}


function calcIaOption(){                 //Función que determina la opcion de la maquina
    const number = Math.floor(Math.random() * 3);
    switch(number){
        case 0:
            return ROCK;
        case 1:
            return PAPER;
        case 2:
            return SCISSORS;
    }
}

function play(userOption){              //Funcion encargada de la ejecucion del juego

    const iaOption = calcIaOption();
    const result = calcResult(userOption,iaOption);

        gamerImg.src = `./img/${userOption}.png`;
        gamerIaImg.src =  `./img/${iaOption}.png`;
        score += result;
        turn +=1;
        turnGame.innerHTML = "Turno N° " + turn;
        if (result === 100){
            resultText.innerHTML = "Resultado: Ganaste";
        }else if (result === -30){
            resultText.innerHTML = "Resultado: Perdiste";
        }else if (result === 0){
            resultText.innerHTML = "Resultado: Empate";
        }

        if(turn === 10){
            btnGame.style.display = 'none';
            startBtn.style.display = 'block';
            exitBtn.style.display = 'block';
            scoreFinal.style.display = 'flex';
            choiceText.style.display = 'block';
           
            scoreFinal.innerHTML = "Puntaje Final: " + score;
            startBtn.innerHTML = "Juguemos de nuevo!";
            exitBtn.innerHTML = "Salir";

            scoreRecords.push(score);  
            scoreRecords.shift();
            showRecords();
        }; 
}

function showRecords(){      //Función que muestra y guarda la informacion de los puntajes de las 5 ultimas partidas de la sesión
    recordlList.innerHTML = `<li>Puntaje: ${scoreRecords[4]}</li><br><li>Puntaje: ${scoreRecords[3]}</li><br><li>Puntaje: ${scoreRecords[2]}</li><br><li>Puntaje: ${scoreRecords[1]}</li><br><li>Puntaje: ${scoreRecords[0]}</li><br>`;
    localStorage.setItem('scoreRecords', JSON.stringify(scoreRecords)); 
}
