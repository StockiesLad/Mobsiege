package com.stockieslad.boot;

import org.hotswap.agent.annotation.LoadEvent;
import org.hotswap.agent.command.Command;
import org.hotswap.agent.javassist.ClassPool;
import org.hotswap.agent.javassist.CtClass;
import org.hotswap.agent.logging.AgentLogger;

import java.util.*;
import java.util.concurrent.atomic.AtomicBoolean;

public class HotswapReloadCommand implements Command {
    private static final AgentLogger LOGGER = AgentLogger.getLogger(HotswapReloadCommand.class);
    private static final AtomicBoolean LOADED_HELPER = new AtomicBoolean(false);
    private static final Map<String, byte[]> CLASS_DEFINITIONS = new HashMap<>();
    protected static final Set<String> CLASSES = new HashSet<>();
    private final ClassLoader transformingClassLoader;
    private final ClassPool classPool;
    private final LoadEvent event;

    protected HotswapReloadCommand(
            byte[] newClassBytes,
            ClassLoader transformingClassLoader,
            ClassPool classPool,
            CtClass clazz,
            LoadEvent event
    )  {
        this.transformingClassLoader = transformingClassLoader;
        this.classPool = classPool;
        this.event = event;

        var classKey = clazz.getName() + "$" +
                transformingClassLoader.getName() + "@" +
                System.identityHashCode(transformingClassLoader);
        byte[] previousClassBytes;

        synchronized (CLASS_DEFINITIONS) {
            previousClassBytes = CLASS_DEFINITIONS.get(classKey);
            CLASS_DEFINITIONS.put(classKey, newClassBytes.clone());
        }

        if (event == LoadEvent.DEFINE || (
                previousClassBytes != null &&
                        Arrays.equals(newClassBytes, previousClassBytes)
        )) return;

        synchronized (CLASSES) {
            CLASSES.add(clazz.getName());
        }
    }

    /**
     * A reload with no class changes doesn't necessarily mean that there
     * is a problem with hotswap. It may mean that the new code compiled
     * the same. This can happen by adding whitespace and/or explicit
     * definitions that the compiler implicitly adds anyway.
     */
    @Override
    public void executeCommand() {
        if (event == LoadEvent.DEFINE) {
            LOGGER.error("[Modpack Development]: Minecraft reload scheduled " +
                    "for class definition! It should only apply to redefinition.");
            return;
        }

        LOGGER.info("[Modpack Development]: Applying reload script for modpack!");

        synchronized (CLASSES) {
            if (CLASSES.isEmpty())
                LOGGER.warning("[Modpack Development]: Reload called with no class changes!");
        }

        try {
            Class<?> helper;
            synchronized (classPool) {
                if (!LOADED_HELPER.get()) {
                    helper = classPool
                            .get("com.stockieslad.boot.MinecraftReloadHelper")
                            .toClass(transformingClassLoader, null);
                    LOADED_HELPER.compareAndSet(false, true);
                } else {
                    helper = transformingClassLoader
                            .loadClass("com.stockieslad.boot.MinecraftReloadHelper");
                }
            }
            Set<String> classes;
            synchronized (CLASSES) {
                classes = Set.copyOf(CLASSES);
                CLASSES.clear();
            }

            helper.getMethod("reload", Set.class)
                    .invoke(null, classes);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean equals(Object o) {
        return o instanceof HotswapReloadCommand;
    }

    @Override
    public int hashCode() {
        return HotswapReloadCommand.class.hashCode();
    }
}
