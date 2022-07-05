
let title = document.querySelector('.nav');
let turn = 'x';
let squares = [];

function whoWinner (num1, num2, num3) {
 title.innerHTML = ' '+squares[num1]+' winner';
 document.getElementById('num' + num1).style.background = 'red' ;  
 document.getElementById('num' + num2).style.background = 'red' ;  
 document.getElementById('num' + num3).style.background = 'red' ;  

 setInterval(function(){title.innerHTML += '.'},1000);
 setTimeout(function(){location.reload()},4000);

}
var counter =0;
var count =0;
function winner() {
    for (let i = 1; i < 10; i++) {
    squares[i] = document.getElementById('num' + i).innerHTML;
    }
    if(squares[1] == squares[2] && squares[2] == squares[3] && squares[1] != '') 
    {
counter += 1;
whoWinner(1,2,3);
    }
    
    else if(squares[4] == squares[5] && squares[5] == squares[6] && squares[4] != '') 
    {
counter += 1;
whoWinner(4,5,6);

    }
    else if(squares[7] == squares[8] && squares[8] == squares[9] && squares[7] != '') 
    {
counter += 1;
whoWinner(7,8,9);
    }


    else if(squares[1] == squares[4] && squares[4] == squares[7] && squares[1] != '') 
    {
counter += 1;
whoWinner(1,4,7);
    }
    else if(squares[2] == squares[5] && squares[5] == squares[8] && squares[2] != '') 
    {
counter += 1;
whoWinner(2,5,8);
    }
    else if(squares[3] == squares[6] && squares[6] == squares[9] && squares[3] != '') 
    {
counter += 1;
whoWinner(3,6,9);
    }

    else if(squares[3] == squares[5] && squares[5] == squares[7] && squares[3] != '') 
    {
counter += 1;
whoWinner(3,5,7);
    }
    else if(squares[1] == squares[5] && squares[5] == squares[9] && squares[1] != '') 
    {
counter += 1;
whoWinner(1,5,9);
    }
}


function game(id){
let element = document.getElementById(id);
    if (turn === 'x' && element.innerHTML == '') {
        element.innerHTML = 'X';
        title.innerHTML = 'O-Player';
        turn = 'o'
    }
    else if (turn === 'o' && element.innerHTML == '') {
        element.innerHTML = 'O';
        title.innerHTML = 'X-Player';
        turn = 'x'
    }
    winner();
    count += 1;
    if (count == 9) {
        if(counter == 0){
        setInterval(function(){title.innerHTML = 'NO WINNER'},1000);
        setTimeout(function(){location.reload()},4000);
        }
    }

}
