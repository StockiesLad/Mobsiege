const Monster = Java.loadClass('net.minecraft.world.entity.monster.Monster')
const TrialsMobs = Java.loadClass('net.salju.trialstowers.init.TrialsMobs')
const TCoreEntities = Java.loadClass('cofh.thermal.core.init.registries.TCoreEntities')
const Blitz = Java.loadClass('cofh.thermal.core.common.entity.monster.Blitz')

BlockEvents.modification(event => {
    event.modify('aether:cold_aercloud', block => block.properties.isValidSpawn((state, blockGetter, blockPos, spacePlacement, entityType) => true))
})


EntityJSEvents.spawnPlacement(event => {
    var handle = (entity, overworldArgs) => event.replace(entity, "on_ground", "motion_blocking_no_leaves", (entityType, levelAccessor, spawntype, blockPos, randomSource) => {
        var level = levelAccessor.level
        var blockId = level.getBlock(blockPos.below())
        if (level.dimension == 'aether:the_aether') {
            return blockPos.getY() >= 100 && !(blockId == 'aether:golden_aercloud'|| blockId == 'aether_genesis:green_aercloud' || 
                blockId == 'aether_genesis:purple_aercloud' || blockId == 'aether_redux:blighted_aercloud', blockId == 'deep_aether:chromatic_aercloud')
        } else if (overworldArgs != null && level.dimension == 'minecraft:overworld') {
            return overworldArgs(entityType, levelAccessor, spawntype, blockPos, randomSource)
        } else return false
    })

    handle(TrialsMobs.BREEZE.get(), (entityType, levelAccessor, spawntype, blockPos, randomSource) => Monster.checkMonsterSpawnRules(entityType, levelAccessor, spawntype, blockPos, randomSource))
    handle(TCoreEntities.BLITZ.get(), (entityType, levelAccessor, spawntype, blockPos, randomSource) => Blitz.canSpawn(entityType, levelAccessor, spawntype, blockPos, randomSource))
})

StartupEvents.modifyCreativeTab('aether:equipment_and_utilities', event => {
    global.TOOLS.forEach(tool => {
        ['aether:skyroot_', 'aether:holystone_'].forEach(material => {
            var id = material + tool
            event.remove(id)
            global.HIDDEN_ITEMS.push(id)
        })
    })
})