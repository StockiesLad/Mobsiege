recipes((event, funcs) => {
     funcs.planetAlt(funcs.removeByOutput('projecte:transmutation_table'), ['projecte:red_matter_block', 'bedrockium_awaken:compressed_bedrockium_block'], 'projecte:philosophers_stone').toolDamaging()
     funcs.planetAlt(funcs.removeByOutput('projecte:transmutation_tablet'), [`#${main}:storage_blocks/enderium`, `#${main}:storage_blocks/gravitium_alloy`], 'projecte:transmutation_table').vanilla()
})