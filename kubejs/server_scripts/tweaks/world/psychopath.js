commonTags((event, funcs) => {
     event.add('forge:soil/grass', comfuncs.packDef('corpstone'))
     event.add('forge:terrain/nether', comfuncs.packDef('corpstone'))
     event.add('forge:stones/nether', comfuncs.packDef('corpstone'))
     event.add('forge:netherrack', comfuncs.packDef('corpstone'))
})

blockTags((event, funcs) => {
     event.add('minecraft:infiniburn_nether', comfuncs.packDef('corpstone'))
})

basicLootTables((event, funcs) => {
     function item(item, weight) {
         return {
             type: "minecraft:item",
             name: item,
             weight: weight
         }
     }

     funcs.raw('block', comfuncs.packDef('decapitated_debris'), {
          pools: [
               {
                    conditions: comfuncs.ensureArray(conditionInverted(conditionSilkTouch())),
                    functions: comfuncs.ensureArray(funcFortune(formulaUniformBonus(1))),
                    rolls: 8,
                    entries: [{
                    type: "minecraft:group",
                    children: [
                         item('minecraft:rotten_flesh', 6),
                         item('minecraft:bone', 4)
                    ]
                    }]
               },
               {
                    rolls: 1,
                    entries: [{
                    type: "minecraft:item",
                    name: comfuncs.packDef('decapitated_debris'),
                    conditions: comfuncs.ensureArray(conditionSilkTouch())
                    }]
               }
          ]
     }) 
 })
 