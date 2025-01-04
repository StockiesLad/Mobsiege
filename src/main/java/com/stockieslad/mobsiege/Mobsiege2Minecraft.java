package com.stockieslad.mobsiege;

import net.minecraft.core.registries.Registries;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.stats.Stats;
import net.minecraft.tags.TagKey;
import net.minecraft.util.RandomSource;
import net.minecraft.world.InteractionHand;
import net.minecraft.world.entity.LivingEntity;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.item.ItemStack;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.level.block.state.properties.Property;
import org.jetbrains.annotations.Nullable;

import java.util.Objects;

public class Mobsiege2Minecraft {
    public static Args onBreaksRandomly = null;

    public static ResourceLocation identifier(String string) {
        return new ResourceLocation(string);
    }

    public static TagKey<Block> createBlockTag(String string) {
        return TagKey.create(Registries.BLOCK, identifier(string));
    }

    public static void damageItem(ItemStack itemStack, int damageAmount, LivingEntity entity, @Nullable InteractionHand hand) {
        var parsedHand = Objects.requireNonNullElse(hand, InteractionHand.MAIN_HAND);
        itemStack.hurtAndBreak(damageAmount, entity, (p_150686_) -> p_150686_.broadcastBreakEvent(parsedHand));
        if (entity instanceof Player player)
            player.awardStat(Stats.ITEM_USED.get(itemStack.getItem()));
    }

    public static <T extends Comparable<T>> BlockState stateWith(BlockState state, Property<T> property, T value) {
        return state.trySetValue(property, value);
    }

    protected static void init() {}

    public interface Args {
        int wrap(ItemStack itemStack, int damage, RandomSource random);
    }
}
