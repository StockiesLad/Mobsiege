BlockEvents.placed('projecte:interdiction_torch', event => {
     var {level} = event
     var pos = event.block.getPos()
     //if (!area.chunks.some(chunk => chunk.getRegionX() == safeChunk.getRegionX() && chunk.getRegionZ() == safeChunk.getRegionZ()))
     var chunkPos = level.getChunkAt(pos).getPos()
     getSafeAreas(level).regions.push({regionX: chunkPos.getRegionX(), regionZ: chunkPos.getRegionZ(), originX: pos.getX(), originY: pos.getY(), originZ: pos.getZ()})
     uploadData(level.getServer())
})

BlockEvents.broken('projecte:interdiction_torch', event => {
     var {level} = event
     var area = getSafeAreas(level)
     var chunk = level.getChunkAt(event.block.getPos()).getPos()
     var expired = false

     area.regions = area.regions.filter(safeChunk => {
          if (!(chunk.getRegionX() == safeChunk.regionX && chunk.getRegionZ() == safeChunk.regionZ && expired)) {
               expired = true
               return false
          } else return true
     })
     uploadData(level.getServer())

})

var safeAreas
var dataName = 'safeRegions'

function getSafeAreas(level) {
     safeAreas = level.getServer().persistentData[dataName]
     if (safeAreas == null)
          safeAreas = []
     var area = null
     safeAreas.forEach(safeArea => {
         if (safeArea.dimension == level.dimension.toString())
             area = safeArea
     })
     if (area == null) {
         area = {dimension: level.dimension.toString(), regions: []}
         safeAreas.push(area)
     }
     return area
}

function uploadData(server) {
     server.persistentData[dataName] = safeAreas
}

function isChunkSafe(level, chunkPos) {
     var area = getSafeAreas(level)
     area.regions = area.regions.filter(region => level.getBlock(new BlockPos(region.originX, region.originY, region.originZ)).equals('projecte:interdiction_torch'))
     uploadData(level.getServer())
     return area.regions.some(position => chunkPos.getRegionX() === position.regionX && chunkPos.getRegionZ() === position.regionZ)
}
 
