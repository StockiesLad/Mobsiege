package com.stockieslad.boot;

import net.minecraft.client.Minecraft;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.Collection;
import java.util.Set;
import java.util.concurrent.CompletableFuture;
import java.util.function.Supplier;

public class MinecraftReloadHelper {
    private static final Logger LOGGER = LoggerFactory.getLogger(MinecraftReloadHelper.class);

    private static CompletableFuture<Void>
            CLIENT_RELOAD = CompletableFuture.completedFuture(null),
            SERVER_RELOAD = CompletableFuture.completedFuture(null);

    // TODO: Add in-game chat msg for server resource reload completion
    public static void reload(Set<String> classes) {
        Minecraft minecraft = Minecraft.getInstance();

        LOGGER.info("[Modpack Development]: Seen class changes - {}", Arrays.toString(classes.toArray()));

        if (!minecraft.isRunning())
            LOGGER.warn("[Modpack Development]: Minecraft resource reload was scheduled before " +
                    "Minecraft is ready! There may be discontinuities between your current " +
                    "scripts and what is loaded.");

        CLIENT_RELOAD = reloadPlatform(CLIENT_RELOAD, classes, minecraft::reloadResourcePacks);
        SERVER_RELOAD = reloadPlatform(SERVER_RELOAD, classes, () -> {
            if (minecraft.isSingleplayer()) {
                var server = minecraft.getSingleplayerServer();
                if (server != null)
                    return server.reloadResources(server.getResourceManager().getNamespaces());
            }

            return SERVER_RELOAD;
        });

    }

    private static CompletableFuture<Void> reloadPlatform(
            CompletableFuture<Void> task,
            Collection<String> classes,
            Supplier<CompletableFuture<Void>> reloadTask
    ) {
        var module = task == CLIENT_RELOAD ? ".client." : ".server.";
        var moduleStr = module.replace(".", "");

        if (classes.stream().anyMatch(clazz -> clazz.contains(module))) {
            if (!task.isDone())
                LOGGER.warn("[Modpack Development]: Another {} reload was " +
                        "scheduled while the current one hasn't finished reloading!",
                        module
                );
            else {
                var future = reloadTask.get();
                if (future != task)
                    LOGGER.info("[Modpack Development]: Reloaded {} scripts", moduleStr);
                else LOGGER.info("[Modpack Development]: Unable to reload {} scripts", moduleStr);
                return future;
            }
        } else LOGGER.info("[Modpack Development]: Skipping {} scripts", moduleStr);

        return task;
    }
}
