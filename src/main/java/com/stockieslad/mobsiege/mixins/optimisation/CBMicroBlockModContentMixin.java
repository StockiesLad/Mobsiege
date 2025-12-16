package com.stockieslad.mobsiege.mixins.optimisation;

import codechicken.microblock.api.BlockMicroMaterial;
import codechicken.microblock.api.MicroMaterial;
import codechicken.microblock.init.CBMicroblockModContent;
import codechicken.microblock.util.MicroMaterialRegistry;
import net.minecraft.world.level.block.Blocks;
import net.minecraftforge.registries.DeferredRegister;
import net.minecraftforge.registries.RegisterEvent;
import net.minecraftforge.registries.RegistryObject;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.Redirect;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

import java.util.function.Supplier;

@SuppressWarnings("UnstableApiUsage")
@Mixin(CBMicroblockModContent.class)
public class CBMicroBlockModContentMixin {
    @Shadow
    private static void registerMaterial(RegisterEvent.RegisterHelper< MicroMaterial > r, BlockMicroMaterial material) {}

    @Inject(method = "onRegisterMicroMaterials", at = @At("HEAD"), cancellable = true, remap = false)
    private static void mobsiege$removeVanillaMaterials(RegisterEvent event, CallbackInfo ci) {
        ci.cancel();
        event.register(MicroMaterialRegistry.MICRO_MATERIALS.getRegistryKey(), (r) ->
                registerMaterial(r, new BlockMicroMaterial(Blocks.STONE))
        );
    }

    @Redirect(method = "<clinit>", at = @At(value = "INVOKE", target = "Lnet/minecraftforge/registries/DeferredRegister;register(Ljava/lang/String;Ljava/util/function/Supplier;)Lnet/minecraftforge/registries/RegistryObject;"))
    private static <I> RegistryObject<I> mobsiege$removeItemGroup(DeferredRegister<I> instance, String s, Supplier<? extends I> name) {
        if (!s.equals("microblocks"))
            return instance.register(s, name);
        else return null;
    }
}
