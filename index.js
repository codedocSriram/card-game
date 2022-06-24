let deckId
let pcScore=0
let playerScore=0
const cardsContainer= document.getElementById("cards")
const newDeckBtn= document.getElementById("new-deck")
const drawCardBtn= document.getElementById("draw-cards")
const resultH2=document.getElementById("result-h2")
const remainintText= document.getElementById("remaining-card")
const pcScoreElement=document.getElementById("pc-score")
const playerScoreElement=document.getElementById("player-score")
drawCardBtn.disabled=true
function handleClick(){
setDefault()
fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
.then(res=> res.json())
.then(data=>{
    console.log(data)
    deckId=data.deck_id
    remainintText.textContent=`Remaining cards: ${data.remaining}`
})
}

function setDefault(){
    pcScore=0
    playerScore=0
    resultH2.innerHTML="Game of War!"
    pcScoreElement.innerHTML="PC score:"
    playerScoreElement.innerHTML="Your score:"
    drawCardBtn.disabled=false


}

function determineWinner(card1,card2)
{
    const valueOptions=["2","3","4","5","6",
    "7","8","9","10","JACK","QUEEN","KING","ACE"]
    const card1Index=valueOptions.indexOf(card1)
    const card2Index=valueOptions.indexOf(card2)
    if(card1Index<card2Index){
        pcScore+=1
        return "Computer wins!"
    }
    else if(card1Index>card2Index){
        playerScore+=1
        return "You win!"
    }
    else{
        return "War!"
    }
}

function deckWinner(){
    if(pcScore > playerScore){
       return "You have lost this Deck!"
    }
    else if(pcScore<playerScore){
       return "You have won this Deck!"
    }
    else{
        return "This Deck ends in a tie!"
    }
}

newDeckBtn.addEventListener("click",handleClick)
drawCardBtn.addEventListener("click",()=>{
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        remainintText.textContent=`Remaining Cards: ${data.remaining}`
        cardsContainer.children[2].innerHTML=`
        <img src=${data.cards[0].image} class="card">`
        cardsContainer.children[3].innerHTML=`
        <img src=${data.cards[1].image} class="card">`
        resultH2.innerHTML=determineWinner(data.cards[0].value, data.cards[1].value)
        pcScoreElement.textContent=`PC score: ${pcScore}`
        playerScoreElement.textContent=`Your score: ${playerScore}`
        if(data.remaining === 0){
            drawCardBtn.disabled=true
            resultH2.innerHTML= deckWinner()
        }
    } )
})