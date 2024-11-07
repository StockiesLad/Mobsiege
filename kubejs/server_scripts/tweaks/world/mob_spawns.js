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

EntityJSEvents.biomeSpawns(event => {
    event.addSpawn('thermal:blitz', ['#aether:is_aether'], 20, 3, 5);
    event.addSpawn('trials:breeze', ['#aether:is_aether'], 20, 3, 5);
    event.addSpawn('trials:breeze', ['#minecraft:is_overworld'], 15, 2, 4);
    event.removeSpawn('undead_revamp2:bigsucker', ['#aether:is_aether'])
});