package com.stockieslad.mobsiege.mixins;

import net.minecraft.world.effect.MobEffect;
import net.minecraft.world.entity.player.Player;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;
import toughasnails.temperature.TemperatureHandler;

import static com.stockieslad.mobsiege.Mobsiege2ToughAsNails.THERMOREGULATOR;

@Mixin(TemperatureHandler.class)
public class TemperatureHandlerMixin {
    @Redirect(method = "onPlayerTick", at = @At(value = "INVOKE", target = "Lnet/minecraft/world/entity/player/Player;m_21023_(Lnet/minecraft/world/effect/MobEffect;)Z"), remap = false)
    private static boolean mobsiege$thermoregulate(Player instance, MobEffect mobEffect) {
        return instance.hasEffect(mobEffect) || (THERMOREGULATOR != null && instance.getInventory().contains(THERMOREGULATOR));
    }
}
