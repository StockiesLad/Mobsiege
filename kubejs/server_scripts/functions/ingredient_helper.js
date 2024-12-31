function ofFluid(fluid, amount) {
    var stack
    if (fluid.includes('#'))
        stack = {fluid_tag: fluid.replace('#', '')}
    else stack = {fluid: fluid}
    if (amount != null)
        stack.amount = amount
    return stack
}

function stack(id, count) {
    count = comfuncs.notNull(count, 1)
    return Item.of(id, count)
}

function ingr(id, count) {
    count = comfuncs.notNull(count, 1)
    return Ingredient.of(id, count)
}