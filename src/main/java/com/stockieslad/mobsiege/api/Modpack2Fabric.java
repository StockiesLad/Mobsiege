package com.stockieslad.mobsiege.api;

import net.fabricmc.fabric.api.registry.FlammableBlockRegistry;
import net.minecraft.resources.ResourceLocation;
import net.minecraftforge.registries.ForgeRegistries;

import static com.stockieslad.mobsiege.api.Modpack2Minecraft.createBlockTag;

public class Modpack2Fabric {
    private static final FlammableBlockRegistry FLAMMABLE_BLOCK_REGISTRY_INSTANCE = FlammableBlockRegistry.getDefaultInstance();

    public static void fabricBlockFlammability(String string, int burn, int spread) {
        FLAMMABLE_BLOCK_REGISTRY_INSTANCE.add(ForgeRegistries.BLOCKS.getValue(ResourceLocation.parse(string)), burn, spread);
    }

    public static void fabricTagFlammability(String string, int burn, int spread) {
        FLAMMABLE_BLOCK_REGISTRY_INSTANCE.add(createBlockTag(string), burn, spread);
    }

    public static void init() {}
}
