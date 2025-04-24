commonTags((event, funcs) => {
     var aetherClouds = funcs.getIdsOfTags('aether:aerclouds')
     var magicalClouds = funcs.getEntriesOfTags('magical_utilities:clouds')
     event.add('magical_utilities:clouds', aetherClouds)
     event.add('aether:aerclouds', magicalClouds)

})