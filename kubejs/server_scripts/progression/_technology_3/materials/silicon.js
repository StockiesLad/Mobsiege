recipes((event, funcs) => {
     funcs.nuke(`tinyredstone:silicon_compound`)
     funcs.removeById([`enderio:smelting/tinyredstone/silicon`, `projectred_core:silicon`])

     event.shapeless(funcs.removeByOutput(`4x projectred_core:sand_coal_comp`), `betterend:charcoal_block`)
     funcs.twoSquare(`betterend:charcoal_block`, `projectred_core:sand_coal_comp`).vanilla()
     funcs.remove({output: `projectred_core:boule`, type: `minecraft:smelting`})
     event.blasting(`projectred_core:boule`, `projectred_core:sand_coal_comp`).xp(0.5)

     event.remove({output: preferredStack(`${main}:silicon`), type: `minecraft:smelting`})

     funcs.toolDamagingShapeless(funcs.removeInsurely({output: preferredStack(`${main}:silicon`).withCount(4), input: `projectred_core:boule`}), [`#minecraft:saws`, `projectred_core:boule`])

     event.replaceOutput({output: `projectred_core:silicon`}, `projectred_core:silicon`, preferredStack(`${main}:silicon`))
     event.replaceInput({input: `projectred_core:silicon`}, `projectred_core:silicon`, `#${main}:silicon`)
     funcs.twoSquare(`projectred_core:silicon`, `#${main}:silicon`).vanilla()
     event.replaceInput({output: `projectred_fabrication:rough_silicon_wafer`}, `#${main}:silicon`, `projectred_core:silicon`)
     funcs.siliconAssemly(funcs.removeByOutput(`buildcraftsilicon:chipset_redstone`), [preferredStack(`${main}:silicon`), `#${main}:dusts/redstone`], 5000)
     funcs.siliconAssemly(content.glowstone_chipset, [`buildcraftsilicon:chipset_redstone`, `#${main}:dusts/glowstone`], 10000)
     funcs.siliconAssemly(content.infernal_chipset, [`buildcraftsilicon:chipset_redstone`, `#${main}:dusts/blaze`], 10000)
     funcs.siliconAssemly(funcs.removeByOutput(`buildcraftsilicon:chipset_quartz`), [`buildcraftsilicon:chipset_redstone`, `#${main}:dusts/quartz`], 10000)
     funcs.siliconAssemly(funcs.removeByOutput(`buildcraftsilicon:chipset_iron`), [`buildcraftsilicon:chipset_redstone`, `#${main}:dusts/iron`], 20000)
     funcs.siliconAssemly(content.pulsating_chipset, [preferredStack(`${main}:silicon`), `#${main}:ender_pearls`], 25000)
     funcs.siliconAssemly(funcs.removeByOutput(`buildcraftsilicon:chipset_gold`), [`buildcraftsilicon:chipset_redstone`, `#${main}:dusts/gold`], 30000)
     funcs.siliconAssemly(content.lapis_lazuli_chipset, [content.pulsating_chipset, `#${main}:gems/lapis`], 30000)
     funcs.siliconAssemly(funcs.removeByOutput(`buildcraftsilicon:chipset_diamond`), [`buildcraftsilicon:chipset_quartz`, `#${main}:dusts/diamond`], 50000)
     funcs.siliconAssemly(content.emerald_chipset, [content.pulsating_chipset, `#${main}:dusts/emerald`], 50000)
     funcs.siliconAssemly(content.netherite_chipset, [content.pulsating_chipset, `#${main}:dusts/netherite`], 100000)
     funcs.siliconAssemly(funcs.removeByOutput(`buildcraftsilicon:redstone_crystal`), `appflux:redstone_crystal`, 250000)
     
     event.forEachRecipe({output: packTag(`projectred/chips/raw_elemental`)}, recipe => {
          recipe.replaceInput(`#${main}:silicon`, `projectred_fabrication:rough_silicon_wafer`)
     })

     funcs.removeRecipes({output: packTag(`projectred/chips/elemental`)}, (result, ingredients) => {
          if (!Item.of(result).isEmpty())
               funcs.siliconAssemly(result, ingredients[0], 25000)
     })
})