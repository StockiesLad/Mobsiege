itemTags((event, funcs) => {
     funcs.add(tags.chips_bc, [
          'buildcraftsilicon:chipset_redstone', 
          'buildcraftsilicon:chipset_iron', 
          'buildcraftsilicon:chipset_gold', 
          'buildcraftsilicon:chipset_quartz',
          'buildcraftsilicon:chipset_diamond',
          content.glowstone_chipset,
          content.infernal_chipset,
          content.pulsating_chipset,
          content.lapis_lazuli_chipset,
          content.emerald_chipset,
          content.netherite_chipset,
          content.void_chipset
     ])

     funcs.add(tags.chips_pr, [
          'projectred_core:electrotine_silicon', 
          'projectred_core:infused_silicon', 
          'projectred_core:energized_silicon'
     ])

     funcs.add(tags.chips, [[tags.chips_pr, tags.chips_bc]])
})