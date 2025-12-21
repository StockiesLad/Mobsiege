package com.stockieslad.mobsiege.mixins.custom_features;

import net.minecraft.world.level.block.SoundType;
import net.minecraft.world.level.block.state.BlockBehaviour;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.gen.Accessor;

@Mixin(BlockBehaviour.Properties.class)
public interface IPropertiesMixin {
    @Accessor(value = "soundType")
    SoundType getSoundType();
}
