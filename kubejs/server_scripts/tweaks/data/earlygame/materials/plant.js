recipes((event, funcs) => {
     comfuncs.hide('primalstage:plant_twine')

     //plant twine to string
     event.replaceInput({input: 'primalstage:plant_twine'}, 'primalstage:plant_twine', 'notreepunching:plant_string')
     funcs.replace({input: 'minecraft:vine', output: 'notreepunching:plant_fiber'}, result => 
          funcs.toolDamagingShapeless('3x ' + result, [funcs.def('|vines'), '#notreepunching:knives'])
     )

     funcs.toolDamagingShapeless('2x notreepunching:plant_fiber', ['#minecraft:wart_blocks', '#notreepunching:knives'])    
})