document.addEventListener('DOMContentLoaded', function() {
    const playersData = [
        { username: 'PlayerOne', score: 950 },
        { username: 'PlayerTwo', score: 750 },
        { username: 'PlayerThree', score: 820 },
        { username: 'PlayerFour', score: 900 },
        { username: 'PlayerFive', score: 700 }
    ];

    function generateLeaderboard(players) {
        const sortedPlayers = players.sort((a, b) => b.score - a.score);
        const leaderboardElement = document.getElementById('leaderboard');

        sortedPlayers.forEach((player, index) => {
            const playerElement = document.createElement('div');
            playerElement.className = 'leaderboard-item';
            playerElement.innerHTML = `
                <span class="rank">${index + 1}</span>
                <span class="username">${player.username}</span>
                <span class="score">${player.score}</span>
            `;
            leaderboardElement.appendChild(playerElement);
        });
    }

    generateLeaderboard(playersData);
});
