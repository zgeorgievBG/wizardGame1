function initState() {
  const state = {
    player: "",
    score: 0,
    wizard: {
      width: 115,
      height: 140,
      posX: 100,
      posY: 100,
      speed: 0
    },
    bug: {
        width: 60,
        height: 60,
        speed: 0,
        nextSpawnTimestamp: 0,
        bugSpawnInterval: 4500
    },
    zombie: {
        spawn: false,
        width: 140,
        height: 160,
        speed: 1,
        nextSpawnTimestamp: 0,
        zombieSpawnInterval: 5000
    },
    fireBall: {
        width: 60,
        height:60,
        speed: 10,
        nextFireBallSpawnTimestamp: 0,
        fireBallSpawnInterval: 500
    },
    cloud: {
        width: 150,
        height: 150,
        speed: 1,
        nextCloudSpawnTimestamp: 0,
        cloudSpawnTimeInterval: 20000
    },
    keys: {
        KeyA: false,
        KeyW: false,
        KeyS: false,
        KeyD: false,
        Space: false
    }
  };

  return state;
}
