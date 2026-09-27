package com.stockieslad.mobsiege.api

import groovy.transform.CompileStatic
import net.fabricmc.loader.api.FabricLoader

@CompileStatic
@Singleton
class IFabricLoader {
    boolean isModLoaded(String modid) {
        return FabricLoader.instance.isModLoaded(modid)
    }
}
