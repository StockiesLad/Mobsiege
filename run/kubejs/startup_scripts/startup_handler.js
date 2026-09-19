Platform.mods.kubejs.name = 'Mobsiege'

const ResourceLocation = Java.loadClass('net.minecraft.resources.ResourceLocation')
const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')
const SoundEvents = Java.loadClass('net.minecraft.sounds.SoundEvents')

const Monster = Java.loadClass('net.minecraft.world.entity.monster.Monster')
const TrialsMobs = Java.loadClass('net.salju.trialstowers.init.TrialsMobs')
const TCoreEntities = Java.loadClass('cofh.thermal.core.init.registries.TCoreEntities')
const Blitz = Java.loadClass('cofh.thermal.core.common.entity.monster.Blitz')

const Mobsiege2Fabric = common.loadLocal('Mobsiege2Fabric')
const Mobsiege2ToughAsNails = common.loadLocal('Mobsiege2ToughAsNails')

const WART_COVERED_STONE = coveredStone(SoundEvents.WART_BLOCK_STEP)
const GRASS_COVERED_STONE = coveredStone(SoundEvents.GRASS_STEP)
const GRASS_COVERED_NETHERRACK = new SoundType(
    1.0,
    1.0,
    SoundEvents.NETHERRACK_BREAK,
    SoundEvents.GRASS_STEP,
    SoundEvents.NETHERRACK_PLACE,
    SoundEvents.NETHERRACK_HIT,
    SoundEvents.NETHERRACK_FALL
)

function coveredStone(step) {
    return new SoundType(
        1.0,
        1.0,
        SoundEvents.STONE_BREAK,
        step,
        SoundEvents.STONE_PLACE,
        SoundEvents.STONE_HIT,
        SoundEvents.STONE_FALL
    )
}