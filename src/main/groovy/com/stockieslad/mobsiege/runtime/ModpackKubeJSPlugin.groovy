package com.stockieslad.mobsiege.runtime

import com.stockieslad.mobsiege.runtime.client.ModpackClientEntrypoint
import com.stockieslad.mobsiege.runtime.server.ModpackServerEntrypoint
import com.stockieslad.mobsiege.runtime.startup.ModpackStartupEntrypoint
import dev.latvian.mods.kubejs.KubeJSPlugin
import groovy.transform.CompileStatic

import static com.stockieslad.mobsiege.Mobsiege.LOGGER

@CompileStatic
class ModpackKubeJSPlugin extends KubeJSPlugin {
    static {
        LOGGER.info("[Modpack Development]: Registering KubeJS-Groovy plugin...")
    }

    @Override
    void initStartup() {
        LOGGER.info("[Modpack Development]: Initializing KubeJS-Groovy plugin startup...")
        ModpackStartupEntrypoint.run()
    }

    @Override
    void clientInit() {
        LOGGER.info("[Modpack Development]: Initializing KubeJS-Groovy plugin client...")
        ModpackClientEntrypoint.run()
    }

    @Override
    void onServerReload() {
        LOGGER.info("[Modpack Development]: Initializing KubeJS-Groovy plugin server...")
        ModpackServerEntrypoint.run()
    }
}
