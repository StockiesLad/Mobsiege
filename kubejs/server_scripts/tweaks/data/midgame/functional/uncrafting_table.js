recipes((event, funcs) => {
     funcs.replaceOutputRecipe('twilightforest:uncrafting_table', r => funcs.generate(r, '#forge:workbench').flatSquare(3).override([['create:mechanical_saw', 4], ['twilightforest:maze_map_focus', [1, 7]]]).next().vanilla())
})