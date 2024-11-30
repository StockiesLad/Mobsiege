recipes((event, funcs) => {
     var generate = funcs.generate
     
     funcs.insertAll(insertion => insertion.vanilla(), [
          generate('2x minecraft:gravel', ['minecraft:end_stone', 'promenade:dark_amaranth_wart_block']).rollingSquare(1, 2),
          generate('2x minecraft:gravel', ['aether_redux:driftshale', '#mobsiege:mud']).rollingSquare(1, 2)
     ])
})

