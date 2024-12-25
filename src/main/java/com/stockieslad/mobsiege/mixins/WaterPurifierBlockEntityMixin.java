package com.stockieslad.mobsiege.mixins;

import com.google.common.collect.ImmutableMap;
import net.minecraft.world.item.Item;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfoReturnable;
import toughasnails.block.entity.WaterPurifierBlockEntity;

import java.util.HashMap;

import static com.stockieslad.mobsiege.Mobsiege.LOGGER;
import static com.stockieslad.mobsiege.Mobsiege2ToughAsNails.PURIFIER_FILTER_ADD_MAP;
import static com.stockieslad.mobsiege.Mobsiege2ToughAsNails.PURIFIER_FILTER_REMOVE_LIST;

@Mixin(WaterPurifierBlockEntity.class)
public class WaterPurifierBlockEntityMixin {

    @Inject(method = "getFilterDurations", at = @At("RETURN"), remap = false, cancellable = true)
    private static void mobsiege$appendFilters(CallbackInfoReturnable<ImmutableMap<Item, Integer>> cir) {
        var map = new HashMap<>(cir.getReturnValue());
        PURIFIER_FILTER_REMOVE_LIST.forEach(map::remove);
        map.putAll(PURIFIER_FILTER_ADD_MAP);
        LOGGER.info("[MOBSIEGE] Modified Filters for Tough as Nails: map=" + map);
        cir.setReturnValue(ImmutableMap.<Item, Integer>builder().putAll(map).build());
    }
}
