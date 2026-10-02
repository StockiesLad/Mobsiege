package com.stockieslad.boot;

import net.minecraft.client.Minecraft;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Arrays;
import java.util.Collection;
import java.util.Set;
import java.util.concurrent.CompletableFuture;

public class MinecraftReloadHelper {
    private static final Logger LOGGER = LoggerFactory.getLogger(MinecraftReloadHelper.class);

    private static CompletableFuture<Void>
            CLIENT_RELOAD = CompletableFuture.completedFuture(null),
            SERVER_RELOAD = CompletableFuture.completedFuture(null);

    public static void reload(Set<String> classes) {
        Minecraft minecraft = Minecraft.getInstance();

        LOGGER.info("classes {}", Arrays.toString(classes.toArray()));

        if (!minecraft.isRunning())
            LOGGER.warn("[Modpack Development]: Minecraft resource reload was scheduled before " +
                    "Minecraft is ready!\n " +
                    "There may be discontinuities between your current scripts " +
                    "and what is loaded");

        CLIENT_RELOAD = reloadPlatform(CLIENT_RELOAD, classes);
        SERVER_RELOAD = reloadPlatform(SERVER_RELOAD, classes);

    }

    private static CompletableFuture<Void> reloadPlatform(
            CompletableFuture<Void> task,
            Collection<String> classes
    ) {
        Minecraft minecraft = Minecraft.getInstance();
        var module = task == CLIENT_RELOAD ? ".client." : ".server.";

        LOGGER.info(module);
        LOGGER.info("any match {}", classes.stream().anyMatch(clazz -> clazz.contains(module)));

        if (classes.stream().anyMatch(clazz -> clazz.contains(module))) {
            if (!task.isDone())
                LOGGER.warn("[Modpack Development]: Another {} reload was " +
                        "scheduled while the current one hasn't finished reloading!",
                        module
                );
            else {
                LOGGER.info("[Modpack Development]: Reloading {}} groovy scripts", module);
                return minecraft.reloadResourcePacks();
            }
        }

        return task;
    }
}
