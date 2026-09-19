package com.stockieslad.mobsiege.util;

import net.minecraft.resources.ResourceLocation;
import net.minecraft.sounds.SoundEvent;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.Block;
import net.minecraftforge.registries.ForgeRegistries;

import static com.stockieslad.mobsiege.Mobsiege.MODID;

public class RegistryHelper {
    public static ResourceLocation of(String path) {
        return ResourceLocation.fromNamespaceAndPath(MODID, path);
    }

    public static Block registerBlockAndItem(String path, Block block) {
        var id = of(path);
        ForgeRegistries.BLOCKS.register(id, block);
        ForgeRegistries.ITEMS.register(id, new BlockItem(block, new Item.Properties()));
        return block;
    }

    public static Item registerItem(String path, Item item) {
        var id = of(path);
        ForgeRegistries.ITEMS.register(id, item);
        return item;
    }

    public static SoundEvent registerSoundEvent(String path) {
        var location = ResourceLocation.fromNamespaceAndPath(MODID, path);
        var soundEvent = SoundEvent.createVariableRangeEvent(location);
        ForgeRegistries.SOUND_EVENTS.register(location, soundEvent);
        return soundEvent;
    }
}
