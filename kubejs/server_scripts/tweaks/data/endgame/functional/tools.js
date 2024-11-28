recipes((event, funcs) => {
     comfuncs.iterate(
          ['projecte:dm_pick', 'projecte:dm_axe', 'projecte:dm_shovel', 'projecte:dm_sword', 'projecte:dm_hoe', 'projecte:dm_shears', 'projecte:dm_hammer'], 
          tool => event.replaceInput({output: tool}, 'minecraft:diamond', '#forge:rods/diamond')
     )
})