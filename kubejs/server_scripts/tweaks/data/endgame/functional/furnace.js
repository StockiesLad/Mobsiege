recipes((event, funcs) => {
     funcs.replaceOutputRecipe('projecte:dm_furnace', r => funcs.planetAlt(r, 'ironfurnaces:diamond_furnace', 'projecte:dark_matter', 'enderio:ender_crystal'))
     funcs.replaceOutputRecipe('projecte:rm_furnace', r => funcs.planetAlt(r, 'projecte:dm_furnace', 'projecte:red_matter', 'enderio:ender_crystal'))

})