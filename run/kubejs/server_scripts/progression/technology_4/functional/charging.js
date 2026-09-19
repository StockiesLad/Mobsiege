recipes((event, funcs) => {
     funcs.vanillaInsert(funcs.removeByOutput(`ae2:charger`), [
          [`#${main}:ingots/redstone_alloy`, 4],
          [`#${main}:ingots/copper`, 3],
          [`thermal:rf_coil`, 1],
          [`create:cogwheel`, 2],
          [`#${main}:plates/iron`, 5],
          [`#${main}:storage_blocks/iron`, 8],
          [`#${main}:ingots/iron`, [0, 6, 7]]
     ])
})