BlockEvents.modification(event => {
    event.modify('carbonize:charcoal_block', block => {
        block.destroySpeed = 0.5
        block.explosionResistance = 0.5

    })
})