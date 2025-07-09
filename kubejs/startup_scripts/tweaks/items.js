StartupEvents.registry('item', event => {
     Mobsiege2ToughAsNails.addThermoregulators(stacks.packId('thermoregulators'))

     typedContent.filter(c => c.registerable && c.type === 'item').forEach(item => {
          if (item.toolType) {
               var reg = event.create(item.id, item.toolType).unstackable();
               if (item.maxDamage != null) reg.maxDamage(item.maxDamage);
               if (item.tags) reg.tag(item.tags[0]);
          } else if (item.unstackable) {
               event.create(item.id).unstackable();
          } else if (item.burnTime != null) {
               event.create(item.id).burnTime(item.burnTime);
          } else {
               event.create(item.id);
          }
     });

})

ItemEvents.modification(event => {  
     var alchemical_coal = 3200 * 4
     var alchemical_coal_block = Math.floor(alchemical_coal * 10 / 9)
 
     var mobius_fuel = alchemical_coal * 4
     var mobius_fuel_block = Math.floor(mobius_fuel * 10 / 9)
 
     var aeternalis_fuel = mobius_fuel * 4 
     var aeternalis_fuel_block = Math.floor(aeternalis_fuel * 10 / 9)
 
     common.alwaysArray([
          ['unearthed:lignite_slab', 100],
          ['unearthed:lignite_stairs', 150],
          ['unearthed:lignite_wall', 200],
          ['minecraft:blaze_powder', 1000],
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