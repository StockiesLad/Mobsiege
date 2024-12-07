recipes((event, funcs) => {
     event.remove({id: 'thermal:machines/pyrolyzer/pyrolyzer_logs'})
     event.remove({id: 'immersiveengineering:cokeoven/charcoal'})
     
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 5), Item.of('supplementaries:ash').withCount(3), custom.poor_grade_charcoal)
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 100), Item.of('supplementaries:ash').withCount(2), custom.low_grade_charcoal)
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 150), Item.of('supplementaries:ash').withCount(2), 'minecraft:charcoal')
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 250), 'supplementaries:ash', custom.good_grade_charcoal)
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 400), 'supplementaries:ash', custom.high_grade_charcoal)

     funcs.globalFluidMixing(ofFluid('createdieselgenerators:crude_oil', 150), [ofFluid('#forge:creosote', 100), ofFluid('#forge:ethanol', 50)])
     funcs.advancedFluidRefining([ofFluid('createdieselgenerators:diesel', 275), ofFluid('createdieselgenerators:gasoline', 175), ofFluid('createdieselgenerators:ethanol', 50)], ofFluid('#forge:crude_oil', 500))
})