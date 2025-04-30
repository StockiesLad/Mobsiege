package com.stockieslad.mobsiege.mixins;

import buildcraft.api.core.IEngineType;
import buildcraft.lib.client.model.ModelHolderVariable;
import buildcraft.lib.client.model.MutableQuad;
import buildcraft.lib.engine.BlockEngineBase_BC8;
import buildcraft.lib.misc.SpriteUtil;
import com.llamalad7.mixinextras.sugar.Local;
import net.minecraft.core.Direction;
import net.minecraft.util.LazyLoadedValue;
import org.spongepowered.asm.mixin.Final;
import org.spongepowered.asm.mixin.Mixin;
import org.spongepowered.asm.mixin.Shadow;
import org.spongepowered.asm.mixin.injection.At;
import org.spongepowered.asm.mixin.injection.Redirect;

import java.util.Map;
import java.util.function.Function;

import static com.stockieslad.mobsiege.Mobsiege.LOGGER;

@Mixin(BlockEngineBase_BC8.class)
public class BlockEngineBaseMixin {
    @Shadow(remap = false) @Final public static Map<IEngineType, ModelHolderVariable> engineModels;

    @SuppressWarnings({"unchecked", "deprecation"})
    @Redirect(
            method = "getEngineParticle",
            at = @At(value = "INVOKE", target = "Ljava/util/Map;computeIfAbsent(Ljava/lang/Object;Ljava/util/function/Function;)Ljava/lang/Object;"),
            remap = false
    )
    private <K, V> V mobsiege$FixParticleCrash(Map<K, V> instance, K k, Function<? super K, ? extends V> key, @Local(argsOnly = true) IEngineType engineType) {
        return instance.computeIfAbsent((K) engineType, k1 -> (V) new LazyLoadedValue<>(() -> {
            var model = engineModels.get(k1);
            if (model != null)
                for (MutableQuad quad : model.getCutoutQuads()) {
                    if (quad.getFace() == Direction.DOWN)
                        return quad.getSprite();
                }
            else LOGGER.warn("Engine particle model for {} is missing", k1);
            return SpriteUtil.missingSprite().get();
        }));
    }
}
