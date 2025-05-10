package com.stockieslad.mobsiege.api;

import buildcraft.energy.tile.TileEngineRF;
import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.tags.TagKey;
import net.minecraft.world.item.Item;

import java.util.LinkedHashMap;
import java.util.Map;

public class Mobsiege2BuildCraft {
    public static float ENGINE_RELIEF_TIME_TICKS = 0;
    public static float ENGINE_RELIEF_CHANCE = 0.25f;
    public static float ENGINE_BASE_EXPLOSION = 2.0F;
    public static float ENGINE_EXPLOSION_GROWTH = 2.0F;
    public static float ENGINE_EXPLOSION_CHANCE_RECIPROCAL = 60 * 20;
    public static float ENGINE_EXPLOSION_DECAY_FACTOR = 9 / ENGINE_EXPLOSION_CHANCE_RECIPROCAL;

    public static final TagKey<Item>
            IRON_GEARS = TagKey.create(Registries.ITEM, new ResourceLocation("forge:gears/iron")),
            GOLD_GEARS = TagKey.create(Registries.ITEM, new ResourceLocation("forge:gears/gold"));

    public static final Map<TagKey<Item>, Long> CONVERSION_UPGRADES = new LinkedHashMap<>();

    static {
        TileEngineRF.RF_UPGRADE.forEach((item, longInteger) -> {
            switch (item.getId().getPath().replace("gears/", "")) {
                default -> {}
                case "iron" -> CONVERSION_UPGRADES.put(IRON_GEARS, longInteger);
                case "gold" -> CONVERSION_UPGRADES.put(GOLD_GEARS, longInteger);
            }
        });
    }

    public static void init() {
    }
}
