package com.stockieslad.mobsiege.mixins.custom_features;

import net.minecraft.server.level.ServerPlayer;
import net.minecraft.util.RandomSource;
import net.minecraft.world.item.ItemStack;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;

import static com.stockieslad.mobsiege.api.Mobsiege2Minecraft.onBreaksRandomly;

@Mixin(ItemStack.class)
public abstract class ItemStackMixin {
    @Redirect(method = "hurtAndBreak", at = @At(value = "INVOKE", target = "Lnet/minecraft/world/item/ItemStack;hurt(ILnet/minecraft/util/RandomSource;Lnet/minecraft/server/level/ServerPlayer;)Z"))
    private boolean mobsiege$randomlyDamage(ItemStack stack, int damage, RandomSource random, ServerPlayer player) {
        if (onBreaksRandomly != null)
            damage = onBreaksRandomly.wrap(stack, damage, random);
        return stack.hurt(damage, random, player);
    }
}
