recipes((event, funcs) => {
     event.stonecutting('2x projectred_core:plate', 'minecraft:smooth_stone')
     funcs.globalPressing(funcs.removeInsurely({output: '3x projectred_core:plate'}), 'minecraft:smooth_stone')
})