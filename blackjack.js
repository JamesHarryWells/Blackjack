
  //Card Variables
    let suits = ["Hearts", "Clubs", "Diamonds", "Spades"],
    values = ["Ace", "Two", "Three", "Four", "Five", "Six",
    "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"
  ];


//DOM Variables
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stickButton = document.getElementById('stick-button');
let p2Input = document.getElementById('p2-input')
let confirmButton = document.getElementById('confirm-button')
let bank = document.getElementById('bank-value')
let betting = document.getElementById('bet-value')
let bet1 = document.getElementById('bet-1')
let bet5 = document.getElementById('bet-5')
let bet10 = document.getElementById('bet-10')
let betReset = document.getElementById('bet-reset')
let changeBet = document.getElementById('change-bet')
//Game Variables
let gameStarted = false,
  gameOver = false,
  playerWon = false,
  dealerCards = [],
  playerCards = [],
  dealerScore = 0,
  playerScore = 0,
  deck = [];
  bankValues = 100
  bettingValues = 0
  betting.innerText = "Bet: £0";
  bank.innerText = "Bank: £100";

changeBet.style.display = 'none';
p2Input.style.display = 'inline';
hitButton.style.display = 'none';
stickButton.style.display = 'none';
showStatus();

bet1.addEventListener('click',function(){
  bettingValues = bettingValues + 1;
  checkBet ();
});

bet5.addEventListener('click',function(){
  bettingValues = bettingValues + 5;
  checkBet();
});

bet10.addEventListener('click',function(){
  bettingValues = bettingValues + 10;
  checkBet();
});

betReset.addEventListener('click',function(){
  bettingValues = 0
  checkBet();
})

confirmButton.addEventListener('click',function(){
  p2Input.style.display = 'none';
  checkBet();
}) 

changeBet.addEventListener('click',function(){
  changeBet.style.display = 'none';
  p2Input.style.display = 'inline';
  bettingValues = 0
  betting.innerText = bettingValues
})

function checkBet(){
  console.log(bettingValues);
    betting.innerText = String("Bet: £" + bettingValues);
};

newGameButton.addEventListener('click', function() {
  gameStarted = true;
  gameOver = false;
  playerWon = false;
  p2Input.style.display = "none";
  bankValues = bankValues - bettingValues;
  bank.innerText = ("Bank: £" + bankValues);


  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];

  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stickButton.style.display = 'inline';
  showStatus();
});

hitButton.addEventListener('click',function(){
  playerCards.push(getNextCard());
  checkForEndOfGame();
  showStatus();
});

stickButton.addEventListener('click',function(){
  gameOver = true;
  checkForEndOfGame();
  showStatus();
});

function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
    for (let valueIdx = 0; valueIdx < values.length; valueIdx++) {
      let card = {
        suit: suits[suitIdx],
        value: values[valueIdx]
      };
      deck.push(card);
    }
  }
  return deck;
}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.floor(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getCardString(card) {
  return card.value + " of " + card.suit;
}

function getNextCard() {
  return deck.shift();
}

function getCardNumericValue(card){
  switch(card.value){
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4
    case 'Five':
      return 5
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8
    case 'Nine':
      return 9
    default:
      return 10;
  }
}

function getScore(cardArray){
  let score = 0
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++){
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace'){
      hasAce = true;
    }
  }
  if (hasAce && score + 10 <= 21){
    return score + 10;
  }
  return score;
}

function updateScores(){
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndOfGame(){
  updateScores();
  if (gameOver){
    //let dealer take cards
    while(dealerScore < playerScore
          && playerScore <= 21
          && dealerScore <= 21){
            dealerCards.push(getNextCard());
            updateScores();
          }
  }
  
  if (playerScore > 21){
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21){
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver){
    if (playerScore>dealerScore){
      playerWon = true;
    }
    else{
      playerWon = false;
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stickButton.style.display = 'none';
  }
}

function showStatus() {
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }
  
  let dealerCardString = "";
  for (let i =0; i< dealerCards.length; i++){
    dealerCardString += getCardString(dealerCards[i]) + '\n';    
  }
  
  let playerCardString = "";
  for (let i =0; i< playerCards.length; i++){
    playerCardString += getCardString(playerCards[i]) + '\n';
  }

  updateScores();
  

  textArea.innerText =
  'Dealer has:\n' + 
    dealerCardString + 
    'score: '+ dealerScore + ')\n\n' +
    
    'Player has:\n' +
    playerCardString +
    'score: '+ playerScore + ')\n\n';
  
  if (gameOver){
    if (playerWon){
      textArea.innerText += "You win!";
      bankValues = (bankValues + bettingValues*2)
      bank.innerText = "Bank: £" + bankValues;
    }
    else{
      textArea.innerText += "Dealer wins";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stickButton.style.display = 'none';
    changeBet.style.display = 'inline';
  }
}

