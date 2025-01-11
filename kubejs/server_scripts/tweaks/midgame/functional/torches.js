recipes((event, funcs) => {
     funcs.nuke('reliquary:interdiction_torch')
     funcs.planetAlt(funcs.removeByOutput('projecte:interdiction_torch'), ['minecraft:soul_torch', 'enderio:pulsating_crystal'], content.gravitium).vanilla()
})