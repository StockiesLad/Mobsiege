recipes((event, funcs) => {
     common.alwaysArray(['sulfur', 'smoky', 'rose']).forEach(quartzType => {
          funcs.globalCrushing([`cinderscapes:${quartzType}_quartz`, Item.of(`cinderscapes:${quartzType}_quartz`).withChance(0.75), Item.of(`cinderscapes:${quartzType}_quartz`).withChance(0.5)], `cinderscapes:polypite_${quartzType}_quartz`)
          event.replaceOutput({id: `cinderscapes:${quartzType}_quartz_block`}, 'minecraft:quartz_block', `cinderscapes:crystalline_${quartzType}_quartz`)
          funcs.slab(funcs.removeByOutput(`6x cinderscapes:${quartzType}_quartz_slab`), `cinderscapes:crystalline_${quartzType}_quartz`).vanilla()
          funcs.stairs(funcs.removeByOutput(`4x cinderscapes:${quartzType}_quartz_stairs`), `cinderscapes:crystalline_${quartzType}_quartz`).vanilla()
          funcs.twoSquare(funcs.removeByOutput(`4x cinderscapes:smooth_${quartzType}_quartz_slab`), `cinderscapes:${quartzType}_quartz_slab`).vanilla()
          funcs.twoSquare(funcs.removeByOutput(`4x cinderscapes:smooth_${quartzType}_quartz_stairs`), `cinderscapes:${quartzType}_quartz_stairs`).vanilla()
     })

     event.smelting('minecraft:quartz', dataTag + 'quartz/elemental').xp(0.1)

     funcs.globalCrushing([preferredStack(data + 'gems/sulfur'), preferredStack(data + 'gems/sulfur').withChance(0.5)], dataTag + 'sulfur_quartz')
     funcs.globalCrushing([Item.of(content.coal), Item.of(content.coal).withChance(0.5)], dataTag + 'smoky_quartz')
     funcs.globalCrushing([Item.of('create:rose_quartz'), Item.of('create:rose_quartz').withChance(0.5)], dataTag + 'rose_quartz')
})


ServerEvents.tags('item', event => {
     event.remove(data + 'quartz', ['cinderscapes:sulfur_quartz', 'cinderscapes:smoky_quartz', 'cinderscapes:rose_quartz'])
     event.remove(data + 'ores/quartz', ['cinderscapes:sulfur_quartz_ore', 'cinderscapes:smoky_quartz_ore', 'cinderscapes:rose_quartz_ore'])
     addEntriesRespectively(event, [
          ['%sulfur_quartz', 'cinderscapes:sulfur_quartz'], 
          ['%gems/sulfur_quartz', 'cinderscapes:sulfur_quartz'], 
          ['%ores/sulfur_quartz', 'cinderscapes:sulfur_quartz_ore'],

          ['%smoky_quartz', 'cinderscapes:smoky_quartz'], 
          ['%gems/smoky_quartz', 'cinderscapes:smoky_quartz'], 
          ['%ores/smoky_quartz', 'cinderscapes:smoky_quartz_ore'], 

          ['%rose_quartz', 'cinderscapes:rose_quartz'],
          ['%gems/rose_quartz', ['biomesoplenty:rose_quartz_chunk', 'create:rose_quartz', 'cinderscapes:rose_quartz']],
          ['%ores/rose_quartz', 'cinderscapes:rose_quartz_ore'], 

          ['%quartz/elemental', [dataTag + 'gems/sulfur_quartz', dataTag + 'gems/smoky_quartz', dataTag + 'gems/rose_quartz']],
          ['%quartz', [dataTag + 'quartz/elemental', 'actuallyadditions:black_quartz']]
     ])
})