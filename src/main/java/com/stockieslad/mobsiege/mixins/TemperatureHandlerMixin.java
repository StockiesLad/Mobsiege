package com.stockieslad.mobsiege.mixins;

import net.minecraft.world.effect.MobEffect;
import net.minecraft.world.entity.player.Player;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;
import toughasnails.api.potion.TANEffects;
import toughasnails.temperature.TemperatureHandler;

import static com.stockieslad.mobsiege.api.Mobsiege2ToughAsNails.THERMOREGULATOR;

@Mixin(TemperatureHandler.class)
public class TemperatureHandlerMixin {
    @Redirect(method = "onPlayerTick", at = @At(value = "INVOKE", target = "Lnet/minecraft/world/entity/player/Player;hasEffect(Lnet/minecraft/world/effect/MobEffect;)Z"))
    private static boolean mobsiege$thermoregulate(Player instance, MobEffect mobEffect) {
        var original = instance.hasEffect(mobEffect);
        if (mobEffect.equals(TANEffects.CLIMATE_CLEMENCY)) return original || (THERMOREGULATOR != null && instance.getInventory().contains(THERMOREGULATOR));
        else return original;
    }
}
