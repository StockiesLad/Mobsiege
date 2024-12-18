BlockEvents.modification(event => {
    event.modify('carbonize:charcoal_block', block => {
        block.destroySpeed = 5.0
        block.requiresTool = true;
    })
})