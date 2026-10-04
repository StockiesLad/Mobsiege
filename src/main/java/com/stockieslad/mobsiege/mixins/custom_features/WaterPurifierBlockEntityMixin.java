package com.stockieslad.mobsiege.mixins.custom_features;

import com.google.common.collect.ImmutableMap;
import com.stockieslad.mobsiege.ModpackApi;
import me.fallenbreath.conditionalmixin.api.annotation.Condition;
import me.fallenbreath.conditionalmixin.api.annotation.Restriction;
import net.minecraft.world.item.Item;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;
import toughasnails.block.entity.WaterPurifierBlockEntity;

import java.util.HashMap;

@Restriction(require = @Condition("toughasnails"))
@Mixin(WaterPurifierBlockEntity.class)
public class WaterPurifierBlockEntityMixin {

    @Inject(method = "getFilterDurations", at = @At("RETURN"), remap = false, cancellable = true)
    private static void mobsiege$appendFilters(CallbackInfoReturnable<ImmutableMap<Item, Integer>> cir) {
        var map = new HashMap<>(cir.getReturnValue());
        ModpackApi.toughAsNails().purifierFilterRemoveList.forEach(map::remove);
        map.putAll(ModpackApi.toughAsNails().purifierFilterAddMap);
        cir.setReturnValue(ImmutableMap.<Item, Integer>builder().putAll(map).build());
    }
}
