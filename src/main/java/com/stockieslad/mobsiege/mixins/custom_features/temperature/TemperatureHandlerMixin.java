package com.stockieslad.mobsiege.mixins.custom_features.temperature;

import com.stockieslad.mobsiege.ModpackApi;
import me.fallenbreath.conditionalmixin.api.annotation.Condition;
import me.fallenbreath.conditionalmixin.api.annotation.Restriction;
import net.minecraft.world.effect.MobEffect;
import net.minecraft.world.entity.player.Player;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;
import toughasnails.api.potion.TANEffects;
import toughasnails.temperature.TemperatureHandler;

@Restriction(require = @Condition("toughasnails"))
@Mixin(TemperatureHandler.class)
public class TemperatureHandlerMixin {
    @Redirect(method = "onPlayerTick", at = @At(value = "INVOKE", target = "Lnet/minecraft/world/entity/player/Player;hasEffect(Lnet/minecraft/world/effect/MobEffect;)Z"))
    private static boolean mobsiege$thermoregulate(Player instance, MobEffect mobEffect) {
        var original = instance.hasEffect(mobEffect);
        if (mobEffect.equals(TANEffects.CLIMATE_CLEMENCY)) return original ||
                (ModpackApi.toughAsNails().thermoregulator != null && instance.getInventory().contains(ModpackApi.toughAsNails().thermoregulator));
        else return original;
    }
}
