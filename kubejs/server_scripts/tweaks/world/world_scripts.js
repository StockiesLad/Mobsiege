PlayerEvents.loggedIn(event => {
  if (!event.player.stages.has('starting_items')) {
	  event.player.inventory.clear();
    event.player.stages.add('starting_items');
	//event.player.give('');
  }
})

ServerEvents.loaded(event => {
  const {server} = event
  if (!server.persistentData.gameRules) {
    server.gameRules.set("playerSleepingPercentage", 0)
    server.persistentData.gameRules = true
  }
})

const tancc = 'toughasnails:climate_clemency'
PlayerEvents.tick(event => {
    var player = event.player
    var playerName = player.getGameProfile().getName()
    if (player.inventory.contains(global.REGULATOR) && !player.hasEffect(tancc))
        player.server.runCommandSilent('execute run effect give ' + playerName + ' ' + tancc + ' infinite')
    if (!player.inventory.contains(global.REGULATOR) && player.hasEffect(tancc)) 
        player.server.runCommandSilent('execute run effect clear ' + playerName + ' ' + tancc)
})