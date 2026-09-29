package com.stockieslad.mobsiege.plugin;

import org.hotswap.agent.annotation.LoadEvent;
import org.hotswap.agent.annotation.OnClassLoadEvent;
import org.hotswap.agent.annotation.Plugin;

@Plugin(
        name = "ModpackHotSwap",
        description = "Modpack development hot reload!",
        testedVersions = "1.20.1"
)
public class HotSwapPlugin {
    @OnClassLoadEvent(
            classNameRegexp = "com\\.stockieslad\\.mobsiege\\..*",
            events = LoadEvent.REDEFINE
    )
    public static void onRedefine(Class<?> clazz) {
        MinecraftReloadHelper.reload(clazz.getName());
    }
}
