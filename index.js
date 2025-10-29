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
        
        playMove(index){
            if(gameBoard.getBoard()[index] == 'X' || gameBoard.getBoard()[index] == 'O'){
                console.log('Invalid move')
            }else{
                gameBoard.setMarker(index, currentPlayer.marker)
                this.switchPlayer()
                console.log('Its ' + currentPlayer.name + ' turn')
                
                
            }



        },
        resetGame(){
            if(gameOver === true){
                gameBoard.reset()
                gameOver = false
                winner = null
                currentPlayer = playerOne
            }
            
        }

        
        
    }

})();

gameController.playMove(1)
gameController.playMove(0)

console.log(gameBoard.getBoard())






