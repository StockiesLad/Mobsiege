package com.stockieslad.mobsiege.mixins.bugfix.conversion_gears;

import buildcraft.energy.tile.TileEngineRF;
import com.llamalad7.mixinextras.sugar.Local;
import net.minecraft.world.item.ItemStack;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.Redirect;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;

import java.util.Optional;
import java.util.concurrent.atomic.AtomicReference;
import java.util.stream.Stream;

import static com.stockieslad.mobsiege.api.Mobsiege2BuildCraft.CONVERSION_UPGRADES;

@Mixin(TileEngineRF.class)
public class TileEngineRFMixin {
    @Inject(method = "isValidUpgrade", at = @At("HEAD"), cancellable = true, remap = false)
    private void mobsiege$validateWithTags(int slot, ItemStack stack, CallbackInfoReturnable<Boolean> cir) {
        cir.setReturnValue(CONVERSION_UPGRADES.keySet().stream().anyMatch(stack::is));
    }

    @Redirect(method = "getMjPerTick", at = @At(value = "INVOKE", target = "Ljava/util/stream/Stream;findFirst()Ljava/util/Optional;"), remap = false)
    private Optional<Long> mobsiege$replaceEnergy(Stream<Long> stream, @Local ItemStack stack) {
        AtomicReference<Long> ref = new AtomicReference<>();
        CONVERSION_UPGRADES.forEach((tag, longInteger) -> {
            if (stack.is(tag)) ref.set(longInteger);
        });
        return Optional.ofNullable(ref.get());
    }
}
