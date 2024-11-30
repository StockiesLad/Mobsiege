//Imports
const BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const SpawnType = Java.loadClass('net.minecraft.world.entity.SpawnPlacements$Type')
const Direction = Java.loadClass('net.minecraft.core.Direction')

//Modification Variables
const disable = false
const testDirections = getScanningDirections()
const chanceRandomBound = 100000
const spawnDistBase = 15 
const spawnDistVariation = 10
const spawnDistMax = spawnDistBase + spawnDistVariation
const mobCountBase = 15
const mobCountVariation = 10
const surfaceSearchDist = 20

//Mob Siege Types
const MOB_SIEGES = [
    {
        name: 'Bliztic Barrage',
        type: 'blazes',
        members: [
            'minecraft:blaze',
            'thermal:basalz',
            'thermal:blitz',
            'thermal:blizz',
            'trials:breeze'
        ]
    },
    {
        name: 'Slime Swarm',
        type: 'slime',
        members: [
            'minecraft:slime',
            'terrarianslimes:spiked_ice_slime',
            'terrarianslimes:spiked_jungle_slime',
            'terrarianslimes:mother_slime',
            'terrarianslimes:baby_slime',
            'terrarianslimes:lava_slime',
            'terrarianslimes:spiked_slime',
            'terrarianslimes:umbrella_slime',
            'terrarianslimes:corrupt_slime',
            'terrarianslimes:slimeling',
            'terrarianslimes:crimslime',
            'terrarianslimes:illuminant_slime',
            'terrarianslimes:rainbow_slime',
            'terrarianslimes:jungle_slime',
            'terrarianslimes:sand_slime',
            'terrarianslimes:ice_slime',
            'terrarianslimes:black_slime',
            'terrarianslimes:yellow_slime',
            'terrarianslimes:purple_slime',
            'terrarianslimes:red_slime',
            'terrarianslimes:blue_slime',
            'terrarianslimes:green_slime'
        ]
    },
    {
        name: '\'Splosive Strike',
        type: 'creeper',
        members: [
            'ad_astra:sulfur_creeper',
            'creeperoverhaul:jungle_creeper',
            'creeperoverhaul:bamboo_creeper',
            'creeperoverhaul:desert_creeper',
            'creeperoverhaul:badlands_creeper',
            'creeperoverhaul:hills_creeper',
            'creeperoverhaul:savannah_creeper',
            'creeperoverhaul:mushroom_creeper',
            'creeperoverhaul:swamp_creeper',
            'creeperoverhaul:dripstone_creeper',
            'creeperoverhaul:cave_creeper',
            'creeperoverhaul:dark_oak_creeper',
            'creeperoverhaul:spruce_creeper',
            'creeperoverhaul:beach_creeper',
            'creeperoverhaul:snowy_creeper',
            'creeperoverhaul:ocean_creeper',
            'mekanismadditions:baby_creeper',
            'minecraft:creeper'
        ]
    },
]

//Announcements for server chat
const announcements = [
    'A ${siegeGroup} is coming after ${playerName}!',
    '${playerName} is getting attacked by a ${siegeGroup}',
    '${playerName}\'s life is being threatened by an incoming ${siegeGroup}',
    'A wild ${siegeGroup} is storming ${playerName}',
    '${playerName} is being charged by an incoming ${siegeGroup}',
    '${playerName} is now at war with a ${siegeGroup}',
    'A pack of angry ${mobType}s are trying to kill ${playerName}',
    'A cluster of ${mobCount} ${mobType}s have united to destroy ${playerName}',
    'The entire ${mobType} species have put their differences aside to annihilate ${playerName}'
]

