package com.stockieslad.mobsiege.mixins;

import codechicken.microblock.init.CBMicroblockModContent;
import net.minecraftforge.registries.RegisterEvent;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

@SuppressWarnings("UnstableApiUsage")
@Mixin(CBMicroblockModContent.class)
public class CBMicroBlockModContentMixin {
    @Inject(method = "onRegisterMicroMaterials", at = @At("HEAD"), cancellable = true, remap = false)
    private static void mobsiege$removeVanillaMaterials(RegisterEvent event, CallbackInfo ci) {
        ci.cancel();
    }
}
