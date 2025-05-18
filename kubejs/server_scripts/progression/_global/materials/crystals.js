recipes((event, funcs) => {
     funcs.globalAlloySmelting('lost_aether_content:flaming_gemstone', ['4x betterend:amber_gem', '2x #forge:dusts/blaze', '2x aether:ambrosium_shard'])
     funcs.globalAlloySmelting('betternether:nether_ruby', ['4x #forge:dusts/blaze', '#forge:gems/ruby'])
})

itemTags((event, funcs) => {
     event.add('forge:gems/amber', 'betterend:amber_gem')
     event.add('forge:gems/amber', 'betterend:ender_shard')
     event.add('forge:gems/smaragdant', 'betterend:smaragdant_crystal_shard')
     event.add('forge:gems/aurora', 'betterend:crystal_shards')
     event.add('forge:gems/zanite', '#aether:gems/zanite')
     event.add('forge:gems/golden_amber', 'aether:golden_amber')
     event.add('forge:gems/skyjade', 'deep_aether:skyjade')
})