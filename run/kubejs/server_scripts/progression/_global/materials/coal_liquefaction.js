recipes((event, funcs) => {
     event.remove({id: 'immersiveengineering:cokeoven/charcoal'})
     
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 25), Item.of('supplementaries:ash').withCount(3), content.poor_grade_charcoal)
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 100), Item.of('supplementaries:ash').withCount(2), content.low_grade_charcoal)
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 150), Item.of('supplementaries:ash').withCount(2), content.medium_grade_charcoal)
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 250), 'supplementaries:ash', content.good_grade_charcoal)
     funcs.globalLiquefaction(ofFluid('thermal:creosote', 400), 'supplementaries:ash', content.high_grade_charcoal)

     funcs.globalFluidMixing(ofFluid('createdieselgenerators:crude_oil', 150), [ofFluid(`#${main}:creosote`, 100), ofFluid(`#${main}:ethanol`, 50)])
     funcs.advancedFluidRefining([ofFluid('createdieselgenerators:diesel', 275), ofFluid('createdieselgenerators:gasoline', 175), ofFluid('createdieselgenerators:ethanol', 50)], ofFluid(`#${main}:crude_oil`, 500))
})