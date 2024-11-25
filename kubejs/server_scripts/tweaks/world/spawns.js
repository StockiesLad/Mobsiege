EntityEvents.spawned('minecraft:creeper', event => {
     var level = event.getLevel()
     if (level.random.nextInt(100) == 0) {
         const {entity} = event
         let nuclear_creeper = event.level.createEntity('alexscaves:nucleeper')
         nuclear_creeper.setPosition(entity.x, entity.y, entity.z)
         nuclear_creeper.spawn()
         event.cancel()
     }
 })

 EntityEvents.spawned('lava_monster:lava_monster', event => {
    var level = event.getLevel()
    if (level.random.nextInt(4) == 0) {
        const {entity} = event
        let blaze = event.level.createEntity('minecraft:blaze')
        blaze.setPosition(entity.x, entity.y, entity.z)
        blaze.spawn()
    }
})
   
 EntityJSEvents.biomeSpawns(event => {
     event.addSpawn('thermal:blitz', ['#aether:is_aether'], 10, 1, 3);
     event.addSpawn('trials:breeze', ['#aether:is_aether'], 10, 1, 3);
     event.addSpawn('trials:breeze', ['#minecraft:is_overworld'], 15, 2, 4);
     event.removeSpawn('undead_revamp2:bigsucker', ['#aether:is_aether'])
 });