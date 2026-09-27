package com.stockieslad.mobsiege.mixins.custom_features.temperature;

import com.stockieslad.mobsiege.ModpackApi;
import com.stockieslad.mobsiege.api.IToughAsNails;
import me.fallenbreath.conditionalmixin.api.annotation.Condition;
import me.fallenbreath.conditionalmixin.api.annotation.Restriction;
import net.minecraft.world.level.Level;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;
import toughasnails.temperature.AreaFill;

@Restriction(require = @Condition("toughasnails"))
@Mixin(AreaFill.class)
public class AreaFillMixin {
    @Inject(method = "checkPassable", at = @At("HEAD"), remap = false)
    private static void mobsiege$cacheCtxOnCheckPassable(AreaFill.PositionChecker checker, Level level, AreaFill.FillPos pos, CallbackInfoReturnable<Boolean> cir) {
        ModpackApi.toughAsNails().TEMP_CHECK_CTX.set(new IToughAsNails.TanTempCheckContext(level, pos.pos()));
    }
}
