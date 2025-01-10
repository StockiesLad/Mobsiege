StartupEvents.modifyCreativeTab('kubejs:tab', e => {
    e.setDisplayName('Custom Content')
    e.setIcon(Item.of(custom.thermoregulator))
    e.add([custom.holy_pebble, custom.packed_ash, custom.ash_clay, custom.holysilt_brick_stairs, custom.holysilt_brick_slab, custom.holysilt_brick_wall])
 })