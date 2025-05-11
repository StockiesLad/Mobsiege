package com.stockieslad.mobsiege;

import net.minecraft.core.Registry;
import net.minecraft.core.registries.BuiltInRegistries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.sounds.SoundEvent;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.Block;
import net.minecraftforge.registries.ForgeRegistries;

import static com.stockieslad.mobsiege.Mobsiege.MODID;

public class RegistryHelper {
    public static ResourceLocation of(String path) {
        return new ResourceLocation(MODID, path);
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
        var location = new ResourceLocation(MODID, path);
        return Registry.register(BuiltInRegistries.SOUND_EVENT, location, SoundEvent.createVariableRangeEvent(location));
    }
}
