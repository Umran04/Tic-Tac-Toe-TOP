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
                return 'Invalid move'
            }else{
                gameBoard.setMarker(index, currentPlayer.marker)
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

gameBoard.setMarker(4, playerOne.marker)
gameBoard.setMarker(3, playerTwo.marker)

console.log(gameBoard.getBoard())


