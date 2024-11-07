/*ServerEvents.tags('item', event => {
    let logs = event.get('minecraft:logs',).getObjectIds()
    let logsCompare = []
    logs.forEach(log => {
        let split = log.toString().split(':')
        if (!(split[0].includes('twilightforest') || split[0].includes('ancient_aether') || split[1].includes('maple') || split[1].includes('stripped') || split[1].includes('wood')))
            logsCompare.push(split[0], split[1])
    })
    logs.forEach(log => {
        let split = log.toString().split(':')
        if (logsCompare.includes(split[1]) && !logsCompare[logsCompare.indexOf(split[1]) - 1].toString().includes(split[0].toString()))
            console.log(log.toString().replace('_log', ''))
    })
})*/