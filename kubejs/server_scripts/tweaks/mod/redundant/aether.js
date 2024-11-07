ServerEvents.recipes(event => {
    //var skyroot_stick_recipes = [{input: '#aether:skyroot_tool_crafting', outputQuantities: ['1x', '2x']}, {input: '#aether:crafts_skyroot_planks', outputQuantities: ['6x', '8x']}]
    //var tools = ['pickaxe', 'axe', 'hoe', 'sword', 'shovel']

    /*global.TOOLS.forEach(tool => event.remove([{output: 'aether:skyroot_' + tool}, {output: 'aether:holystone_' + tool}]))
    event.remove({id: 'deep_aether:skyroot_crafting_table'})
    event.remove({id: 'ancient_aether:skyroot_crafting_table_from_ancient_aether_planks'})*/

    //event.remove({output: 'aether:skyroot_stick'})
    
    /*skyroot_stick_recipes.forEach(element => {
        element.outputQuantities.forEach(quantity => {
            
            var tool = '#notreepunching:saws'
            if (quantity == '1x' || quantity == '6x')
                tool = '#minecraft:axes'
            tool_damaging_shapeless(event, quantity + ' aether:skyroot_stick', [element.input, tool])
        })
    })*/
})

/*ServerEvents.tags('block', event => {
    //event.add('minecraft:valid_spawn', 'aether:cold_aercloud')
})*/

