recipes((event, funcs) => {
     funcs.globalPressing(funcs.removeInsurely({output: 'immersiveengineering:steel_scaffolding_standard'}), '8x #forge:rods/steel', 'packing_2x2')
     funcs.planet('immersiveengineering:steel_scaffolding_standard', 'actuallyadditions:void_crystal', '8x #forge:rods/steel').vanilla()

     funcs.globalPressing(funcs.removeInsurely({output: 'immersiveengineering:alu_scaffolding_standard'}) , '8x #forge:rods/aluminum', 'packing_2x2')
     funcs.planet('immersiveengineering:alu_scaffolding_standard', 'actuallyadditions:void_crystal', '8x #forge:rods/aluminum').vanilla()

})