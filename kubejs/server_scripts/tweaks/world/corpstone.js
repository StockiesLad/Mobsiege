commonTags((event, funcs) => {
     event.add('forge:soil/grass', comfuncs.packDef('corpstone'))
     event.add('forge:terrain/nether', comfuncs.packDef('corpstone'))
     event.add('forge:stones/nether', comfuncs.packDef('corpstone'))
     event.add('forge:netherrack', comfuncs.packDef('corpstone'))
})

blockTags((event, funcs) => {
     event.add('minecraft:infiniburn_nether', comfuncs.packDef('corpstone'))
})