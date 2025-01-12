StartupEvents.registry('item', event => {
     Mobsiege2ToughAsNails.addThermoregulators(stacks.packId('thermoregulators'))

     var items = [
          {id: content.thermoregulator, unstackable: true},

          {id: content.gravitium},

          {id: content.pointed_flint},
          {id: content.flint_sword, type: 'sword', maxDamage: 50, tag: 'forge:tools/swords'},
          {id: content.flint_saw, type: 'axe', maxDamage: 30, tag: 'notreepunching:saws'}, //Make this weaker because KubeJS doesn't support tiers or custom tools yet.

          {id: content.poor_grade_charcoal, burnTime: 400},
          {id: content.low_grade_charcoal, burnTime: 800},
          {id: content.good_grade_charcoal, burnTime: 3200},
          {id: content.high_grade_charcoal, burnTime: 6400},

          {id: content.end_dust},
          {id: content.quicksoil_dust},
          {id: content.soulsand_dust},

          {id: content.mud_ball},
          {id: content.wet_mud_brick},
          {id: content.dry_mud_brick},
          {id: content.mud_brick},

          {id: content.aether_mud_ball},
          {id: content.wet_aether_mud_brick},
          {id: content.dry_aether_mud_brick},
          {id: content.aether_mud_brick},

          {id: content.ash_clay_ball}, 
          {id: content.wet_ash_clay_brick},
          {id: content.dry_ash_clay_brick},

          {id: content.dry_clay_brick}, 

          {id: content.wet_silt_brick},
          {id: content.dry_silt_brick},

          {id: content.holysilt_ball},
          {id: content.wet_holysilt_brick},
          {id: content.dry_holysilt_brick},
          {id: content.holysilt_brick},

          {id: content.wet_mortar_brick},
          {id: content.dry_mortar_brick},

          {id: content.cement_compound},
          {id: content.wet_cement_brick},
          {id: content.dry_cement_brick},
          {id: content.fire_brick}
     ]

     items.forEach(item => {
          if (item['type'] != null) {
               event.create(item.id, item.type)
                    .unstackable()
                    .maxDamage(item.maxDamage)
                    .tag(item.tag)
          } else if (item['unstackable'])
               event.create(item.id).unstackable()
          else if (item['burnTime'] != null)
               event.create(item.id).burnTime(item.burnTime)
          else event.create(item.id)
     })

})

ItemEvents.modification(event => {  
     var alchemical_coal = 3200 * 4
     var alchemical_coal_block = Math.floor(alchemical_coal * 10 / 9)
 
     var mobius_fuel = alchemical_coal * 4
     var mobius_fuel_block = Math.floor(mobius_fuel * 10 / 9)
 
     var aeternalis_fuel = mobius_fuel * 4 
     var aeternalis_fuel_block = Math.floor(aeternalis_fuel * 10 / 9)
 
     common.alwaysArray([
         ['minecraft:blaze_powder', 1200],
         ['minecraft:blaze_rod', 1600],
         ['projecte:alchemical_coal', alchemical_coal],
         ['projecte:alchemical_coal_block', alchemical_coal_block],
         ['projecte:mobius_fuel', mobius_fuel],
         ['projecte:mobius_fuel_block', mobius_fuel_block],
         ['projecte:aeternalis_fuel', aeternalis_fuel],
         ['projecte:aeternalis_fuel_block', aeternalis_fuel_block]
     ]).forEach(val => event.modify(val[0], item => item.burnTime = val[1]))
 
     common.alwaysArray([
         ['notreepunching:flint_knife', 20],
         ['primalstage:flint_hatchet', 30],
         ['notreepunching:flint_shovel', 50],
         ['notreepunching:flint_hoe', 50],
         ['notreepunching:flint_pickaxe', 50],
         ['notreepunching:flint_axe', 50],
         ['primalstage:flint_mallet', 50]
     ]).forEach(vals =>  event.modify(vals[0], item => item.maxDamage = vals[1]))
 })