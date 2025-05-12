recipes((event, funcs) => {
     funcs.nuke('tinyredstone:silicon_compound')
     funcs.removeById(['enderio:smelting/tinyredstone/silicon', 'projectred_core:silicon'])

     event.shapeless(funcs.removeByOutput('4x projectred_core:sand_coal_comp'), 'betterend:charcoal_block')
     funcs.twoSquare('betterend:charcoal_block', 'projectred_core:sand_coal_comp').vanilla()
     funcs.remove({output: 'projectred_core:boule', type: 'minecraft:smelting'})
     event.blasting('projectred_core:boule', 'projectred_core:sand_coal_comp').xp(0.5)

     event.remove({output: preferredStack('forge:silicon'), type: 'minecraft:smelting'})

     funcs.toolDamagingShapeless(funcs.removeInsurely({output: preferredStack('forge:silicon').withCount(4), input: 'projectred_core:boule'}), ['#minecraft:saws', 'projectred_core:boule'])

     event.replaceOutput({output: 'projectred_core:silicon'}, 'projectred_core:silicon', preferredStack('forge:silicon'))
     event.replaceInput({input: 'projectred_core:silicon'}, 'projectred_core:silicon', '#forge:silicon')
     funcs.twoSquare('projectred_core:silicon', '#forge:silicon').vanilla()
     event.replaceInput({output: 'projectred_fabrication:rough_silicon_wafer'}, '#forge:silicon', 'projectred_core:silicon')
     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_redstone'), [preferredStack('forge:silicon'), '#forge:dusts/redstone'], 5000)
     funcs.siliconAssemly(content.glowstone_chipset, ['buildcraftsilicon:chipset_redstone', '#forge:dusts/glowstone'], 10000)
     funcs.siliconAssemly(content.infernal_chipset, ['buildcraftsilicon:chipset_redstone', '#forge:dusts/blaze'], 10000)
     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_quartz'), ['buildcraftsilicon:chipset_redstone', '#forge:dusts/quartz'], 10000)
     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_iron'), ['buildcraftsilicon:chipset_redstone', '#forge:dusts/iron'], 20000)
     funcs.siliconAssemly(content.pulsating_chipset, [preferredStack('forge:silicon'), '#forge:ender_pearls'], 25000)
     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_gold'), ['buildcraftsilicon:chipset_redstone', '#forge:dusts/gold'], 30000)
     funcs.siliconAssemly(content.lapis_lazuli_chipset, [content.pulsating_chipset, '#forge:gems/lapis'], 30000)
     funcs.siliconAssemly(funcs.removeByOutput('buildcraftsilicon:chipset_diamond'), ['buildcraftsilicon:chipset_quartz', '#forge:dusts/diamond'], 50000)
     funcs.siliconAssemly(content.emerald_chipset, [content.pulsating_chipset, '#forge:dusts/emerald'], 50000)
     funcs.siliconAssemly(content.netherite_chipset, [content.pulsating_chipset, '#forge:dusts/netherite'], 100000)
     
     event.forEachRecipe({output: packTag('projectred/chips/raw_elemental')}, recipe => {
          recipe.replaceInput('#forge:silicon', 'projectred_fabrication:rough_silicon_wafer')
     })

     funcs.removeRecipes({output: packTag('projectred/chips/elemental')}, (result, ingredients) => {
          if (!Item.of(result).isEmpty())
               funcs.siliconAssemly(result, ingredients[0], 25000)
     })
})