function tag(id) {
    return '#' + id
}

function def(path) {
    return comfuncs.def(path)
}

function defTag(path) {
    return tag(def(path))
}

function pack(path) {
    return comfuncs.packDef(path)
}

function packTag(path) {
    return tag(pack(path))
}

function preferredItemId(tag) {
    return preferredStack(tag).getIdLocation().toString()
}

function preferredStack(tag) {
    return AlmostUnified.getPreferredItemForTag(tag)
}

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

function toStack(/** @type {String} */ id) {
    if (Item.isItem(id)) return id
    var split = id.split(' ')
    if (split.length = 1) return Item.of(split[0])
    return Item.of(split[1], Number.parseInt(split[0].replace('x', '')))
}

function findId(id) {
    return Item.of(id).getIdLocation().toString()
}

//Add support for multiple preferred source
function filterBiasedly(expressions, preferredSource, regex) {
    var matchedExpressions = expressions.filter(exp => exp.includes(regex))
    var preferredExp = matchedExpressions.find(exp => exp.includes(preferredSource))
    if (preferredExp != null)
         return preferredExp
    else return matchedExpressions[0]
}