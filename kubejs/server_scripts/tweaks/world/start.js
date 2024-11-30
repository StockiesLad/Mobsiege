PlayerEvents.loggedIn(event => {
    if (!event.player.stages.has('starting_items')) {
      event.player.stages.add('starting_items');
      event.player.inventory.clear();
      event.player.give(Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:modpack_guide"}'));
      }
 })
/*
 ServerEvents.loaded(event => {
    const {server} = event
    if (server.persistentData['firstLoaded'] == null) {
      server.gameRules.set("playerSleepingPercentage", 0)
      server.persistentData.firstLoaded = true
    }
 })*/