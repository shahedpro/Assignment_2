document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input-field');
    const invalidMsg = document.getElementById('invalid-msg');
    const teamsContainer = document.getElementById('teams');
  
    searchButton.addEventListener('click', () => {
      const query = searchInput.value.trim();
      if (query === '') {
        invalidMsg.textContent = 'Please enter a player name.';
        return;
      }
      
      invalidMsg.textContent = ''; 
      searchPlayer(query);
    });
  
    const searchPlayer = async (playerName) => {
      try {
        const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/searchplayers.php?p=${encodeURIComponent(playerName)}`);
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        
        if (data.player) {
          displayPlayers(data.player);
        } else {
          invalidMsg.textContent = 'No players found.';
        }
      } catch (error) {
        invalidMsg.textContent = 'An error occurred while fetching the data.';
        console.error('Error fetching data:', error);
      }
    };
  
    const displayPlayers = (players) => {
      teamsContainer.innerHTML = ''; 
  
      players.forEach(player => {
        const playerCard = document.createElement('div');
        playerCard.classList.add('col');
  
        playerCard.innerHTML = `
          <div class="card h-100">
            <img src="${player.strCutout || 'default-player.png'}" class="card-img-top" alt="${player.strPlayer}">
            <div class="card-body">
              <h5 class="card-title">${player.strPlayer}</h5>
              <p class="card-text">${player.strDescriptionEN ? player.strDescriptionEN.substring(0, 100) + '...' : 'No description available.'}</p>
            </div>
          </div>
        `;
  
        teamsContainer.appendChild(playerCard);
      });
    };
  });
  