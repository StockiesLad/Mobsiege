package com.stockieslad.mobsiege.mixins.bugfix;

import com.alcatrazescapee.notreepunching.common.items.FireStarterItem;
import com.llamalad7.mixinextras.sugar.Local;
import net.minecraft.core.BlockPos;
import net.minecraft.sounds.SoundEvents;
import net.minecraft.sounds.SoundSource;
import net.minecraft.world.entity.player.Player;
import net.minecraft.world.level.Level;
import net.minecraft.world.level.block.BaseFireBlock;
import net.minecraft.world.level.block.Blocks;
import net.minecraft.world.level.block.state.BlockState;
import net.minecraft.world.phys.BlockHitResult;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;

//Fixes bug where a fire block does not perform the AbstractFireBlock#canPlace Check
@Mixin(FireStarterItem.class)
public class FireStarterItemMixin {
    @Redirect(method = "finishUsingItem", at = @At(value = "INVOKE", target = "Lnet/minecraft/world/level/Level;setBlockAndUpdate(Lnet/minecraft/core/BlockPos;Lnet/minecraft/world/level/block/state/BlockState;)Z"))
    private boolean mobsiege$checkFirePlacement(Level level, BlockPos pos, BlockState state, @Local BlockHitResult result, @Local Player player) {
        if (!state.is(Blocks.FIRE)) return level.setBlockAndUpdate(pos, state);
        var relativePos = pos.below().relative(result.getDirection());
        if (BaseFireBlock.canBePlacedAt(level, relativePos, player.getDirection())) {
            level.playSound(player, relativePos, SoundEvents.FLINTANDSTEEL_USE, SoundSource.BLOCKS, 1.0F, level.getRandom().nextFloat() * 0.4F + 0.8F);
            return level.setBlockAndUpdate(relativePos, BaseFireBlock.getState(level, relativePos));
        }
        return false;
    }
}
