recipes((event, funcs) => {
     funcs.nuke('trials:crafter')

     funcs.replaceCrafting('projectred_expansion:project_bench', [
          ['minecraft:ink_sac', [0, 2]],
          ['#forge:rods/iron', 1],
          ['projectred_core:electrotine_silicon', [3, 5]],
          ['#forge:workbenches', 4],
          ['projectred_core:red_ingot', [6, 8]],
          ['buildcraftsilicon:chipset_iron', 7]
     ])

     funcs.replaceCrafting('projectred_expansion:auto_crafter', [
          ['#buildcraft:pipe/items_gold', [0, 2]],
          ['#forge:gears/iron', [3, 5]],
          ['buildcraftsilicon:chipset_gold', 1],
          ['#forge:workbenches', 4],
          ['immersiveengineering:wirecoil_copper_ins', [6, 8]],
          ['notreepunching:iron_saw', 7]
     ])
})