package com.stockieslad.mobsiege.api

import buildcraft.api.mj.MjAPI
import groovy.transform.CompileStatic
import net.minecraft.core.registries.Registries
import net.minecraft.resources.ResourceLocation
import net.minecraft.tags.TagKey
import net.minecraft.world.item.Item

@CompileStatic
@Singleton(strict = false)
class IBuildCraft {
    public final float engineReliefTimeTicks = 0F
    public final float engineReliefChance = 0.25f
    public final float engineBaseExplosion = 2.0F
    public final float engineExplosionGrowth = 2.0F
    public final float engineExplosionChanceReciprocal = 60 * 20
    public final float engineExplosionDecayFactor = 9 / (engineExplosionChanceReciprocal as Number)

    public final Map<TagKey<Item>, Long> CONVERSION_UPGRADES = new LinkedHashMap<>()
    public final TagKey<Item> IRON_GEARS, GOLD_GEARS

    private IBuildCraft() {
        IRON_GEARS = TagKey.create(Registries.ITEM, ResourceLocation.parse("forge:gears/iron"))
        GOLD_GEARS = TagKey.create(Registries.ITEM, ResourceLocation.parse("forge:gears/gold"))
        CONVERSION_UPGRADES.put(IRON_GEARS, MjAPI.MJ * 2L)
        CONVERSION_UPGRADES.put(GOLD_GEARS,  MjAPI.MJ * 3L)
    }
}
