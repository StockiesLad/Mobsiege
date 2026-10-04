package com.stockieslad.mobsiege.api

import com.stockieslad.mobsiege.ModpackApi
import groovy.transform.CompileStatic
import groovy.transform.TupleConstructor;
import net.minecraft.core.BlockPos;
import net.minecraft.core.registries.Registries;
import net.minecraft.tags.TagKey;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.state.BlockState

@CompileStatic
@Singleton
class IToughAsNails {
    public final ThreadLocal<TanTempCheckContext> TEMP_CHECK_CTX = new ThreadLocal<>()

    public TagKey<Item> thermoregulator = null
    public HashMap<Item, Integer> purifierFilterAddMap = new HashMap<>()
    public List<Item> purifierFilterRemoveList = new LinkedList<>()

    public BlockTempChecker checkBlockTemp = (level, pos, state) -> {
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
        return false
    }

    void addThermoregulators(String id) {
        thermoregulator = TagKey.create(Registries.ITEM, ModpackApi.minecraft().identifier(id))
    }

    void addPurifyingFilter(Item item, int time) {
        purifierFilterAddMap.put(item, time)
    }

    void addPurifyingFilterStack(ItemStack stack, int time) {
        addPurifyingFilter(stack.getItem(), time)
    }

    void removePurifyingFilter(Item item) {
        purifierFilterRemoveList.add(item)
    }

    void removePurifyingFilterStack(ItemStack stack) {
        removePurifyingFilter(stack.getItem())
    }

    @TupleConstructor
    static class TanTempCheckContext {
        Level level
        BlockPos pos
    }

    interface BlockTempChecker {
        Boolean checkBlockTemperature(Level level, BlockPos pos, BlockState state);
    }
}
