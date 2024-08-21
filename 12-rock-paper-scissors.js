let score = JSON.parse(localStorage.getItem('scores')) || {
  wins: 0,
  losses: 0,
  ties: 0
};
let result;
let isAutoPlaying=false;
let intervalId;
function autoPlay(){
  if(!isAutoPlaying){
  intervalId=setInterval(function(){
    let playerMove=pickcomputerMove();
    playGame(playerMove);
  },1500);
  isAutoPlaying=true;
  resetAfter('Auto Play Started.');
  }
  else{
    clearInterval(intervalId);
    isAutoPlaying=false;
    resetAfter('Auto Play Stopped.');
  }
}
function clickedButton(){
  let buttonElement=document.querySelector('.js-auto-play-button');
  if(buttonElement.innerText==='Auto Play'){
    buttonElement.innerHTML='Stop Play';
    buttonElement.classList.add('is-clicked');
  }
  else{
    buttonElement.innerHTML='Auto Play';
    buttonElement.classList.remove('is-clicked');
  }
}
/*function resetButton(){
  let buttonElement=document.querySelector('.js-reset-button');
  if(!buttonElement.classList.contains('is-resetted')){
  toToggle();
  buttonElement.classList.add('is-resetted');
  }
  else{
    buttonElement.classList.remove('is-resetted');
  }
}
function toToggle(){
  if(document.querySelector('.is-resetted')){
    buttonElement.classList.remove('is-resetted');
  }
}*/
function playGame(playerMove){
  let computerMove=pickcomputerMove();
  if(playerMove==='rock'){
    if(computerMove==='rock'){
    result='Tie';
    }
    else if(computerMove==='paper'){
      result='You Lose';
    }
    else if(computerMove==='scissors'){
      result='You Win';
    }
  }
  else if(playerMove==='paper'){
    if(computerMove==='paper'){
      result='Tie';
    }
    else if(computerMove==='scissors'){
      result='You Lose';
    }
    else if(computerMove==='rock'){
      result='You Win';
    }
  }
  else if(playerMove==='scissors'){
    if(computerMove==='scissors'){
      result='Tie';
    }
    else if(computerMove==='rock'){
      result='You Lose';
    }
    else if(computerMove==='paper'){
      result='You Win';
    }
  }
  if(result==='You Win'){
    score.wins += 1;
  }
  else if(result==='You Lose'){
    score.losses += 1;
  }
  else if(result==='Tie'){
    score.ties += 1;
  }
  document.querySelector('.js-move-result')
  .innerHTML = `You picked <img src=${playerMove}-emoji.png> . Computer picked <img src=${computerMove}-emoji.png>`;
  document.querySelector('.js-result-line')
   .innerHTML = `${result}.`;
  updateCalculation();
  localStorage.setItem('scores',JSON.stringify(score)); 
}
function updateCalculation(){
  document.querySelector('.js-result2-line')
  .innerHTML = `Wins: ${score.wins}. Losses: ${score.losses}. Ties: ${score.ties}.`;
}

function resetAfter(reset){
  document.querySelector('.js-reset-line')
   .innerHTML = `${reset}`;
}

function pickcomputerMove(){
  let randomNumber=Math.random();
  let computerMove;
  if(randomNumber>=0 && randomNumber<1/3){
    computerMove='rock';
  }
  else if(randomNumber>=1/3 && randomNumber<2/3){
    computerMove='paper';
  }
  else if(randomNumber>=2/3 && randomNumber<1){
    computerMove='scissors';
  }
  return computerMove;
}