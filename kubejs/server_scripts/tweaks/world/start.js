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