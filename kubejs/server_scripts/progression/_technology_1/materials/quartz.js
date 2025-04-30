recipes((event, funcs) => {
     common.alwaysArray(['sulfur', 'smoky', 'rose']).forEach(quartzType => {
          funcs.globalCrushing([`cinderscapes:${quartzType}_quartz`, Item.of(`cinderscapes:${quartzType}_quartz`).withChance(0.75), Item.of(`cinderscapes:${quartzType}_quartz`).withChance(0.5)], `cinderscapes:polypite_${quartzType}_quartz`)
          event.replaceOutput({id: `cinderscapes:${quartzType}_quartz_block`}, 'minecraft:quartz_block', `cinderscapes:crystalline_${quartzType}_quartz`)
          funcs.slab(funcs.removeByOutput(`6x cinderscapes:${quartzType}_quartz_slab`), `cinderscapes:crystalline_${quartzType}_quartz`).vanilla()
          funcs.stairs(funcs.removeByOutput(`4x cinderscapes:${quartzType}_quartz_stairs`), `cinderscapes:crystalline_${quartzType}_quartz`).vanilla()
          funcs.twoSquare(funcs.removeByOutput(`4x cinderscapes:smooth_${quartzType}_quartz_slab`), `cinderscapes:${quartzType}_quartz_slab`).vanilla()
          funcs.twoSquare(funcs.removeByOutput(`4x cinderscapes:smooth_${quartzType}_quartz_stairs`), `cinderscapes:${quartzType}_quartz_stairs`).vanilla()
     })

     event.smelting('minecraft:quartz', packTag('quartz/elemental')).xp(0.1)

     funcs.globalCrushing([preferredStack('forge:gems/sulfur'), preferredStack('forge:gems/sulfur').withChance(0.5)], '#forge:sulfur_quartz')
     funcs.globalCrushing([Item.of(content.coal), Item.of(content.coal).withChance(0.5)], '#forge:smoky_quartz')
     funcs.globalCrushing([Item.of('create:rose_quartz'), Item.of('create:rose_quartz').withChance(0.5)], '#forge:rose_quartz')
})


ServerEvents.tags('item', event => {
     event.remove('forge:quartz', ['cinderscapes:sulfur_quartz', 'cinderscapes:smoky_quartz', 'cinderscapes:rose_quartz'])
     event.remove('forge:ores/quartz', ['cinderscapes:sulfur_quartz_ore', 'cinderscapes:smoky_quartz_ore', 'cinderscapes:rose_quartz_ore'])
     addEntriesRespectively(event, [
          ['forge:sulfur_quartz', 'cinderscapes:sulfur_quartz'], 
          ['forge:gems/sulfur_quartz', 'cinderscapes:sulfur_quartz'], 
          ['forge:ores/sulfur_quartz', 'cinderscapes:sulfur_quartz_ore'],

          ['forge:smoky_quartz', 'cinderscapes:smoky_quartz'], 
          ['forge:gems/smoky_quartz', 'cinderscapes:smoky_quartz'], 
          ['forge:ores/smoky_quartz', 'cinderscapes:smoky_quartz_ore'], 

          ['forge:rose_quartz', 'cinderscapes:rose_quartz'],
          ['forge:gems/rose_quartz', ['biomesoplenty:rose_quartz_chunk', 'create:rose_quartz', 'cinderscapes:rose_quartz']],
          ['forge:ores/rose_quartz', 'cinderscapes:rose_quartz_ore'], 

          ['|quartz/elemental', ['#forge:gems/sulfur_quartz', '#forge:gems/smoky_quartz', '#forge:gems/rose_quartz']],
          ['forge:quartz', [packTag('quartz/elemental'), 'actuallyadditions:black_quartz']]
     ])
})