//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////
LevelEvents.tick(event => {
    let level = event.getLevel()
    let players = level.getPlayers()
    let difficulty = level.getDifficulty().getKey()
    let {random} = level
    if (!disable /*&& level.dimension == 'minecraft:overworld'*/ && players.length > 0 && random.nextInt(chanceRandomBound) == 0 && difficulty != 'peaceful') {
        let siegeGroup = MOB_SIEGES[random.nextInt(MOB_SIEGES.length)]
        let siegeMembers = siegeGroup.members
        let player = players[random.nextInt(players.length)]
        let playerPos = new BlockPos(player.getX(), player.getY(), player.getZ())
        let playerInSafeBiome = comfuncs.functionalVar(level.getBiome(player), biome => biome == 'minecraft:mushroom_fields')  
        let playerChunkPos = level.getChunkAt(playerPos).getPos()
        let isPlayerOnSurface = testUnderground(level, playerPos).length > 1
        let isPlayerCreative = player.isCreative()
        let siegeBlockPos = new BlockPos(player.getX() + varRandInt(random, spawnDistBase, spawnDistVariation), player.getY(), player.getZ() + varRandInt(random, spawnDistBase, spawnDistVariation))
        let isProtected = getArea(level).chunks.some(safeChunk => playerChunkPos.getRegionX() == safeChunk.getRegionX() && playerChunkPos.getRegionZ() == safeChunk.getRegionZ())
        let spawnDist = commaths.diff(siegeBlockPos.getY(), player.getY())
        let mobCount = random.nextInt(mobCountVariation) + mobCountBase

        while(!level.canSeeSky(siegeBlockPos))
            siegeBlockPos = siegeBlockPos.above()

        while(level.getBlockState(siegeBlockPos.below()).isAir())
            siegeBlockPos = siegeBlockPos.below()
        
        console.info('[Mobsiege] Preparing a mob seige: {' +
            '\n    difficulty=' + difficulty + ', ' +
            '\n    forPlayer=' + player + ', ' +
            '\n    playerChunkPos=' + playerChunkPos + ', ' +
            '\n    playerOnSurface=' + isPlayerOnSurface + ',' +
            '\n    playerCreative=' + isPlayerCreative + ', ' +
            '\n    atPosition=' + siegeBlockPos + ', ' +
            '\n    seigeGroup=' + siegeGroup.name +  ', ' +
            '\n    isProtected=' + isProtected + ', ' +
            '\n    mobCount=' + mobCount
          + '\n}'

        )
        if (spawnDist < spawnDistMax && isPlayerOnSurface && !isProtected && !playerInSafeBiome && !isPlayerCreative) {
            level.tell('[Mobsiege] ' + comfuncs.interlaceString(getRandomElement(random, announcements), [
                {name: 'playerName', value: player.getName().getString()}, 
                {name: 'siegeGroup', value: siegeGroup.name}, 
                {name: 'mobType', value: siegeGroup.type},
                {name: 'mobCount', value: mobCount}
            ]))
            let square = Math.ceil(Math.sqrt(mobCount))
            for (let modX = 0; modX < square; modX++) {
                for (let modZ = 0; modZ < square; modZ++) {
                    if (modX * modZ < mobCount) {
                        let variedPos = new BlockPos(siegeBlockPos.getX() + modX - square/2, siegeBlockPos.getY(), siegeBlockPos.getZ() + modZ - square/2)
                        let memberPos = findSurfacePosition(level, variedPos)

                        // Error Correction //
                        if (commaths.diff(memberPos.getY(), siegeBlockPos.getY()) >= 10) {
                            var corrected = false
                            var directions = [
                                Direction.NORTH,
                                Direction.EAST,
                                Direction.SOUTH,
                                Direction.WEST
                            ]
                            for (var index = 0; index < directions.length; index++) {
                                var direction = directions[index]
                                var newMemberPos = variedPos
                                for (var deviation = 0; deviation < square ; deviation++) {
                                    newMemberPos = findSurfacePosition(level, newMemberPos.relative(direction))
                                    if (commaths.diff(newMemberPos.getY(), siegeBlockPos.getY()) >= 10) {
                                        corrected = true
                                        memberPos = newMemberPos
                                        break
                                    }
                                }
                                if (corrected)
                                    break
                            }
                            if (!corrected)
                                memberPos = siegeBlockPos
                        }
                        // Error Correction //

                        let entity = level.createEntity(getRandomElement(random, siegeMembers))
                        entity.setPosition(memberPos.getX(), memberPos.getY(), memberPos.getZ())
                        entity.spawn()
                    } else break
                }
            }    
        } else if (isProtected) level.tell(`[Mobsiege] An interdiction torch protected ${player.getName().getString()} against a mob siege!`)
    }
})

