PlayerEvents.loggedIn(event => {
    if (!event.player.stages.has('starting_items')) {
      event.player.stages.add('starting_items')
      event.player.inventory.clear();
      event.player.give('minecraft:golden_apple')
      //event.player.give(Item.of('patchouli:guide_book', '{"patchouli:book":"patchouli:modpack_guide"}'))
      event.player.give(Item.of('akashictome:tome', '{"akashictome:data":{alexscaves:{Count:1b,id:"alexscaves:cave_book",tag:{"akashictome:displayName":{text:\'{"translate":"item.alexscaves.cave_book"}\'},"akashictome:is_morphing":1b,display:{Name:\'{"translate":"akashictome.sudo_name","with":[{"color":"green","translate":"item.alexscaves.cave_book"}]}\'}}},alexsmobs:{Count:1b,id:"alexsmobs:animal_dictionary"},integratedtunnels:{Count:1b,id:"integrateddynamics:on_the_dynamics_of_integration",tag:{"akashictome:displayName":{text:\'{"translate":"item.integrateddynamics.on_the_dynamics_of_integration"}\'},"akashictome:is_morphing":1b,display:{Name:\'{"translate":"akashictome.sudo_name","with":[{"color":"green","translate":"item.integrateddynamics.on_the_dynamics_of_integration"}]}\'}}},patchouli:{Count:1b,id:"patchouli:guide_book",tag:{"akashictome:displayName":{text:\'{"translate":"A Hostile World"}\'},"akashictome:is_morphing":1b,display:{Name:\'{"translate":"akashictome.sudo_name","with":[{"color":"green","translate":"A Hostile World"}]}\'},"patchouli:book":"patchouli:modpack_guide"}}},"akashictome:is_morphing":1b}'))
    }
 })

 ServerEvents.loaded(event => {
    const {server} = event
    if (server.persistentData['firstLoaded'] == null) {
      server.gameRules.set("playersSleepingPercentage", 0)
      server.gameRules.set("reducedDebugInfo", true)
      server.persistentData.firstLoaded = true
    }
 })