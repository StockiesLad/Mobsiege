//Imports
const BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const SpawnType = Java.loadClass('net.minecraft.world.entity.SpawnPlacements$Type')
const Direction = Java.loadClass('net.minecraft.core.Direction')
const ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer')
const ForgeFakePlayer = Java.loadClass('net.minecraftforge.common.util.FakePlayer')
const FabricFakePlayer = Java.loadClass('net.fabricmc.fabric.api.entity.FakePlayer')

//Modification Variables
const disabled = false
const testDirections = getScanningDirections()
const chanceRandomBound = 25000
const spawnDistBase = 5 
const spawnDistVariation = 10
const spawnDistMax = spawnDistBase + spawnDistVariation
const mobCountBase = 15
const mobCountVariation = 10
const surfaceSearchDist = 10

//Mob Siege Types
const MOB_SIEGES = [
    {
        name: 'Bliztic Barrage',
        type: 'Blaze',
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
        type: 'Slime',
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
        type: 'Creeper',
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
    {
        name: 'Skeletal Slaughter',
        type: 'Skeleton',
        members: [
            'betternether:jungle_skeleton',
            'minecraft:skeleton',
            'minecraft:skeleton_horse',
            'minecraft:wither_skeleton',
            'promenade:sunken_skeleton',
            'mekanismadditions:baby_skeleton',
            'mekanismadditions:baby_wither_skeleton'
        ]
    },
    {
        name: 'Undead Uprising',
        type: 'Zombie',
        members: [
            'minecraft:zombie_villager',
            'minecraft:zombie',
            'undead_revamp2:theheavy',
            'undead_revamp2:thespitter',
            'undead_revamp2:bomber',
            'undead_revamp2:thebidy',
            'undead_revamp2:clogger',
            'undead_revamp2:therod',
            'undead_revamp2:deadclogger',
            'undead_revamp2:thepregnant',
            'undead_revamp2:thelurker',
            'undead_revamp2:thehorrors',
            'undead_revamp2:thehorrors',
            'undead_revamp2:thehorrors',
            'undead_revamp2:thehorrorsdecoys',
            'undead_revamp2:thesmoker',
            'undead_revamp2:theskeeper',
            'undead_revamp2:theimmortal',
            'undead_revamp2:thebeartamer',
            'undead_revamp2:thewolf',
            'undead_revamp2:slaveman',
            'undead_revamp2:theswarmer',
            'undead_revamp2:invisiclogger',
            'undead_revamp2:invisiimmortal',
            'undead_revamp2:invisiblebidy',
            'undead_revamp2:neocrorines',
            'undead_revamp2:thedungeon',
            'undead_revamp2:thegliter',
            'undead_revamp2:thespectre',
            'undead_revamp2:the_moonflower',
            'undead_revamp2:theordure',
            'undead_revamp2:sucker',
            'undead_revamp2:thehunter',
            'undead_revamp2:thesomnolence',
            'undead_revamp2:bigsucker'
        ]
    }
]

//Announcements for server chat
const announcements = [
    'A ${siegeGroup} is coming after ${playerName}!',
    '${playerName} is getting attacked by ${sgArticle} ${siegeGroup}',
    '${playerName}\'s life is being threatened by an incoming ${siegeGroup}',
    'A wild ${siegeGroup} is storming ${playerName}',
    '${playerName} is being charged by an incoming ${siegeGroup}',
    '${playerName} is now at war with ${sgArticle} ${siegeGroup}',
    'A pack of angry ${mobType}s are trying to kill ${playerName}',
    'A cluster of ${mobCount} ${mobType}s have united to destroy ${playerName}',
    'The entire ${mobType} species have put their differences aside to annihilate ${playerName}'
]

//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////IMPLEMENTATION//////
PlayerEvents.tick(event => {
    if (disabled) return

    if (!event.getEntity() instanceof ServerPlayer) return

    let player = event.getPlayer()
    if (player instanceof ForgeFakePlayer || player instanceof FabricFakePlayer) return

    let level = event.getLevel()
    let difficulty = level.getDifficulty().getKey()
    if (difficulty == 'peaceful') return

    var isInGracePeriod = level.getLevelData().getGameTime() < 24000 && level.getDayTime() > 15000
    if (isInGracePeriod) return

    let random = level.getRandom()
    if (random.nextInt(chanceRandomBound) != 0) return

    let siegeGroup = MOB_SIEGES[random.nextInt(MOB_SIEGES.length)]
    let siegeMembers = siegeGroup.members
    let playerPos = new BlockPos(player.getX(), player.getY(), player.getZ())
    let playerInSafeBiome = comfuncs.functionalVar(level.getBiome(player), biome => biome == 'minecraft:mushroom_fields')  
    let playerChunkPos = level.getChunkAt(playerPos).getPos()
    let isPlayerOnSurface = testUnderground(level, playerPos).length > 1
    let isPlayerCreative = player.isCreative()
    let siegeBlockPos = new BlockPos(player.getX() + varRandInt(random, spawnDistBase, spawnDistVariation), player.getY(), player.getZ() + varRandInt(random, spawnDistBase, spawnDistVariation))
    let isProtected = isChunkSafe(level, playerChunkPos)
    let spawnDist = commaths.diff(siegeBlockPos.getY(), player.getY())
    let mobCount = random.nextInt(mobCountVariation) + mobCountBase

    while(!level.canSeeSky(siegeBlockPos))
        siegeBlockPos = siegeBlockPos.above()

    while(level.getBlockState(siegeBlockPos.below()).isAir())
        siegeBlockPos = siegeBlockPos.below()
    
    console.info('[Mobsiege] Attempting a mob seige: {' +
        '\n    difficulty=' + difficulty + ', ' +
        '\n    gracePeriod=' + isInGracePeriod + ', ' +
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
        level.tell(Text.darkRed('[Mobsiege] ' + comfuncs.interlaceString(getRandomElement(random, announcements), [
            {name: 'playerName', value: player.getName().getString()}, 
            {name: 'siegeGroup', value: siegeGroup.name},
            {name: 'sgArticle', value: siegeGroup.name.charAt(0) == 'U' ? 'an' : 'a'}, 
            {name: 'SgArticle', value: siegeGroup.name.charAt(0) == 'U' ? 'An' : 'A'}, 
            {name: 'mobType', value: siegeGroup.type.toLowerCase()},
            {name: 'mobType', value: siegeGroup.type},
            {name: 'mobCount', value: mobCount}
        ])))
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
