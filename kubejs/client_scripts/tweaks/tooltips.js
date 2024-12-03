ItemEvents.tooltip(event => {
     comfuncs.iterate( [
          'primalstage:flint_hatchet',
          'primalstage:flint_mallet',
          'notreepunching:flint_knife',
          'notreepunching:flint_shovel',
          'notreepunching:flint_hoe',
          'notreepunching:flint_pickaxe',
          'notreepunching:flint_axe'
     ], item => event.add(item, Text.darkRed('Unreliable')))
})