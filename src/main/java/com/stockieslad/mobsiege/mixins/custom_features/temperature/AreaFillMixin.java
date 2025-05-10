package com.stockieslad.mobsiege.mixins.custom_features.temperature;

import com.stockieslad.mobsiege.api.Mobsiege2ToughAsNails;
import net.minecraft.world.level.Level;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;
import toughasnails.temperature.AreaFill;

import static com.stockieslad.mobsiege.api.Mobsiege2ToughAsNails.TEMP_CHECK_CTX;

@Mixin(AreaFill.class)
public class AreaFillMixin {
    @Inject(method = "checkPassable", at = @At("HEAD"), remap = false)
    private static void mobsiege$cacheCtxOnCheckPassable(AreaFill.PositionChecker checker, Level level, AreaFill.FillPos pos, CallbackInfoReturnable<Boolean> cir) {
        TEMP_CHECK_CTX.set(new Mobsiege2ToughAsNails.TanTempCheckContext(level, pos.pos()));
    }
}
