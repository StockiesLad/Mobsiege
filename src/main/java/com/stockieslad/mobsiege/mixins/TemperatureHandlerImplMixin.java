package com.stockieslad.mobsiege.mixins;

import com.stockieslad.mobsiege.api.Mobsiege2ToughAsNails;
import net.minecraft.core.BlockPos;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.state.BlockState;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;
import toughasnails.temperature.TemperatureHelperImpl;

import java.util.Set;

import static com.stockieslad.mobsiege.api.Mobsiege2ToughAsNails.TEMP_CHECK_CTX;
import static com.stockieslad.mobsiege.api.Mobsiege2ToughAsNails.checkBlockTemp;

@Mixin(TemperatureHelperImpl.class)
public class TemperatureHandlerImplMixin {

    @Inject(method = "addHeatingOrCooling", at = @At("HEAD"), remap = false)
    private static void mobsiege$cacheCtxOnHeatingOrCooling(Set<BlockPos> heating, Set<BlockPos> cooling, Level level, BlockPos pos, CallbackInfo ci) {
        TEMP_CHECK_CTX.set(new Mobsiege2ToughAsNails.TanTempCheckContext(level, pos));
    }

    @Inject(
            method = "isHeating(Lnet/minecraft/world/level/block/state/BlockState;)Z",
            at = @At(
                    value = "INVOKE",
                    target = "Lnet/minecraft/world/level/block/state/BlockState;is(Lnet/minecraft/tags/TagKey;)Z",
                    shift = At.Shift.AFTER
            ),
            cancellable = true
    )
    private void injectIntoHeatingTagCheck(BlockState state, CallbackInfoReturnable<Boolean> cir) {
        var ctx = TEMP_CHECK_CTX.get();
        var result = checkBlockTemp.checkBlockTemperature(ctx.level(), ctx.pos(), state);
        if (result != null)
            cir.setReturnValue(result);
    }
}
