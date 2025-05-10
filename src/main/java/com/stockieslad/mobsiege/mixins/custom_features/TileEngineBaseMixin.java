package com.stockieslad.mobsiege.mixins.custom_features;

import buildcraft.core.tile.TileEngineCreative;
import buildcraft.lib.engine.TileEngineBase_BC8;
import net.minecraft.core.particles.ParticleTypes;
import net.minecraft.nbt.CompoundTag;
import net.minecraft.network.protocol.game.ClientboundExplodePacket;
import net.minecraft.server.level.ServerLevel;
import net.minecraft.sounds.SoundEvents;
import net.minecraft.sounds.SoundSource;
import net.minecraft.util.Mth;
import net.minecraft.world.level.Level;
import net.minecraft.world.phys.Vec3;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.Unique;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Inject;
import org.spongepowered.asm.mixin.injection.callback.CallbackInfo;

import java.util.Collections;

import static com.stockieslad.mobsiege.api.Mobsiege2BuildCraft.*;

@Mixin(TileEngineBase_BC8.class)
public abstract class TileEngineBaseMixin {

    @Shadow(remap = false) public abstract boolean isBurning();

    @Unique
    private int mobsiege$ticksOverheated = 0;

    @SuppressWarnings({"DataFlowIssue", "SpellCheckingInspection"})
    @Inject(
            method = "update",
            at = @At(
                    value = "INVOKE",
                    target = "Lbuildcraft/lib/engine/TileEngineBase_BC8;cannotUpdate()Z",
                    shift = At.Shift.AFTER
            ),
            remap = false
    )
    private void mobsiege$explodeOnOverheat(CallbackInfo ci) {
        var self = (TileEngineBase_BC8)(Object)this;

        if (self.cannotUpdate() || self instanceof TileEngineCreative) return;

        var stage = self.getPowerStage();

        var level = self.getLevel();
        var random = level.getRandom();
        var pos = self.getBlockPos();

        if (stage.ordinal() <= 1) {
            if (level instanceof ServerLevel serverLevel && mobsiege$ticksOverheated > ENGINE_RELIEF_TIME_TICKS && random.nextFloat() < ENGINE_RELIEF_CHANCE) {
                level.playSound(
                        null,
                        pos,
                        SoundEvents.GENERIC_EXPLODE,
                        SoundSource.BLOCKS,
                        0.25F,
                        1.0F + (random.nextFloat() - 0.5F) * 0.2F
                );
                serverLevel.sendParticles(
                        ParticleTypes.CLOUD,
                        pos.getX() + 0.5,
                        pos.getY() + 0.5,
                        pos.getZ() + 0.5,
                        15,
                        -0.1 + random.nextFloat() / 5,
                        -0.1 + random.nextFloat() / 5,
                        -0.1 + random.nextFloat() / 5,
                        0.2
                );
            }
            mobsiege$ticksOverheated = 0;
        } else {
            if (level.isClientSide) {
                float flameStrength = (float) (2.0F + 2.5F * Math.log(ENGINE_EXPLOSION_DECAY_FACTOR * mobsiege$ticksOverheated + 1.0F));
                int flameCount = Mth.floor(flameStrength);

                for (int i = 0; i < flameCount; i++) {
                    level.addParticle(
                            stage.ordinal() > 2 ? ParticleTypes.FLAME : ParticleTypes.SMOKE,
                            pos.getX() + random.nextDouble(),
                            pos.getY() + random.nextDouble(),
                            pos.getZ() + random.nextDouble(),
                            - 0.1 + random.nextFloat() / 5,
                            random.nextFloat() / 5,
                            - 0.1 + random.nextFloat() / 5
                    );
                }
            } else if (stage.ordinal() > 2 && this.isBurning()) {
                mobsiege$ticksOverheated++;

                if (mobsiege$ticksOverheated % 20 != 0) return;

                if (level instanceof ServerLevel serverLevel) {
                    if (random.nextDouble() < Math.pow(Math.min(mobsiege$ticksOverheated / ENGINE_EXPLOSION_CHANCE_RECIPROCAL, 1.0F), 2)) {
                        float explosionStrength = Math.min(
                                ENGINE_BASE_EXPLOSION + ENGINE_EXPLOSION_GROWTH * (float) Math.log(ENGINE_EXPLOSION_DECAY_FACTOR * mobsiege$ticksOverheated + 1.0F),
                                ENGINE_BASE_EXPLOSION + ENGINE_EXPLOSION_GROWTH
                        );


                        level.explode(
                                null,
                                pos.getX() + 0.5D,
                                pos.getY() + 0.5D,
                                pos.getZ() + 0.5D,
                                explosionStrength,
                                true,
                                Level.ExplosionInteraction.TNT
                        );


                        serverLevel.players().forEach(player -> {
                            double distanceSq = player.distanceToSqr(pos.getX() + 0.5, pos.getY() + 0.5, pos.getZ() + 0.5);
                            if (distanceSq < (explosionStrength * explosionStrength * 8)) {
                                player.connection.send(
                                        new ClientboundExplodePacket(
                                                pos.getX() + 0.5D,
                                                pos.getY() + 0.5D,
                                                pos.getZ() + 0.5D,
                                                explosionStrength,
                                                Collections.emptyList(),
                                                Vec3.ZERO
                                        )
                                );
                            }
                        });
                    }
                }
            }
        }
    }

    @Inject(method = "saveAdditional", at = @At("HEAD"))
    private void mobsiege$saveOverheatData(CompoundTag tag, CallbackInfo ci) {
        tag.putInt("MobsiegeTicksOverheated", mobsiege$ticksOverheated);
    }

    @Inject(method = "load", at = @At("HEAD"))
    private void mobsiege$loadOverheatData(CompoundTag tag, CallbackInfo ci) {
        this.mobsiege$ticksOverheated = tag.getInt("MobsiegeTicksOverheated");
    }
}
