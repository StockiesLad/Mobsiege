PlayerEvents.loggedIn(event => {
    if (!event.player.stages.has('starting_items')) {
      event.player.inventory.clear();
      event.player.stages.add('starting_items');
      //event.player.give('');
    }
 })
   
 ServerEvents.loaded(event => {
    const {server} = event
    if (!server.persistentData.firstLoaded) {
      server.persistentData.firstLoaded = true
      server.gameRules.set("playerSleepingPercentage", 0)
    }
 })