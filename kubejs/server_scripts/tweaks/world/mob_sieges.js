//Imports
const BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const SpawnType = Java.loadClass('net.minecraft.world.entity.SpawnPlacements$Type')
const Direction = Java.loadClass('net.minecraft.core.Direction')

//Modification Variables
const testDirections = getScanningDirections()
const disable = false
const chanceRandomBound = 50000
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
        type: 'charger',
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
    '${playerName}\'s life is being threatned by an incoming ${siegeGroup}',
    'A wild ${siegeGroup} is storming ${playerName}',
    '${playerName} is being charged by an incoming ${siegeGroup}',
    '${playerName} is now at war with a ${siegeGroup}',
    'A pack of angry ${mobType}s are trying to kill ${playerName}',
    'A cluster of ${mobCount} ${mobType}s have united to destroy ${playerName}',
    'The entire ${mobType} species have put their differences aside to annihilate ${playerName}'
]

let count = 0
LevelEvents.tick(event => {
    let level = event.getLevel()
    let players = level.getPlayers()
    let difficulty = level.getDifficulty().getKey()
    let {random} = level
    if (!disable && level.dimension == 'minecraft:overworld' && players.length > 0 && random.nextInt(chanceRandomBound) == 0 && difficulty != 'peaceful') {
        let siegeGroup = MOB_SIEGES[random.nextInt(MOB_SIEGES.length)]
        let siegeMembers = siegeGroup.members
        let player = players[random.nextInt(players.length)]
        let playerPos = new BlockPos(player.getX(), player.getY(), player.getZ())
        let isPlayerOnSurface = testUnderground(level, playerPos).length > 5
        let isPlayerCreative = player.isCreative()
        let siegeBlockPos = new BlockPos(player.getX() + varRandInt(random, spawnDistBase, spawnDistVariation), player.getY(), player.getZ() + varRandInt(random, spawnDistBase, spawnDistVariation))
        let spawnDist = diff(siegeBlockPos.getY(), player.getY())
        let mobCount = random.nextInt(mobCountVariation) + mobCountBase

        while(!level.canSeeSky(siegeBlockPos))
            siegeBlockPos = siegeBlockPos.above()

        while(level.getBlockState(siegeBlockPos.below()).isAir())
            siegeBlockPos = siegeBlockPos.below()
        
        console.info('[MobSiege] Attempting to spawn a mob seige: {' +
            '\n    difficulty=' + difficulty + ', ' +
            '\n    forPlayer=' + player + ', ' +
            '\n    playerOnSurface=' + isPlayerOnSurface + ',' +
            '\n    playerCreative=' + isPlayerCreative + ', ' +
            '\n    atPosition=' + siegeBlockPos + ', ' +
            '\n    seigeGroup=' + siegeGroup.name +  ', ' +
            '\n    mobCount=' + mobCount
          + '\n}'

        )

        if (spawnDist < spawnDistMax && isPlayerOnSurface && !isPlayerCreative) {
            level.tell('[Server] ' + insertStringInterlace(getRandomElement(random, announcements), [
                {name: 'playerName', value: player.getName().getString()}, 
                {name: 'siegeGroup', value: siegeGroup.name}, 
                {name: 'mobType', value: siegeGroup.type},
                {name: 'mobCount', value: mobCount}
            ]))
            let square = Math.ceil(Math.sqrt(mobCount))
            for (let modX = 0; modX < square; modX++) {
                for (let modZ = 0; modZ < square; modZ++) {
                    if (modX * modZ < mobCount) {
                        let memberPos = findSurfacePosition(level, new BlockPos(siegeBlockPos.getX() + modX - square/2, siegeBlockPos.getY(), siegeBlockPos.getZ() + modZ - square/2))
                        let entity = level.createEntity(getRandomElement(random, siegeMembers))
                        entity.setPosition(memberPos.getX(), memberPos.getY(), memberPos.getZ())
                        entity.spawn()
                    } else break
                }
            }    
        }
    }
})

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
            if (!(diff(originBlockPos.getX(), blockPos.getX()) > surfaceSearchDist || diff(originBlockPos.getY(), blockPos.getY()) > surfaceSearchDist || diff(originBlockPos.getZ(), blockPos.getZ()) > surfaceSearchDist))
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

function diff (a, b) {
    return a > b ? a - b : b - a
}

function insertStringInterlace(string, interlaces) {
    global.ensureArray(interlaces).forEach(interlace => string = string = string.replace(createStringInterlaceBasic(interlace.name), interlace.value))
    return string
}

function createStringInterlaceComplex(object) {
    return {name: Object.getName(object), value: object}
}
function createStringInterlaceBasic(name) {
    return "${" + name + "}"
}

function getRandomElement(random, array) {
    return array[random.nextInt(array.length)]
}
