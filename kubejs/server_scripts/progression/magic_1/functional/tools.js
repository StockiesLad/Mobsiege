recipes((event, funcs) => {
     common.alwaysArray(['projecte:dm_pick', 'projecte:dm_axe', 'projecte:dm_shovel', 'projecte:dm_sword', 'projecte:dm_hoe', 'projecte:dm_shears', 'projecte:dm_hammer'])
     .forEach( tool => event.replaceInput({output: tool}, 'minecraft:diamond', '#forge:rods/diamond'))
})