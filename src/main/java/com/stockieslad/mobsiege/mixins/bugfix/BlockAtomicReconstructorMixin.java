package com.stockieslad.mobsiege.mixins.bugfix;

import com.llamalad7.mixinextras.sugar.Local;
import com.stockieslad.mobsiege.api.Mobsiege2Minecraft;
import de.ellpeck.actuallyadditions.mod.blocks.BlockAtomicReconstructor;
import net.minecraft.util.RandomSource;
import net.minecraft.world.level.Level;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;

@Mixin(BlockAtomicReconstructor.TheItemBlock.class)
public abstract class BlockAtomicReconstructorMixin {
    @Redirect(method = "appendHoverText", at = @At(value = "INVOKE", target = "Lnet/minecraft/util/RandomSource;nextInt(I)I"))
    private int mobsiege$replaceRandom(RandomSource instance, int i, @Local(argsOnly = true) Level level) {
        return Mobsiege2Minecraft.SAFE_CLIENT_RANDOM.nextInt(i);
    }
}