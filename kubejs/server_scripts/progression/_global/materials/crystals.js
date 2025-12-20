recipes((event, funcs) => {
     funcs.globalAlloySmelting('lost_aether_content:flaming_gemstone', ['4x betterend:amber_gem', `2x #${main}:dusts/blaze`, '2x aether:ambrosium_shard'])
     funcs.globalAlloySmelting('betternether:nether_ruby', [`4x #${main}:dusts/blaze`, `#${main}:gems/ruby`])
})

itemTags((event, funcs) => {
     event.add(`${main}:gems/amber`, 'betterend:amber_gem')
     event.add(`${main}:gems/amber`, 'betterend:ender_shard')
     event.add(`${main}:gems/smaragdant`, 'betterend:smaragdant_crystal_shard')
     event.add(`${main}:gems/aurora`, 'betterend:crystal_shards')
     event.add(`${main}:gems/zanite`, '#aether:gems/zanite')
     event.add(`${main}:gems/golden_amber`, 'aether:golden_amber')
     event.add(`${main}:gems/skyjade`, 'deep_aether:skyjade')
})