let score = JSON.parse(localStorage.getItem('score')) ||   // default operator
            {
                wins:0,
                losses:0,
                ties:0
            };

           /* if(!score){
                score = {
                    wins:0,
                    losses:0,
                    ties:0
                };    
            }  */

            document.querySelector('.js-auto-play-button')
                .addEventListener('click', () => {
                    autoPlay();
            });

            let isAutoPlaying = false;
            let intervalID;

            function autoPlay(){
                if(!isAutoPlaying)
                {
                    intervalID = setInterval( () => {
                        const playerMove=pickComputerMove();
                        playGame(playerMove);
                    },1000);
                    isAutoPlaying=true;
                }
                
                else{
                    clearInterval(intervalID);
                    isAutoPlaying=false;
                }
            }

            updateScore();

            document.querySelector('.js-rock-button')
                .addEventListener('click', () => {
                    playGame('Rock');
            });

            document.querySelector('.js-paper-button')
                .addEventListener('click', () => {
                    playGame('Paper');
            });

            document.querySelector('.js-scissors-button')
                .addEventListener('click', () => {
                    playGame('Scissors');
            });

            document.querySelector('.js-reset-score-button')
            .addEventListener('click', () => {
                score.wins=0;
                score.losses=0;
                score.ties=0;
                localStorage.removeItem('score');
                updateScore();
            });

            document.body.addEventListener('keydown', (event) => {
                if(event.key==='r'){
                    playGame('Rock');
                }
                else if(event.key==='p'){
                    playGame('Paper');
                }
                else if(event.key==='s'){
                    playGame('Scissors');
                }
            });




            function playGame(playerMove){

                const computerMove = pickComputerMove();
                let result='';
                
                if(playerMove==='Rock')
                {
                    if(computerMove==='Rock')
                    {
                        result='Tie.';
                    }
                    if(computerMove==='Paper')
                    {
                        result='You lose.';
                    }
                    if(computerMove==='Scissors')
                    {
                        result='You win.';
                    }   
                }

                if(playerMove==='Paper')
                {
                    if(computerMove==='Rock')
                    {
                        result='You win.';
                    }
                    if(computerMove==='Paper')
                    {
                        result='Tie.';
                    }
                    if(computerMove==='Scissors')
                    {
                        result='You lose.';
                    }   
                }

                if(playerMove==='Scissors')
                {
                    if(computerMove==='Rock')
                    {
                        result='You lose.';
                    }
                    if(computerMove==='Paper')
                    {
                        result='You win.';
                    }
                    if(computerMove==='Scissors')
                    {
                        result='Tie.';
                    }   
                }

                if(result=='You win.')
                {
                    score.wins+=1;
                }
                if(result=='You lose.')
                {
                    score.losses+=1;
                }
                if(result=='Tie.')
                {
                    score.ties+=1;
                }
                
                localStorage.setItem('score', JSON.stringify(score));

                updateScore();

                document.querySelector('.js-result').innerHTML=result;

                document.querySelector('.js-moves').
                    innerHTML=`You
                       <img src="images/${playerMove}-emoji.png" class="move-icon">
                        <img src="images/${computerMove}-emoji.png" class="move-icon">
                    Computer`;

            }

            function updateScore() {
                document.querySelector('.js-score').innerHTML=`Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
            }

            function pickComputerMove(){
                const randomNumber=Math.random();
                let computerMove='';

                if(randomNumber>=0 && randomNumber<1/3)
                {
                    computerMove='Rock';
                }
                else if(randomNumber>=1/3 && randomNumber<2/3)
                {
                    computerMove='Paper';
                }
                else if(randomNumber>=2/3 && randomNumber<1)
                {
                    computerMove='Scissors';
                }

                return computerMove;

            }


