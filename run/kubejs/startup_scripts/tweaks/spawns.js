if (Modpack2Gradle.isCategoryEnabled(Modpack2Gradle.LIFECYCLE)) {
    EntityJSEvents.spawnPlacement(event => {
        var handle = (entity, overworldArgs) => event.replace(entity, "on_ground", "motion_blocking_no_leaves", (entityType, levelAccessor, spawntype, blockPos, randomSource) => {
            var level = levelAccessor.level
            var blockId = level.getBlock(blockPos.below())
            if (level.dimension == 'aether:the_aether') {
                return blockPos.getY() >= 100 && blockId == 'aether:cold_aercloud' // y limit was 35 but ancient aether generates higher
            } else if (overworldArgs != null && level.dimension == 'minecraft:overworld') {
                return overworldArgs(entityType, levelAccessor, spawntype, blockPos, randomSource)
            } else return false
        })
        if (Modpack2Gradle.isModEnabled("trials"))
            handle(TrialsMobs.BREEZE.get(), (entityType, levelAccessor, spawntype, blockPos, randomSource) => Monster.checkMonsterSpawnRules(entityType, levelAccessor, spawntype, blockPos, randomSource))
        else console.warn("Trials & Chambers not enabled! Breeze spawn registration skipped...")
        if (Modpack2Gradle.isModEnabled("thermal_foundation"))
            handle(ThermalCoreEntities.BLITZ.get(), (entityType, levelAccessor, spawntype, blockPos, randomSource) => Blitz.canSpawn(entityType, levelAccessor, spawntype, blockPos, randomSource))
        else console.warn("Thermal Foundation not enabled! Breeze spawn registration skipped...")
    })
}

