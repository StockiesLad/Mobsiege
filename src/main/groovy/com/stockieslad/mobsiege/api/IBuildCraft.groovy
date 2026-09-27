package com.stockieslad.mobsiege.api

import buildcraft.api.mj.MjAPI
import groovy.transform.CompileStatic
import net.minecraft.core.registries.Registries
import net.minecraft.resources.ResourceLocation
import net.minecraft.tags.TagKey
import net.minecraft.world.item.Item

@CompileStatic
@Singleton
class IBuildCraft {
    public final float ENGINE_RELIEF_TIME_TICKS = 0F
    public final float ENGINE_RELIEF_CHANCE = 0.25f
    public final float ENGINE_BASE_EXPLOSION = 2.0F
    public final float ENGINE_EXPLOSION_GROWTH = 2.0F
    public final float ENGINE_EXPLOSION_CHANCE_RECIPROCAL = 60 * 20
    public final float ENGINE_EXPLOSION_DECAY_FACTOR = 9 / (ENGINE_EXPLOSION_CHANCE_RECIPROCAL as Number)

    public final Map<TagKey<Item>, Long> CONVERSION_UPGRADES = new LinkedHashMap<>()

    public final TagKey<Item> IRON_GEARS, GOLD_GEARS

    {
        IRON_GEARS = TagKey.create(Registries.ITEM, ResourceLocation.parse("forge:gears/iron"))
        GOLD_GEARS = TagKey.create(Registries.ITEM, ResourceLocation.parse("forge:gears/gold"))
        CONVERSION_UPGRADES.put(IRON_GEARS, MjAPI.MJ * 2L);
        CONVERSION_UPGRADES.put(GOLD_GEARS,  MjAPI.MJ * 3L);
    }
}
