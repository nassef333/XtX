(function() {
	var Board = {
		size: 10,
		maximumTurn: 3,
		ladderStartPositions: [8, 52, 74],
		ladderEndPositions: [34, 86, 99],
		snakeStartPositions: [98, 75, 51],
		snakeEndPositions: [1, 42, 27]
	};

	var boardElement = document.getElementById('board');
	var roleDiceElement = document.getElementById('roleDice');
	var perfectThrowElement = document.getElementById('perfectThrow');
	var player1Element = document.getElementById('player1');
	var player2Element = document.getElementById('player2');
	var resultsElement = document.getElementById('results');
	var resetElement = document.getElementById('reset');

	function CreatePlayers(name) {
		this.name = name;
		this.position = 1;
		this.turnCount = 0;
		this.numberOfThrows = 0;
		this.numberOfTimesSixRolled = 0;
		this.numberOfLaddersClimbed = 0;
		this.numberOfSnakesEncountered = 0;
	}

	function createBoard(rows, columns) {
		boardElement.innerHTML = '';
		for (var i = 0; i < rows; i++) {
			var row = boardElement.insertRow(0);
			for (var j = 1; j <= columns; j++) {
				var index = i * rows + j;
				var positionElement = document.createElement('span');
				var cell = row.insertCell(-1);
				positionElement.setAttribute('class', 'position-index');
				positionElement.innerHTML = index;
				cell.appendChild(positionElement);
				cell.setAttribute('id', index)
			}
		}
	}


	function setPositions(previousPosition, currentPlayer) {
		var playerElement = document.createElement('span');
		playerElement.setAttribute('class', currentPlayer.name);
		var previousCell = document.getElementById(previousPosition);
		var currentCell = document.getElementById(currentPlayer.position);
		var className = currentPlayer.name === 'player1' ? '.player1' : '.player2';
		var currentPlayerPosition = previousCell.querySelector(className);
		if (currentPlayerPosition) {
			previousCell.removeChild(currentPlayerPosition);
		}
		currentCell.appendChild(playerElement);
	}

	function setUpPlayers() {
		Board.player1 = new CreatePlayers('player1');
		Board.player2 = new CreatePlayers('player2');
		Board.currentPlayer = Board.player1;
	}

	function changePlayer() {
		if (Board.currentPlayer === Board.player1) {
			Board.currentPlayer = Board.player2;
		} else {
			Board.currentPlayer = Board.player1;
		}
		Board.currentPlayer.turnCount = 0;
		console.log(Board.currentPlayer.name + "'s turn");
	}

	function createElementForStats(playerElementId, value) {
		var newElement = document.createElement('div');
		newElement.setAttribute('class', 'stats');
		newElement.innerHTML = value;
		document.getElementById(playerElementId).appendChild(newElement);
	}

	function showPlayerStats() {
		var player1 = Board.player1;
		createElementForStats(player1.name, 'Number of throws: ' + player1.numberOfThrows);
		createElementForStats(player1.name, 'Number of times six rolled: ' + player1.numberOfTimesSixRolled);
		createElementForStats(player1.name, 'Number of ladders climbed: ' + player1.numberOfLaddersClimbed);
		createElementForStats(player1.name, 'Number of snakes encountered: ' + player1.numberOfSnakesEncountered);

		var player2 = Board.player2;
		createElementForStats(player2.name, 'Number of throws: ' + player2.numberOfThrows);
		createElementForStats(player2.name, 'Number of times six rolled: ' + player2.numberOfTimesSixRolled);
		createElementForStats(player2.name, 'Number of ladders climbed: ' + player2.numberOfLaddersClimbed);
		createElementForStats(player2.name, 'Number of snakes encountered: ' + player2.numberOfSnakesEncountered);
	}




	//===========================================================================================
	function roleDice() {
		var currentPlayer = Board.currentPlayer;
		if (currentPlayer.turnCount < Board.maximumTurn) {
			// اختيار رقم عشوائي من 1 ل 6
			var diceValue = Math.floor(Math.random() * 6) + 1;
			console.log(diceValue);
			document.getElementById('diceResult').innerHTML	= 'Current Dice Result: ' + diceValue;
			currentPlayer.numberOfThrows += 1;
			if (currentPlayer.position + diceValue > 100) {
				changePlayer();
				return;
			}

			var previousPosition = currentPlayer.position;
			currentPlayer.position += diceValue;
			if (currentPlayer.position >= 100) {
				setPositions(previousPosition, currentPlayer);
				window.alert(currentPlayer.name + ' won the game');
				showPlayerStats();
				return;
			}

			var ladderIndex = Board.ladderStartPositions.indexOf(currentPlayer.position);
			var snakeIndex = Board.snakeStartPositions.indexOf(currentPlayer.position);
			if (ladderIndex > -1) {
				var endPosition = Board.ladderEndPositions[ladderIndex];
				console.log('UP start'+ currentPlayer.position);
				currentPlayer.position = endPosition;
				console.log('UP End'+currentPlayer.position);
				currentPlayer.numberOfLaddersClimbed += 1;
			} else if (snakeIndex > -1) {
				var endPosition = Board.snakeEndPositions[snakeIndex];
				console.log('DOWN start'+ currentPlayer.position);
				currentPlayer.position = endPosition;
				console.log('Down End'+currentPlayer.position);
				currentPlayer.numberOfSnakesEncountered += 1;
			}

			setPositions(previousPosition, currentPlayer);

			if (diceValue !== 6) {
				changePlayer();
			} else {
				currentPlayer.turnCount += 1;
				currentPlayer.numberOfTimesSixRolled += 1;
				currentPlayer.numberOfLaddersClimbed += 1;
				roleDice();
			}

		} else {
			Board.currentPlayer.turnCount = 0;
			changePlayer();
		}
	}

	function clearPlayerStats() {
		var stats = document.querySelectorAll('.stats');
		stats.forEach(function(stat) {
			stat.remove();
		});
	}

	function attachEvent() {
		roleDiceElement.addEventListener('click', function() {
			roleDice();
		});

		resetElement.addEventListener('click', function() {
			init();
		});

		player1Element.addEventListener('dragstart', function(event) {
			event.dataTransfer.setData("text/plain", event.target.id);
		});

		player2Element.addEventListener('dragstart', function(event) {
			event.dataTransfer.setData("text/plain", event.target.id);
		});

		resultsElement.addEventListener('dragover', function(event) {
			event.preventDefault();
		});

		resultsElement.addEventListener('drop', function(event) {
			if (event.target.id !== 'results') {
				return;
			}
			var card = event.dataTransfer.getData("text/plain");
			event.target.appendChild(document.getElementById(card));
		});
	}

	function init() {
		createBoard(10, 10);
		setUpPlayers();
		setPositions(1, Board.player1);
		setPositions(1, Board.player2);
		clearPlayerStats();
		attachEvent();
	}

	init();

}
)
();