package com.stockieslad.mobsiege.mixins;

import com.esm.nightmare.NightmareMain;
import com.llamalad7.mixinextras.sugar.Local;
import net.minecraft.world.entity.MobSpawnType;
import net.minecraftforge.event.entity.living.MobSpawnEvent;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;

@Mixin(NightmareMain.class)
public abstract class NightmareMainMixin {
    @Shadow abstract boolean ShouldDuplicate();

    @Redirect(method = "onEntitySpawn", at = @At(value = "INVOKE", target = "Lcom/esm/nightmare/NightmareMain;ShouldDuplicate()Z"), remap = false)
    private boolean mobsiege$fixDeadlock(NightmareMain instance, @Local(argsOnly = true) MobSpawnEvent.FinalizeSpawn spawn) {
        return spawn.getSpawnType() != MobSpawnType.STRUCTURE && ShouldDuplicate();
    }
}
