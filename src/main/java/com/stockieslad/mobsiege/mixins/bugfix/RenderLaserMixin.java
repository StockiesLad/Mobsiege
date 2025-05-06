package com.stockieslad.mobsiege.mixins.bugfix;

import buildcraft.silicon.client.render.RenderLaser;
import buildcraft.silicon.tile.TileLaser;
import com.mojang.blaze3d.vertex.PoseStack;
import net.minecraft.client.renderer.MultiBufferSource;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(RenderLaser.class)
public abstract class RenderLaserMixin {
    @Inject(
            method = "render(Lbuildcraft/silicon/tile/TileLaser;FLcom/mojang/blaze3d/vertex/PoseStack;Lnet/minecraft/client/renderer/MultiBufferSource;II)V",
            at = @At(value = "INVOKE", target = "Lbuildcraft/silicon/client/render/RenderLaser;isPlayerWearingGoggles()Z"),
            remap = false,
            cancellable = true
    )
    private void mobsiege$skipRenderIfAir(TileLaser tile, float partialTicks, PoseStack poseStack, MultiBufferSource bufferSource, int combinedLight, int combinedOverlay, CallbackInfo ci) {
        var level = tile.getLevel();
        if (level != null && level.getBlockState(tile.getBlockPos()).isAir())
            ci.cancel();
    }
}
