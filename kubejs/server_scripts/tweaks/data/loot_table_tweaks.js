ServerEvents.highPriorityData(event => {
    var blockEntry = (overrides, blocks) => {
        return {
            overrides: overrides,
            blocks: global.ensureArray(blocks)
        }
    }
    var simpleBlockEntry = (blocks) => blockEntry({}, blocks)
    var materialDrops = [
        //Ores
        {
            dropMaterial: (materialTag, block) => AlmostUnified.getPreferredItemForTag('forge:raw_materials/uranium').getIdLocation().toString(),
            functions: [basicFortuneLtFunction(1), {function: "minecraft:explosion_decay"}],
            blocks: [
                blockEntry({functions: setCountFunction(rangeCount(2, 5), false)}, 'alexscaves:radrock_uranium_ore'),
                blockEntry({functions: setCountFunction(rangeCount(1, 2), false)}, [
                    'beo:end_uranium_ore', 
                    'bno:nether_uranium_ore',
                    'mekanism:uranium_ore',
                    'mekanism:deepslate_uranium_ore',
                    'mekanismaaa:glacio_uranium_ore',
                    'mekanismaaa:mars_uranium_ore',
                    'mekanismaaa:mercury_uranium_ore',
                    'mekanismaaa:venus_uranium_ore'
                ])
            ]
        },
        {
            dropMaterial: (materialTag, block) => AlmostUnified.getPreferredItemForTag(materialTag + block.toString().split('_')[1]).getIdLocation().toString(),
            functions: [setCountFunction(rangeCount(1, 4), false), basicFortuneLtFunction(1), {function: "minecraft:explosion_decay"}],
            blocks: [
                simpleBlockEntry([
                    'beo:end_silver_ore', 
                    'beo:end_osmium_ore', 
                    'beo:end_lead_ore', 
                    'beo:end_aluminum_ore', 
                    'beo:end_nickel_ore', 
                    'beo:end_tin_ore', 
                    'beo:end_zinc_ore',
                    'bno:nether_silver_ore',
                    'bno:nether_lead_ore',
                    'bno:nether_nickel_ore',
                    'bno:nether_aluminum_ore',
                    'bno:nether_tin_ore',
                    'bno:nether_osmium_ore',
                    'bno:nether_zinc_ore'
                ])
            ]
        },
        {
            dropMaterial: (materialTag, block) => AlmostUnified.getPreferredItemForTag(materialTag + block.toString().split(':')[1].split('_')[0]).getIdLocation().toString(),
            functions: [setCountFunction(constantCount(1), false), basicFortuneLtFunction(1), {function: "minecraft:explosion_decay"}],
            blocks: [
                blockEntry({literalDrop: 'createoreexcavation:raw_redstone'}, 'gravelores:redstone_gravel_ore'),
                blockEntry({literalDrop: 'minecraft:coal'}, 'gravelores:coal_gravel_ore'),
                blockEntry({materialTag: 'forge:dusts/'}, [
                    'gravelores:cobalt_gravel_ore'
                ]),
                blockEntry({materialTag: 'forge:gems/'}, [
                    'gravelores:emerald_gravel_ore',
                    'gravelores:diamond_gravel_ore',
                    'gravelores:lapis_gravel_ore',
                    'gravelores:quartz_gravel_ore'
                ]),
                simpleBlockEntry([
                    'gravelores:uranium_gravel_ore',
                    'gravelores:silver_gravel_ore', 
                    'gravelores:aluminum_gravel_ore', 
                    'gravelores:copper_gravel_ore', 
                    'gravelores:iron_gravel_ore', 
                    'gravelores:osmium_gravel_ore', 
                    'gravelores:nickel_gravel_ore', 
                    'gravelores:zinc_gravel_ore', 
                    'gravelores:lead_gravel_ore', 
                    'gravelores:tin_gravel_ore', 
                    'gravelores:gold_gravel_ore'
                ]),
            ]
        },
        {
            dropMaterial: (materialTag, block) => AlmostUnified.getPreferredItemForTag('forge:gems/sulfur').getIdLocation().toString(),
            functions: [basicFortuneLtFunction(1), limitCountFunction(1, 5), {function: "minecraft:explosion_decay"}],
            blocks: [
                blockEntry({functions: setCountFunction(rangeCount(2, 5), false)}, 'alexscaves:sulfur_cluster'),
                blockEntry({functions: setCountFunction(rangeCount(0, 1), false)}, [
                    'betterend:sulphur_crystal',
                    'alexscaves:sulfur_bud_small',
                    'alexscaves:sulfur_bud_medium',
                    'alexscaves:sulfur_bud_large'
                ])
            ]
        },
        //Carbonize Blocks
        {
            dropMaterial: (materialTag, block) => 'minecraft:charcoal',
            functions: {function: "minecraft:explosion_decay"},
            blocks: [
                blockEntry({functions: [setCountFunction(rangeCount(0, 1), false), basicFortuneLtFunction(1)]}, 'carbonize:charcoal_log'),
                blockEntry({functions: [setCountFunction(rangeCount(1, 2), false), basicFortuneLtFunction(0.6)]}, 'carbonize:charcoal_planks'),
                blockEntry({functions: setCountFunction(constantCount(1), false)}, 'carbonize:charcoal_stairs'),
                blockEntry({functions: setCountFunction(rangeCount(0, 1), false)}, 'carbonize:charcoal_slab')
            ]
        }
    ]

    materialDrops.forEach(ltObject => {
        global.ensureArray(ltObject.blocks).forEach(blockEntry => {
            let overrides = blockEntry.overrides
            blockEntry.blocks.forEach(block => {
                var functions = global.ensureArray(ltObject.functions)
                var materialTag = 'forge:raw_materials/'
                var dropMaterial

                if (Object.getOwnPropertyDescriptor(overrides, "functions") != null)
                    global.pushAll(functions, global.ensureArray(overrides.functions))
                if (Object.getOwnPropertyDescriptor(overrides, "materialTag") != null)
                    materialTag = overrides.materialTag
                if (Object.getOwnPropertyDescriptor(overrides, "literalDrop") != null)
                    dropMaterial = overrides.literalDrop
                else dropMaterial = ltObject.dropMaterial(materialTag, block)

                BasicBlockLt(event, block, identifier => [
                    silkTouchLtEntryChild(identifier), 
                    ltEntryChild(
                        'minecraft:item',  
                        dropMaterial, 
                        functionsAsModifier(functions)
                    )
                ])
            })
        })
    })
})