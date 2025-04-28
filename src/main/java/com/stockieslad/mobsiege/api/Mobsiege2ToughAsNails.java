package com.stockieslad.mobsiege.api;

import net.minecraft.core.BlockPos;
import net.minecraft.core.registries.Registries;
import net.minecraft.tags.TagKey;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.state.BlockState;

import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;

public class Mobsiege2ToughAsNails {
    public static void init() {}

    public static final ThreadLocal<TanTempCheckContext> TEMP_CHECK_CTX = new ThreadLocal<>();

    public static BlockTempChecker checkBlockTemp = (level, pos, state) -> {
        /*
        if (!state.is(ModTags.Blocks.HEATING_BLOCKS)) {
            return false;
        }

        if (state.hasProperty(BlazeBurnerBlock.HEAT_LEVEL)) {
            BlazeBurnerBlock.HeatLevel heatLevel = state.getValue(BlazeBurnerBlock.HEAT_LEVEL);
            if (heatLevel.ordinal() > 1) {
                return true;
            }
        }

        if (level.getBlockEntity(pos) instanceof TileEngineBase_BC8 entity) {
            if (entity.isBurning())
                return true;
        }
        */
        return false;
    };

    public static TagKey<Item> THERMOREGULATOR = null;
    public static void addThermoregulators(String id) {
        THERMOREGULATOR = TagKey.create(Registries.ITEM, Mobsiege2Minecraft.identifier(id));
    }

    public static HashMap<Item, Integer> PURIFIER_FILTER_ADD_MAP = new HashMap<>();
    public static List<Item> PURIFIER_FILTER_REMOVE_LIST = new LinkedList<>();
    public static void addPurifyingFilter(Item item, int time) {
        PURIFIER_FILTER_ADD_MAP.put(item, time);
    }
    public static void addPurifyingFilterStack(ItemStack stack, int time) {
        addPurifyingFilter(stack.getItem(), time);
    }
    public static void removePurifyingFilter(Item item) {
        PURIFIER_FILTER_REMOVE_LIST.add(item);
    }
    public static void removePurifyingFilterStack(ItemStack stack) {
        removePurifyingFilter(stack.getItem());
    }

    public record TanTempCheckContext(Level level, BlockPos pos) {}

    public interface BlockTempChecker {
        Boolean checkBlockTemperature(Level level, BlockPos pos, BlockState state);
    }
}
