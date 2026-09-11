package com.stockieslad.mobsiege.mixins.bugfix.conversion_gears;

import buildcraft.energy.client.gui.GuiEngineRF;
import cofh.thermal.core.ThermalCore;
import me.fallenbreath.conditionalmixin.api.annotation.Condition;
import me.fallenbreath.conditionalmixin.api.annotation.Restriction;
import net.minecraft.client.gui.GuiGraphics;
import net.minecraft.world.item.ItemStack;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;

@Restriction(require = {
        @Condition("thermal"),
        @Condition("buildcraft")
})
@Mixin(GuiEngineRF.class)
public class GuiEngineRFMixin {
    @Redirect(method = "drawBackgroundLayer", at = @At(value = "INVOKE", target = "Lnet/minecraft/client/gui/GuiGraphics;renderItem(Lnet/minecraft/world/item/ItemStack;II)V", ordinal = 0))
    private void mobsiege$switchIron(GuiGraphics instance, ItemStack stack, int x, int y) {
        instance.renderItem(new ItemStack(ThermalCore.ITEMS.get("thermal", "iron_gear")), x, y);
    }

    @Redirect(method = "drawBackgroundLayer", at = @At(value = "INVOKE", target = "Lnet/minecraft/client/gui/GuiGraphics;renderItem(Lnet/minecraft/world/item/ItemStack;II)V", ordinal = 1))
    private void mobsiege$switchGold(GuiGraphics instance, ItemStack stack, int x, int y) {
        instance.renderItem(new ItemStack(ThermalCore.ITEMS.get("thermal", "gold_gear")), x, y);
    }
}
