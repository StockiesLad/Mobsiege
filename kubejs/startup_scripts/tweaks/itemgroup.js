StartupEvents.modifyCreativeTab('kubejs:tab', e => {
    e.setDisplayName('Custom Content')
    e.setIcon(Item.of(content.thermoregulator))
    e.add([content.holy_pebble, content.packed_ash, content.ash_clay, content.holysilt_brick_stairs, content.holysilt_brick_slab, content.holysilt_brick_wall])
 })