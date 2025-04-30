package com.stockieslad.mobsiege.mixins.bugfix;

import buildcraft.silicon.client.render.RenderLaser;
import com.mojang.blaze3d.vertex.PoseStack;
import net.minecraft.client.renderer.MultiBufferSource;
import net.minecraft.world.level.block.entity.BlockEntity;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@Mixin(RenderLaser.class)
public class RenderLaserMixin {
    @SuppressWarnings("DataFlowIssue")
    @Inject(method = "render*", at = @At("HEAD"), cancellable = true, remap = false)
    private void mobsiege$skipRenderIfAir(PoseStack poseStack, MultiBufferSource bufferSource, int packedLight, int packedOverlay, CallbackInfo ci) {
        BlockEntity blockEntity = (BlockEntity) (Object) this;
        //if (blockEntity.getLevel().getBlockState(blockEntity.getBlockPos()).isAir()) {
        if (blockEntity.getBlockState().isAir()) {
            ci.cancel();
        }
    }
}
