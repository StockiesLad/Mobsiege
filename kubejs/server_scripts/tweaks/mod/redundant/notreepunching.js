/*ServerEvents.recipes(event => {
  removeAndHide(event, 'betternether:blackstone_furnace')
  replaceRecipeCmplx(event, {input: '#notreepunching:weak_saws', output: 'minecraft:stick'}, result => {
    toolDamagingShapeless(event, result, ['#minecraft:axes', '#minecraft:planks'])
    toolDamagingShapeless(event, '6x ' + result, ['#minecraft:axes', '#minecraft:logs'])
  })

  replaceRecipeCmplx(event, {input: '#notreepunching:h/saws', output: 'minecraft:stick'}, result => {
    toolDamagingShapeless(event, '2x ' + result, ['#minecraft:saws', '#minecraft:planks'])
    toolDamagingShapeless(event, '8x ' + result, ['#minecraft:saws', '#minecraft:logs'])
  })

  let runnables = []
    event.forEachRecipe({type: 'minecraft:crafting_shaped', input: '#aether:skyroot_repairing', output: 'aether:skyroot_stick'}, recipe => {
      let ingredients = recipe.originalRecipeIngredients
      let output = recipe.originalRecipeResult

      runnables.push(() => event.remove({id: recipe.getId()}))
      toolDamagingShapeless(event, Item.of(output).withCount(1), [ingredients[0], '#minecraft:axes'])
      toolDamagingShapeless(event, Item.of(output).withCount(2), [ingredients[0], '#minecraft:saws'])
      toolDamagingShapeless(event, Item.of(output).withCount(6), ['#mobsiege:aether_logs', '#minecraft:axes'])
      toolDamagingShapeless(event, Item.of(output).withCount(8), ['#mobsiege:aether_logs', '#minecraft:saws'])
    })
    event.forEachRecipe({type: 'minecraft:crafting_shapeless', input: ['#minecraft:logs', '#minecraft:axes'], output: '#minecraft:planks'}, recipe => {
      let ingredients = recipe.originalRecipeIngredients
      let output = recipe.originalRecipeResult

      runnables.push(() => event.remove({id: recipe.getId()}))
      toolDamagingShapeless(event, Item.of(output).withCount(3), [ingredients[0], '#minecraft:axes'])
      toolDamagingShapeless(event, Item.of(output).withCount(4), [ingredients[0], '#minecraft:saws'])
    })
    event.forEachRecipe({type: 'minecraft:crafting_shaped', output: '#forge:workbench'}, recipe => {
      let ingredients = recipe.originalRecipeIngredients
      let ingredient = ingredients[0]
      let output = recipe.originalRecipeResult
      let newRecipe = () => {
        toolDamagingShapeless(event, output, [ingredient, ingredient, '#minecraft:axes'])
        toolDamagingShapeless(event, output, [ingredient, '#minecraft:saws'])
      }

      runnables.push(() => event.remove({id: recipe.getId()}))

      if (output.equalsIgnoringCount(Item.of('aether_genesis:skyroot_crafting_table')))
        ingredient = '#aether:planks_crafting'
      else if (output.equalsIgnoringCount(Item.of('minecraft:crafting_table'))) 
        ingredient = '#minecraft:planks'

      newRecipe()
    })
    event.forEachRecipe({type: 'minecraft:crafting_shaped', output: '#forge:furnaces' }, recipe => {
      let ingredients = recipe.originalRecipeIngredients
      let ingredient = ingredients[0]
      let output = recipe.originalRecipeResult

      runnables.push(() => event.remove({id: recipe.getId()}))
      if (output.equalsIgnoringCount(Item.of('minecraft:furnace'))) {
        if (recipe.getId() == 'minecraft:furnace')
          planetRecipe(event, output, ingredient, 'minecraft:bricks')
      } else planetRecipe(event, output, ingredient, 'minecraft:bricks')
    })
  runnables.forEach(runnable => runnable())
  
  replaceRecipeSmpl(event, 'notreepunching:flint_axe', result => event.shaped(result, [
    'SF',
    'WF',
    'W '
  ], {
    S: '#notreepunching:string',
    W: '#forge:rods/wooden',
    F: 'notreepunching:flint_shard'
  }))

  event.shaped('minecraft:campfire', [
    ' T ',
    'TCT',
    'PPP'
  ], {
    T: '#minecraft:torches/temp',
    C: '#minecraft:coals',
    P: '#minecraft:planks'
  })

  vertical2x1Recipe(event, '2x minecraft:stick', '#mobsiege:vines')
  vertical2x1Recipe(event, '2x aether:skyroot_stick', '#mobsiege:aether_vines')
  alternate2x2Recipe(event, '2x minecraft:clay', '#forge:sand', '#mobsiege:jelly_blocks')
  alternate2x2Recipe(event, '2x minecraft:clay', '#forge:sand', '#minecraft:wart_blocks')
  alternate2x2Recipe(event, '2x minecraft:clay', 'aether_redux:holysilt', '#mobsiege:mud')
  alternate2x2Recipe(event, '2x minecraft:gravel', 'minecraft:end_stone', 'promenade:dark_amaranth_wart_block')
  alternate2x2Recipe(event, '2x minecraft:gravel', 'aether_redux:driftshale', '#mobsiege:mud')
  toolDamagingShapeless(event, 'notreepunching:clay_brick', ['minecraft:clay_ball', 'minecraft:clay_ball', '#minecraft:shovels'])
  toolDamagingShapeless(event, '2x notreepunching:clay_brick', ['minecraft:clay', '#minecraft:shovels'])
  toolDamagingShapeless(event, '2x notreepunching:plant_fiber', ['#minecraft:wart_blocks', '#notreepunching:knives'])
  replaceRecipeCmplx(event, {input: 'minecraft:vine', output: 'notreepunching:plant_fiber'}, result => toolDamagingShapeless(event, '3x ' + result, ['#mobsiege:vines', '#notreepunching:knives']))
})*/
/*
ServerEvents.tags('item', event => {
  event.add('notreepunching:knives', '#minecraft:axes')
})

ServerEvents.tags('block', event => {
    event.add('notreepunching:loose_rock_placeable_on', '#forge:stone')
})*/