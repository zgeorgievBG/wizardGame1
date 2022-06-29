const game = initGameObjects();
const state = initState();

document.addEventListener('keydown', (e) => {
    state.keys[e.code] = true;
});

document.addEventListener('keyup', (e) => {
    state.keys[e.code] = false;
});


game.startScreen.addEventListener('click', (ev) => {
    
    state.bug.speed = document.getElementById('bugSpeed').value;
    state.wizard.speed = Number(document.getElementById('wizSpeed').value);
    state.bug.bugSpawnInterval = document.getElementById('bugSpawn').value;
    state.fireBall.speed = Number(document.getElementById('fballSpeed').value);
    state.zombie.spawn = document.getElementById('zombieSpawn').checked;
    if(document.getElementById('userName').value == '') {
        return alert('User name is required');
    } else {
        state.player = document.getElementById('userName').value;
    }
    game.startScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');
    game.userSettings.classList.add('hidden');
    document.getElementById('userName').value = '';
    start(state, game);
});

game.playAgainScreen.addEventListener('click', (ev) => {

    game.playAgainScreen.classList.add('hidden');
    game.gameScreen.classList.remove('hidden');
    start(state,game);
});

 