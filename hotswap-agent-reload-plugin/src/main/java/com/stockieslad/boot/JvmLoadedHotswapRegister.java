package com.stockieslad.boot;

import org.hotswap.agent.annotation.handler.AnnotationProcessor;
import org.hotswap.agent.config.PluginManager;
import org.hotswap.agent.javassist.ClassPool;

import java.util.Collections;
import java.util.HashMap;

public class JvmLoadedHotswapRegister {
    @SuppressWarnings("unused")
    public static void initializePlugin(
            ClassPool pool,
            ClassLoader agentClassLoader,
            ClassLoader moduleClassLoader
    ) {
        var manager = PluginManager.getInstance();
        var registry = manager.getPluginRegistry();

        try {
            pool.get("com.stockieslad.boot.HotSwapPlugin").toClass(agentClassLoader, null);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        var pluginClass = HotSwapPlugin.class;

        var plugins = registry.getRegisteredPlugins();

        plugins.put(pluginClass, Collections.synchronizedMap(new HashMap<>()));

        var processor = new AnnotationProcessor(manager);

        if (!processor.processAnnotations(pluginClass, pluginClass)) {
            throw new IllegalStateException(
                    "Failed to process HotSwapPlugin annotations"
            );
        }

        registry.initializePlugin(
                "com.stockieslad.boot.HotSwapPlugin",
                moduleClassLoader
        );
    }
}
