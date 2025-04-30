recipes((event, funcs) => {
     funcs.nuke('tinyredstone:silicon_compound')
     event.replaceOutput({output: 'projectred_core:silicon'}, 'projectred_core:silicon', preferredStack('forge:silicon'))
     event.replaceInput({input: 'projectred_core:silicon'}, 'projectred_core:silicon', '#forge:silicon')
     funcs.twoSquare('projectred_core:silicon', '#forge:silicon').vanilla()
     event.replaceInput({output: 'projectred_fabrication:rough_silicon_wafer'}, '#forge:silicon', 'projectred_core:silicon')
     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_redstone'), ['projectred_fabrication:rough_silicon_wafer', '#forge:dusts/redstone'], 5000)
     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_iron'), ['buildcraftsilicon:chipset_redstone', '#forge:dusts/iron'], 20000)
     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_gold'), ['buildcraftsilicon:chipset_redstone', '#forge:dusts/gold'], 30000)

     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_quartz'), ['buildcraftsilicon:chipset_redstone', '#forge:quartz'], 10000)
     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_diamond'), ['buildcraftsilicon:chipset_quartz', '#forge:dusts/diamond'], 50000)
     
     event.forEachRecipe({output: packTag('projectred/chips/raw_elemental')}, recipe => {
          recipe.replaceInput('#forge:silicon', 'projectred_fabrication:rough_silicon_wafer')
     })

     funcs.removeRecipes({output: packTag('projectred/chips/elemental')}, (result, ingredients) => {
          if (!Item.of(result).isEmpty())
               funcs.siliconAssemly(result, ingredients[0], 25000)
     })
})

itemTags((event, funcs) => {
     //event.add('forge:silicon', 'projectred_core:silicon')
     event.add(pack('projectred/chips/raw_elemental'), ['projectred_core:electrotine_silicon_comp', 'projectred_core:glow_silicon_comp', 'projectred_core:red_silicon_comp'])
     event.add(pack('projectred/chips/elemental'), ['projectred_core:energized_silicon', 'projectred_core:electrotine_silicon', 'projectred_core:infused_silicon'])
     event.add(pack('buildcraft/chips/advanced'), ['buildcraftsilicon:chipset_iron', 'buildcraftsilicon:chipset_gold', 'buildcraftsilicon:chipset_quartz', 'buildcraftsilicon:chipset_diamond'])
     event.add(pack('buildcraft/chips/all'), ['buildcraftsilicon:chipset_redstone', packTag('buildcraft/chips/advanced')])
})