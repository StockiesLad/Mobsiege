package com.stockieslad.mobsiege.mixins;

import com.llamalad7.mixinextras.sugar.Local;
import net.minecraft.tags.TagKey;
import net.minecraft.util.RandomSource;
import net.minecraft.world.item.Item;
import net.minecraft.world.item.ItemStack;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.ModifyVariable;

import static com.stockieslad.mobsiege.Mobsiege2Minecraft.onBreaksRandomly;

@Mixin(ItemStack.class)
public abstract class ItemStackMixin {
    @Shadow public abstract boolean is(TagKey<Item> p_204118_);

    @Shadow public abstract int getMaxDamage();

    @ModifyVariable(method = "hurt", at = @At("RETURN"), ordinal = 0, argsOnly = true)
    private int mobsiege$randomlyDamage(int damage, @Local(argsOnly = true) RandomSource random) {
        if (onBreaksRandomly != null)
            return onBreaksRandomly.wrap((ItemStack) (Object)this, damage, random);
        return damage;
    }
}
