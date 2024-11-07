/*const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries')
const Shapes = Java.loadClass('net.minecraft.world.phys.shapes.Shapes')
const Blocks = Java.loadClass('net.minecraft.world.level.block.Blocks')*/

ServerEvents.recipes(event => {
    /*square2x2Recipe(event, 'carbonize:ash_block', 'carbonize:ash')
    horizontal2x1Recipe(event, '3x carbonize:ash_layer', 'carbonize:ash_block')*/
})

/*ServerEvents.highPriorityData(event => {
    let charcoal_blocks = [
        {block: 'carbonize:charcoal_log', functions: [setCountFunction(rangeCount(4, 6), false), basicFortuneLtFunction(1)]},
        {block: 'carbonize:charcoal_planks', functions: [setCountFunction(rangeCount(1, 2), false), basicFortuneLtFunction(0.6)]},
        {block: 'carbonize:charcoal_stairs', functions: [setCountFunction(constantCount(1), false)]},
        {block: 'carbonize:charcoal_slab', functions: [setCountFunction(rangeCount(0, 1), false)]}
    ]
    charcoal_blocks.forEach(element => {
        element.functions.push({function: "minecraft:explosion_decay"})
        BasicBlockLt(event, element.block, identifier => [
            silkTouchLtEntryChild(identifier), 
            ltEntryChild('minecraft:item', 'minecraft:charcoal', {functions: element.functions}
        )])
    })    
})*/
/*
ServerEvents.tags('block', event => {
    ForgeRegistries.BLOCKS.getEntries().forEach(blockEntry => {
        let fullBlock = Shapes.block()
        let block = blockEntry.getValue()
        try {
            let blockState = block.defaultBlockState()
            let fabricfbr = Blocks.FIRE.fabric_getVanillaEntry(blockState)

            if (fullBlock.equals(blockState.getCollisionShape(null, null, null)))
                if (!blockState.isFlammable(null, null, null) && !(fabricfbr.getSpreadChance() > 0 || fabricfbr.getSpreadChance() > 0))
                    event.add('carbonize:charcoal_pile_valid_wall', blockEntry.getKey().location().toString())
        } catch (err) {}
    });
})*/