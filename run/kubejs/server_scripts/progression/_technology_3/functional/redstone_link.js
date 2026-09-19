recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput('create:redstone_link'), [
          ['create:transmitter', 1],
          ['buildcraftsilicon:chipset_quartz', [3, 5]],
          ['create:andesite_casing', 4],
          ['projectred_transmission:red_alloy_wire', 7]
     ])
})