package com.stockieslad.mobsiege.plugin;

import com.stockieslad.mobsiege.Mobsiege;
import net.minecraft.client.Minecraft;

import java.util.concurrent.CompletableFuture;

public class MinecraftReloadHelper {
    private static CompletableFuture<Void>
            CLIENT_RELOAD = CompletableFuture.completedFuture(null),
            SERVER_RELOAD = CompletableFuture.completedFuture(null);

    public static void reload(String clazz) {
        if (!Minecraft.getInstance().isRunning())
            return;

        Minecraft minecraft = Minecraft.getInstance();

        if (CLIENT_RELOAD.isDone() && clazz.contains(".client.")) {
            Mobsiege.LOGGER.info("Reloading client groovy scripts");
            CLIENT_RELOAD = minecraft.reloadResourcePacks();
        }

        if (SERVER_RELOAD.isDone() && clazz.contains(".server.") &&
                minecraft.hasSingleplayerServer()) {
            Mobsiege.LOGGER.info("Reloading server groovy scripts");
            var server = minecraft.getSingleplayerServer();
            assert server != null;
            SERVER_RELOAD = server.reloadResources(server.getPackRepository().getSelectedIds());
        }
    }
}
