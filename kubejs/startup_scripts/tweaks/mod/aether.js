StartupEvents.modifyCreativeTab('aether:equipment_and_utilities', event => {
    comfuncs.regexEach(
        ['aether:{name}_sword', 'aether:{name}_pickaxe', 'aether:{name}_axe', 'aether:{name}_shovel', 'aether:{name}_hoe'],
        ['skyroot', 'holystone'], 
        output => {
            event.remove({output: output})
            comfuncs.hide(output)
        }
    )
})