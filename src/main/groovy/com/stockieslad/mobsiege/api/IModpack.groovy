package com.stockieslad.mobsiege.api

import groovy.transform.CompileStatic
import net.minecraft.stats.Stats
import net.minecraft.util.RandomSource
import net.minecraft.world.InteractionHand
import net.minecraft.world.entity.LivingEntity
import net.minecraft.world.entity.player.Player
import net.minecraft.world.item.ItemStack
import org.jetbrains.annotations.Nullable

@CompileStatic
@Singleton
class IModpack {
    // TODO: Check what the hell this is supposed to do
    public Args onBreaksRandomly = null

    void damageItem(ItemStack itemStack, int damageAmount, LivingEntity entity, @Nullable InteractionHand hand) {
        var parsedHand = Objects.requireNonNullElse(hand, InteractionHand.MAIN_HAND)
        itemStack.hurtAndBreak(damageAmount, entity, (p_150686_) -> p_150686_.broadcastBreakEvent(parsedHand))
        if (entity instanceof Player player)
            player.awardStat(Stats.ITEM_USED.get(itemStack.getItem()))
    }

    interface Args {
        int wrap(ItemStack itemStack, int damage, RandomSource random)
    }
}
