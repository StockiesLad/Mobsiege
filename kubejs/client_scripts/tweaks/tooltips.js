ItemEvents.tooltip(event => {
     common.alwaysArray([
          'primalstage:flint_hatchet',
          'primalstage:flint_mallet',
          content.flint_sword,
          content.flint_saw,
          'notreepunching:flint_knife',
          'notreepunching:flint_shovel',
          'notreepunching:flint_hoe',
          'notreepunching:flint_pickaxe',
          'notreepunching:flint_axe'
     ]).forEach(item => event.add(item, Text.darkRed('Unreliable')))

     event.add('primalstage:stone_club', Text.green('Breaks sand & gravel into their composite materials'))

     event.add('buildcraftbuilders:replacer', Text.darkRed('This machine does not work!'))
})