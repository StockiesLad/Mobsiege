package com.stockieslad.mobsiege.api

import com.stockieslad.mobsiege.ModpackApi
import groovy.transform.CompileStatic
import net.fabricmc.fabric.api.registry.FlammableBlockRegistry
import net.minecraft.resources.ResourceLocation
import net.minecraftforge.registries.ForgeRegistries


@CompileStatic
@Singleton
class IFabric {
    void fabricBlockFlammability(String string, int burn, int spread) {
        FlammableBlockRegistry.getDefaultInstance().add(ForgeRegistries.BLOCKS.getValue(ResourceLocation.parse(string)), burn, spread)
    }

    void fabricTagFlammability(String string, int burn, int spread) {
        FlammableBlockRegistry.getDefaultInstance().add(ModpackApi.minecraft().createBlockTag(string), burn, spread)
    }
}
