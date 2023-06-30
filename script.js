//your JS code here. If required.
// Wait for the DOM to load
document.addEventListener("DOMContentLoaded", function() {
  const player1Input = document.getElementById("player-1");
  const player2Input = document.getElementById("player-2");
  const submitButton = document.getElementById("submit");
  const gameContainer = document.getElementById("game");
  const messageDiv = document.querySelector(".message");
  const cells = document.querySelectorAll(".cell");

  let currentPlayer = 1;
  let player1Name = "";
  let player2Name = "";

  submitButton.addEventListener("click", function() {
    player1Name = player1Input.value;
    player2Name = player2Input.value;

    if (player1Name.trim() !== "" && player2Name.trim() !== "") {
      gameContainer.style.display = "block";
      player1Input.disabled = true;
      player2Input.disabled = true;
      submitButton.disabled = true;
      messageDiv.textContent = `${player1Name}, you're up!`;
    }
  });

  cells.forEach(cell => {
    cell.addEventListener("click", function() {
      if (cell.textContent === "") {
        if (currentPlayer === 1) {
          cell.textContent = "X";
          messageDiv.textContent = `${player2Name}, it's your turn!`;
          currentPlayer = 2;
        } else {
          cell.textContent = "O";
          messageDiv.textContent = `${player1Name}, it's your turn!`;
          currentPlayer = 1;
        }
        checkWin();
      }
    });
  });

  function checkWin() {
    const winningCombinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9],
      [1, 5, 9],
      [3, 5, 7]
    ];

    for (let combination of winningCombinations) {
      const [a, b, c] = combination;
      const cellA = document.getElementById(a);
      const cellB = document.getElementById(b);
      const cellC = document.getElementById(c);

      if (
        cellA.textContent !== "" &&
        cellA.textContent === cellB.textContent &&
        cellA.textContent === cellC.textContent
      ) {
        if (cellA.textContent === "X") {
          messageDiv.textContent = `${player1Name}, congratulations! You won!`;
        } else {
          messageDiv.textContent = `${player2Name}, congratulations! You won!`;
        }
        disableCells();
        break;
      }
    }
  }

  function disableCells() {
    cells.forEach(cell => {
      cell.removeEventListener("click", function() {});
    });
  }
});
