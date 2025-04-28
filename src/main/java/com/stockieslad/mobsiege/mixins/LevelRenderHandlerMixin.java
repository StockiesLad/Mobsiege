package com.stockieslad.mobsiege.mixins;

import com.llamalad7.mixinextras.sugar.Local;
import net.minecraft.core.BlockPos;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.state.BlockState;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;
import org.spongepowered.asm.mixin.injection.callback.LocalCapture;
import toughasnails.api.temperature.TemperatureHelper;
import toughasnails.client.handler.LevelRenderHandler;
import toughasnails.temperature.AreaFill;

import java.util.Set;

import static com.stockieslad.mobsiege.api.Mobsiege2ToughAsNails.TEMP_CHECK_CTX;
import static com.stockieslad.mobsiege.api.Mobsiege2ToughAsNails.TanTempCheckContext;

@Mixin(LevelRenderHandler.class)
public class LevelRenderHandlerMixin {

    @Inject(
            method = "populateConnectedBlocks",
            at = @At(
                    value = "INVOKE",
                    target = "Ltoughasnails/temperature/AreaFill;fill(Lnet/minecraft/world/level/Level;Lnet/minecraft/core/BlockPos;Ltoughasnails/temperature/AreaFill$PositionChecker;)V"
            ),
            locals = LocalCapture.CAPTURE_FAILEXCEPTION,
            remap = false
    )
    private static void mobsiege$cacheCtxOnPopulate(
        Player player,
        CallbackInfo ci,
        Level level,
        BlockPos playerPos,
        @Local(name = "passablePositions") Set<BlockPos> passablePositions,
        @Local(name = "heatingPositions") Set<BlockPos> heatingPositions,
        @Local(name = "coolingPositions") Set<BlockPos> coolingPositions,
        @Local(name = "blockingPositions") Set<BlockPos> blockingPositions
    ) {
        AreaFill.fill(level, playerPos, new AreaFill.PositionChecker() {
            public void onSolid(Level level, AreaFill.FillPos pos) {
                var newPos = pos.pos();
                BlockState state = level.getBlockState(newPos);
                TEMP_CHECK_CTX.set(new TanTempCheckContext(level, newPos));
                if (TemperatureHelper.isHeatingBlock(state)) {
                    heatingPositions.add(pos.pos());
                } else if (TemperatureHelper.isCoolingBlock(state)) {
                    coolingPositions.add(pos.pos());
                } else {
                    blockingPositions.add(pos.pos());
                }

            }

            //@Inject(method = "isPassable", at = @At("HEAD"), remap = false)
            //private void mobsiege$cacheCtxIsPassable(Level level, AreaFill.FillPos pos, CallbackInfoReturnable<Boolean> cir) {
            //    TEMP_CHECK_CTX.set(new TanTempCheckContext(level, pos.pos()));
            //}

            public void onPassable(Level level, AreaFill.FillPos pos) {
                TEMP_CHECK_CTX.set(new TanTempCheckContext(level, pos.pos()));
                passablePositions.add(pos.pos());
            }
        });
    }
}
