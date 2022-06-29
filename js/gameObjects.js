function initGameObjects() {
  const startScreen = document.querySelector(".start-screen");
  const gameScreen = document.querySelector(".game-screen");
  const playAgainScreen = document.querySelector('.play-again');
  const userSettings = document.querySelector('.user-settings');
  const scoreElement = document.querySelector('.score');


  return {
    startScreen,
    gameScreen,
    playAgainScreen,
    userSettings,
    scoreElement,
    createWizard(initialState) {
        const wizardElement = document.createElement("div");
        wizardElement.classList.add('wizard');
        wizardElement.style.width = initialState.width + 'px';
        wizardElement.style.height = initialState.height + 'px';
        wizardElement.style.top = initialState.posX + 'px';
        wizardElement.style.left = initialState.posY + 'px';
        this.wizardElement = wizardElement;
        gameScreen.appendChild(wizardElement);
        return wizardElement;
    },
    createBug(initialState) {
        const bugElement = document.createElement('div');
        bugElement.classList.add('bug');
        bugElement.style.width = initialState.width + 'px';
        bugElement.style.height = initialState.height + 'px';
        // bugElement.style.top = Math.ceil(Math.random() * (gameScreen.offsetHeight - initialState.height)) + 'px';
        // bugElement.style.left = (gameScreen.offsetWidth - initialState.width) + 'px';
        bugElement.style.top = Math.ceil(Math.random() * (gameScreen.offsetHeight - initialState.height)) + 'px';
        bugElement.style.left = (gameScreen.offsetWidth - initialState.width) + 'px';
        

        gameScreen.appendChild(bugElement);
    },
    createFireBall(state) {
        const fireBall = document.createElement('div');
        fireBall.classList.add('fire-ball');
        fireBall.style.width = state.fireBall.width + 'px';
        fireBall.style.height = state.fireBall.height + 'px';

        fireBall.style.top = state.wizard.posY + state.wizard.height / 3.5 + 'px';
        fireBall.style.left = state.wizard.posX + state.wizard.width + 'px';
        gameScreen.appendChild(fireBall);
    },
    createCloud(cloud) {
        const cloudElement = document.createElement('div');
        cloudElement.classList.add('cloud');
        cloudElement.style.width = cloud.width + 'px';
        cloudElement.style.height = cloud.height  + 'px';

        cloudElement.style.left = (gameScreen.offsetWidth - cloud.width) + 'px';
        cloudElement.style.top = Math.floor(Math.random() * (gameScreen.offsetHeight / 4 - cloud.height)) + 'px';

        game.gameScreen.appendChild(cloudElement);
    },
    createZombie(zombie) {
        const zombieElement = document.createElement('div');
        zombieElement.classList.add('zombie-left');
        zombieElement.style.width = zombie.width + 'px';
        zombieElement.style.height = zombie.height + 'px';
        zombieElement.style.top = gameScreen.offsetHeight - zombie.height * 1.9 + 'px';
        zombieElement.style.left = (gameScreen.offsetWidth - zombie.width) + 'px';

        this.zombieElement = zombieElement;
        gameScreen.appendChild(zombieElement);
        return zombieElement;
    }
  };
}
