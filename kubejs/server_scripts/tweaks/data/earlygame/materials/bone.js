recipes((event, funcs) => {
     event.shapeless('5x minecraft:bone', ['minecraft:bone_block', 'minecraft:bone_block'])
     funcs.generate('minecraft:bone_block', 'edenring:balloon_mushroom_stem').flatSquare(2).next().vanilla()
})