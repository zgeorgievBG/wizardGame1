function start(state, game) {
    game.createWizard(state.wizard);
    console.log('here after play again');
    const stopId = window.requestAnimationFrame(gameLoop.bind(null, state, game));
    state.stopId = stopId;
}

function gameLoop(state, game, timestamp) {
    const {wizard} = state;
    const {wizardElement} = game;
    modifyWizardPosition(state, game);

    console.log();

    //Spawn fireball
    if(state.keys.Space) {
        if(timestamp > state.fireBall.nextFireBallSpawnTimestamp) {
            game.wizardElement.style.backgroundImage = 'url("../images/wizard-fire.png")';
            game.createFireBall(state);
            state.fireBall.nextFireBallSpawnTimestamp = timestamp + Math.random() * state.fireBall.fireBallSpawnInterval;
        }
    } else {
        game.wizardElement.style.backgroundImage = 'url("../images/wizard.png")';
    }

    //Spawn Zombies
    if(state.zombie.spawn) {
        if(timestamp > state.zombie.nextSpawnTimestamp) {
            game.createZombie(state.zombie);
            state.zombie.nextSpawnTimestamp = timestamp + Math.random() * state.zombie.zombieSpawnInterval;
        }
    }

    //Spawn Bugs
    if(timestamp > state.bug.nextSpawnTimestamp) {
        game.createBug(state.bug);
        state.bug.nextSpawnTimestamp = timestamp + Math.random() * state.bug.bugSpawnInterval;
    }
 
    // Spawn clouds
    // if(timestamp > state.cloud.nextCloudSpawnTimestamp) {
    //     game.createCloud(state.cloud);
    //     state.cloud.nextCloudSpawnTimestamp = timestamp + Math.random() * state.cloud.cloudSpawnTimeInterval;
    // }
    
   //Render Wizard
   wizardElement.style.top = wizard.posY + 'px';
   wizardElement.style.left = wizard.posX + 'px';

   //Render Bugs
   const bugs = document.querySelectorAll('.bug');
   const zombies = document.querySelectorAll('.zombie-left');

   bugs.forEach(bug => {
       if(isCollision(bug, wizardElement)) {
           state.isGameOver = true;
       }
    let posX = parseInt(bug.style.left);
    bug.style.left = posX - state.bug.speed + 'px';
    if(posX < 0) {
        bug.parentElement.removeChild(bug);
    }
   });

   //Spawn zombies

   zombies.forEach(zombie => {
    let posX = parseInt(zombie.style.left);
    zombie.style.left = posX - state.zombie.speed + 'px';
    if(posX < 0) {
        zombie.parentElement.removeChild(zombie);
    }
   });

//    Render Clouds 
//    document.querySelectorAll('.cloud').forEach(cloud => {
//        let cloudPosition = parseInt(cloud.style.left);
//        cloud.style.left = cloudPosition - state.cloud.speed + 'px';
//        if(cloudPosition < 0) {
//            cloud.parentElement.removeChild(cloud);
//        }
//    });
   //Render fireball
   document.querySelectorAll('.fire-ball').forEach(fball => {
       //Detect collision
    bugs.forEach(bug => {
        if(isCollision(bug, fball)) {
            state.score += 10;
            game.scoreElement.textContent = `Current score: ${state.score}`;
          
            // game.scoreElement.textContent =   `${(timestamp % 60).toFixed(2)}`;

            bug.remove();
            fball.remove();
        }
    zombies.forEach(z => {
        console.log(z);
        if(isCollision(fball, z)) {
        state.score += 20;
        game.scoreElement.textContent = `${state.player} Score: ${state.score}`;
        z.remove();
        fball.remove();
        }
    });   
    });

    const posX = parseInt(fball.style.left);
    if(posX > game.gameScreen.offsetWidth) {
        fball.remove();
    }
    fball.style.left = posX + state.fireBall.speed + 'px';
   });
   
   //Game over 
   if(state.isGameOver) {
        game.gameScreen.classList.add('hidden');
        game.playAgainScreen.classList.remove('hidden');
        game.userSettings.classList.remove('hidden');
        window.cancelAnimationFrame(state.stopId);
   } else {
       window.requestAnimationFrame(gameLoop.bind(null, state, game));
   }
}

function modifyWizardPosition(state, game) {
    const {wizard} = state;
    
    if(state.keys.KeyW) {
        wizard.posY = Math.max(wizard.posY - wizard.speed,0);
    }
    if(state.keys.KeyS) {
        wizard.posY = Math.min(wizard.posY + wizard.speed, game.gameScreen.offsetHeight - wizard.height);
    }

    if(state.keys.KeyA) {
        wizard.posX = Math.max(wizard.posX - wizard.speed,0);
    }
    if(state.keys.KeyD) {
        wizard.posX = Math.min(wizard.posX + wizard.speed, game.gameScreen.offsetWidth - wizard.width);
    }

}

function isCollision(objectA, objectB) {
    const first = objectA.getBoundingClientRect();
    const second = objectB.getBoundingClientRect();

    const hasCollision = !(first.top > second.bottom || first.bottom < second.top || first.right < second.left || first.left > second.right);
    return hasCollision;
}