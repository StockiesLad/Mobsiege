StartupEvents.registry('item', event => {
     Mobsiege2ToughAsNails.addThermoregulators(comfuncs.packDef('thermoregulators'))

     var items = [
          {id: custom.thermoregulator, unstackable: true},

          {id: custom.gravitium},

          {id: custom.pointed_flint},
          {id: custom.flint_sword, type: 'sword', maxDamage: 50, tag: 'forge:tools/swords'},
          {id: custom.flint_saw, type: 'axe', maxDamage: 30, tag: 'notreepunching:saws'}, //Make this weaker because KubeJS doesn't support tiers or custom tools yet.

          {id: custom.poor_grade_charcoal, burnTime: 400},
          {id: custom.low_grade_charcoal, burnTime: 800},
          {id: custom.good_grade_charcoal, burnTime: 3200},
          {id: custom.high_grade_charcoal, burnTime: 6400},

          {id: custom.end_dust},
          {id: custom.quicksoil_dust},
          {id: custom.soulsand_dust},

          {id: custom.mud_ball},
          {id: custom.wet_mud_brick},
          {id: custom.dry_mud_brick},
          {id: custom.mud_brick},

          {id: custom.aether_mud_ball},
          {id: custom.wet_aether_mud_brick},
          {id: custom.dry_aether_mud_brick},
          {id: custom.aether_mud_brick},

          {id: custom.ash_clay_ball}, 
          {id: custom.wet_ash_clay_brick},
          {id: custom.dry_ash_clay_brick},

          {id: custom.dry_clay_brick}, 

          {id: custom.wet_silt_brick},
          {id: custom.dry_silt_brick},

          {id: custom.holysilt_ball},
          {id: custom.wet_holysilt_brick},
          {id: custom.dry_holysilt_brick},
          {id: custom.holysilt_brick},

          {id: custom.wet_mortar_brick},
          {id: custom.dry_mortar_brick},

          {id: custom.cement_compound},
          {id: custom.wet_cement_brick},
          {id: custom.dry_cement_brick},
          {id: custom.fire_brick}
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
     var singleToBlockEfficiencyConst = 10/9
 
     var coal = 1600
     var coal_block = coal * 9 * singleToBlockEfficiencyConst
 
     var alchemical_coal = Math.floor((coal + coal_block) * 4 * singleToBlockEfficiencyConst)
     var alchemical_coal_block = Math.floor(alchemical_coal * 9 * singleToBlockEfficiencyConst)
 
     var mobius_fuel = Math.floor((alchemical_coal + alchemical_coal_block) * 4 * singleToBlockEfficiencyConst)
     var mobius_fuel_block = Math.floor(mobius_fuel * 9 * singleToBlockEfficiencyConst)
 
     var aeternalis_fuel = Math.floor((mobius_fuel + mobius_fuel_block) * 4 * singleToBlockEfficiencyConst)
     var aeternalis_fuel_block = Math.floor(aeternalis_fuel * 9 * singleToBlockEfficiencyConst)
 
     comfuncs.iterate([
         ['minecraft:blaze_powder', 1200],
         ['minecraft:blaze_rod', 1600],
         ['projecte:alchemical_coal', alchemical_coal],
         ['projecte:alchemical_coal_block', alchemical_coal_block],
         ['projecte:mobius_fuel', mobius_fuel],
         ['projecte:mobius_fuel_block', mobius_fuel_block],
         ['projecte:aeternalis_fuel', aeternalis_fuel],
         ['projecte:aeternalis_fuel_block', aeternalis_fuel_block]
     ], val => event.modify(val[0], item => item.burnTime = val[1]))
 
     comfuncs.iterate([
         ['notreepunching:flint_knife', 20],
         ['primalstage:flint_hatchet', 30],
         ['notreepunching:flint_shovel', 50],
         ['notreepunching:flint_hoe', 50],
         ['notreepunching:flint_pickaxe', 50],
         ['notreepunching:flint_axe', 50],
         ['primalstage:flint_mallet', 50]
     ], vals =>  event.modify(vals[0], item => item.maxDamage = vals[1]))
 })