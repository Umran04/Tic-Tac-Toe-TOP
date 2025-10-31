function createPlayer(name,marker){
    return {
        name:name,
        marker:marker,
        
    }

}

const playerOne = createPlayer('playerOne', 'X')
const playerTwo = createPlayer('playerTwo', 'O')

const gameBoard = (function(){
    let board = ['', '', '', '', '', '', '', '', '' ]

        return{
        getBoard(){
            return board
            },

        setMarker(index, marker){
            if (index >= 0 && index <= 8 && board[index] == ''){
                board[index] = marker
                }
                return board[index]
            },

        reset(){
            board = ['', '', '', '', '', '', '', '', '' ]
            }



        }


    }

)();

const gameController = (function(){

    let currentPlayer = playerOne
    let gameOver = false
    let winner = null

    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
      ]
      

    return{
        getPlayer(){
            return currentPlayer 
        },
        switchPlayer(){
            if (currentPlayer == playerOne){
                currentPlayer = playerTwo
            }else if (currentPlayer == playerTwo){
                currentPlayer = playerOne
            }else{}

        },

        isGameWon(){
            winningCombos.forEach((combo) => {
                let [a,b,c] = combo
                if(
                gameBoard.getBoard()[a] == currentPlayer.marker && 
                gameBoard.getBoard()[b] == currentPlayer.marker && 
                gameBoard.getBoard()[c] == currentPlayer.marker){
                    winner = currentPlayer
                    gameOver = true
                    console.log('Game over ' + winner.name + ' wins')
                    return true
                }
            })
            
        },
        
        playMove(index){
            if(gameBoard.getBoard()[index] == 'X' || gameBoard.getBoard()[index] == 'O'){
                console.log('Invalid move')
            }else {
                gameBoard.setMarker(index, currentPlayer.marker)
                
                this.isGameWon()

                if(gameOver == false){
                    this.switchPlayer()
                    console.log('Its ' + currentPlayer.name + 's turn')
                }
                
                
            }



        },
        resetGame(){
            gameBoard.reset()
            gameOver = false
            winner = null
            currentPlayer = playerOne
        }

        
        
    }

})();

gameController.playMove(0)
gameController.playMove(2)
gameController.playMove(3)
gameController.playMove(5)
gameController.playMove(6)
gameController.resetGame()

console.log(gameBoard.getBoard())