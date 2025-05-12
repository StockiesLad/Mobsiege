BlockEvents.placed('projecte:interdiction_torch', event => {
     var {level} = event
     var pos = event.block.getPos()
     //if (!area.chunks.some(chunk => chunk.getRegionX() == safeChunk.getRegionX() && chunk.getRegionZ() == safeChunk.getRegionZ()))
     var chunkPos = level.getChunkAt(pos).getPos()
     getSafeRegions(level).regions.push({regionX: chunkPos.getRegionX(), regionZ: chunkPos.getRegionZ(), originX: pos.getX(), originY: pos.getY(), originZ: pos.getZ()})
     uploadSafeRegionData(level.getServer())
})

BlockEvents.broken('projecte:interdiction_torch', event => {
     var {level} = event
     var area = getSafeRegions(level)
     var chunk = level.getChunkAt(event.block.getPos()).getPos()
     var expired = false

     area.regions = area.regions.filter(safeChunk => {
          if (!(chunk.getRegionX() == safeChunk.regionX && chunk.getRegionZ() == safeChunk.regionZ && expired)) {
               expired = true
               return false
          } else return true
     })
     uploadSafeRegionData(level.getServer())

})

var safeRegions
var dataName = 'safeRegions'

function getSafeRegions(level) {
     safeRegions = level.getServer().persistentData[dataName]
     if (safeRegions == null)
          safeRegions = []
     var area = null
     safeRegions.forEach(safeArea => {
         if (safeArea.dimension == level.dimension.toString())
             area = safeArea
     })
     if (area == null) {
         area = {dimension: level.dimension.toString(), regions: []}
         safeRegions.push(area)
     }
     return area
}

function uploadSafeRegionData(server) {
     server.persistentData[dataName] = safeRegions
}

function isChunkSafe(level, chunkPos) {
     var area = getSafeRegions(level)
     area.regions = area.regions.filter(region => level.getBlock(new BlockPos(region.originX, region.originY, region.originZ)).equals('projecte:interdiction_torch'))
     uploadSafeRegionData(level.getServer())
     return area.regions.some(position => chunkPos.getRegionX() === position.regionX && chunkPos.getRegionZ() === position.regionZ)
}
 
