package com.stockieslad.mobsiege.mixins.custom_features;

import lilypuree.decorative_blocks.blocks.LatticeBlock;
import me.fallenbreath.conditionalmixin.api.annotation.Condition;
import me.fallenbreath.conditionalmixin.api.annotation.Restriction;
import net.minecraft.world.level.block.SoundType;
import net.minecraft.world.level.block.state.properties.BlockSetType;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.ModifyArgs;
import org.spongepowered.asm.mixin.injection.invoke.arg.Args;

@Restriction(require = @Condition("decorative_blocks"))
@Mixin(LatticeBlock.class)
public class LatticeBlockMixin {

    @ModifyArgs(method = "<init>", at = @At(value = "INVOKE", target = "Lnet/minecraft/world/level/block/TrapDoorBlock;<init>(Lnet/minecraft/world/level/block/state/BlockBehaviour$Properties;Lnet/minecraft/world/level/block/state/properties/BlockSetType;)V"))
    private static void setType(Args args) {
        if (((IPropertiesMixin)args.get(0)).getSoundType() == SoundType.STONE)
            args.set(1, BlockSetType.STONE);
    }
}