const safeAreas = []

BlockEvents.placed('projecte:interdiction_torch', event => {
    var {level} = event
    //if (!area.chunks.some(chunk => chunk.getRegionX() == safeChunk.getRegionX() && chunk.getRegionZ() == safeChunk.getRegionZ()))
    getArea(level).chunks.push(level.getChunkAt(event.block.getPos()).getPos())
})

BlockEvents.broken('projecte:interdiction_torch', event => {
    var {level} = event
    var area = getArea(level)
    var safeChunk = level.getChunkAt(event.block.getPos()).getPos()
    var expired = false

    area.chunks = area.chunks.filter(chunk => {
        if (!(chunk.getRegionX() == safeChunk.getRegionX() && chunk.getRegionZ() == safeChunk.getRegionZ() && expired)) {
            expired = true
            return false
        } else return true
    })
})

function getArea(level) {
    var area = null
    safeAreas.forEach(safeArea => {
        if (safeArea.dimension == level.dimension)
            area = safeArea
    })
    if (area == null) {
        area = {dimension: level.dimension, chunks: []}
        safeAreas.push(area)
    }
    return area
}

function getScanningDirections() {
    let allDirections = []
    var heightLevels = [
        Direction.UP,
        null,
        Direction.DOWN
    ]
    heightLevels.forEach(height => {
        let circle = [
            [Direction.NORTH],
            [Direction.NORTH, Direction.EAST],
            [Direction.EAST],
            [Direction.EAST, Direction.NORTH],
            [Direction.SOUTH],
            [Direction.SOUTH, Direction.WEST],
            [Direction.WEST],
            [Direction.WEST, Direction.NORTH]
        ]
        if (height != null)
            allDirections.push([height])
        circle.forEach(circleDirection => {
            if (height != null) 
                circleDirection.push(height)
            allDirections.push(circleDirection)
        })
            
    })
    return allDirections
}

function findSurfacePosition(level, blockPos) {
    while(!level.canSeeSky(blockPos))
            blockPos = blockPos.above()
    while(level.getBlockState(blockPos.below()).isAir())
            blockPos = blockPos.below()
    return blockPos
}

function testUnderground(level, blockPos) {
    let exposedPositions = []
    testDirections.forEach(direction => {
        testDirection(level, blockPos, blockPos, direction, exposedPositions)
    })
    return exposedPositions
}

function testDirection(level, originBlockPos, blockPos, direction, exposedPositions) {
    if (level.getBlockState(blockPos).isAir()) {
        if (level.canSeeSky(blockPos))
            exposedPositions.push(blockPos)
        else {
            direction.forEach(axisMove => blockPos = blockPos.relative(axisMove))
            if (!(commaths.diff(originBlockPos.getX(), blockPos.getX()) > surfaceSearchDist || commaths.diff(originBlockPos.getY(), blockPos.getY()) > surfaceSearchDist || commaths.diff(originBlockPos.getZ(), blockPos.getZ()) > surfaceSearchDist))
                testDirection(level, originBlockPos, blockPos, direction, exposedPositions)
        }
    }
}   

function varRandInt(random, base, bound) {
    let randInt = base + random.nextInt(bound)
    if (random.nextBoolean())
        return -randInt
    else return randInt
}

function getRandomElement(random, array) {
    return array[random.nextInt(array.length)]
}
