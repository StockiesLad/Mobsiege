// Fixing various mismatched sounds in presence footsteps and vanilla sounds. Everything sound related is managed here.
// SoundTypes hooked in startup_scripts/tweaks/mod/core
// SoundTags hooked in server_scripts/tweaks/mod/core

// (+) SoundMap
    global.SOUND_MAP = [
        //SoundTypes
        getSoundTypeHandle('FUNGUS', entries([
            'cave_pumpkin_seed', 
            'bolux_mushroom', 
            'umbrella_moss', 
            'twisted_umbrella_moss', 
            'small_amaranita_mushroom', 
            'murkweed'
        ], 'betterend')),
        getSoundTypeHandle('NYLIUM', entries('betternether:netherrack_moss')),
        getSoundTypeHandle('ROOTS', entries([
            'clawfern', 
            'cave_grass', 
            'fracturn', 
            'creeping_moss', 
            'amber_grass', 
            'globulagus', 
            'orango', 
            'umbrella_moss_tall', 
            'jungle_fern', 
            'lutebus', 
            'aeridium', 
            'twisted_umbrella_moss_tall', 
            'jungle_grass', 
            'crystal_grass', 
            'blooming_cooksonia', 
            'inflexia', 
            'shadow_plant', 
            'bushy_grass', 
            'flammalix', 
            'vaiolush_fern', 
            'salteago', 
            'chorus_grass', 
            'lamellarium', 
            'small_jellyshroom'
        ], 'betterend')),
        getSoundTypeHandle('SHROOMLIGHT', entries([
            'glowing_pillar_luminophor',
            'amaranita_lantern',
            'blue_vine_lantern',
            'bulb_vine',
            'umbrella_tree_cluster'
        ], 'betterend')),
        getSoundTypeHandle('SOUL_SAND', entries('betterend:charcoal_block')),
        getSoundTypeHandle('WEEPING_VINES', entries([
            'helix_tree_sapling',
            'glowing_pillar_roots',
            'glowing_pillar_seed',
            'lanceleaf',
            'twisted_vine', 
            'rubinea', 
            'helix_tree_sapling', 
            'jungle_vine', 
            'tail_moss', 
            'needlegrass', 
            'cyan_moss', 
            'blue_vine_fur', 
            'glowing_pillar_leaves', 
            'bulb_moss', 
            'ruscus', 
            'twisted_moss', 
            'magnula', 
            'filalux', 
            'dense_vine'
        ], 'betterend')),

        //Presence Footsteps
        getHandle(getSoundTagFunction('the_limit:grass_step'), entries('edenring:eden_mycelium')),

        //SoundTypes + Presence Footsteps
        getIntegratedHandle(GRASS_COVERED_NETHERRACK, 'the_limit:grass_step', entries('betternether:nether_mycelium')),
        getIntegratedHandle(GRASS_COVERED_STONE, 'the_limit:grass_step', entries([
            'betterend:end_mycelium',
            'betterend:end_mycelium_path',
            'edenring:mossy_stone',
            'biomeswevegone:overgrown_dacite', 
            'biomeswevegone:overgrown_stone'
        ])),
        getIntegratedHandle(WART_COVERED_STONE, 'minecraft:nylium', entries('betterend:mossy_obsidian'))
    ]
    global.accessSoundMap = (handlerSupplier) => {
        global.SOUND_MAP.forEach(handle => handlerSupplier(handle))
    }
// (-)
// (+) Entries
    function entries(names, modid) {
        return global.compileArray(names, name => modid != null ? global.appendResourceLocation(modid, name) : name)
    }
// (-)
// (+) Functions
    function getSoundTypeFunction(type) {
        return {setSoundType: (params) => params.event.modify(params.entry, block => block.soundType = type)}
    }
    function getSoundTagFunction(tag) {
        return {setSoundTag: (params) => {
            params.event.add(tag, params.entry)
        }}
    }
// (-)
// (+) Handles
    function getSoundTypeHandle(type, allEntries) {
        return getHandle(getSoundTypeFunction(type), allEntries)
    }
    function getIntegratedHandle(soundType, soundTag, allEntries) {
        return getHandle([getSoundTypeFunction(soundType), getSoundTagFunction(soundTag)], allEntries)
    }
    function getHandle(functions, allEntries) {
        var basicHandle = global.compileOfObjects(functions, oldValue => (params) => {
            allEntries.forEach(entries => {
                if (Array.isArray(entries))
                    entries.forEach(entry => {
                        params.entry = entry
                        oldValue(params)
                    })
                else {
                    params.entry = entries
                    oldValue(params)
                }
            })
        })
        basicHandle.invoke = (funcName, params) => {
            if (basicHandle.hasOwnProperty(funcName))
                Object.getOwnPropertyDescriptor(basicHandle, funcName).value(params)
        }
        return basicHandle
    }
// (-)