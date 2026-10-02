package com.stockieslad.boot;

import org.hotswap.agent.command.Command;
import org.hotswap.agent.javassist.ClassPool;
import org.hotswap.agent.javassist.CtClass;
import org.hotswap.agent.logging.AgentLogger;

import java.util.HashSet;
import java.util.Set;
import java.util.concurrent.atomic.AtomicBoolean;

public class HotswapReloadCommand implements Command {
    private static final AgentLogger LOGGER = AgentLogger.getLogger(HotswapReloadCommand.class);
    private static final AtomicBoolean LOADED_HELPER = new AtomicBoolean(false);
    protected static final Set<String> CLASSES = new HashSet<>();
    private final ClassLoader transformingClassLoader;
    private final ClassPool classPool;
    private final CtClass clazz;

    protected HotswapReloadCommand(
            ClassLoader transformingClassLoader,
            ClassPool classPool,
            CtClass clazz) {
        this.transformingClassLoader = transformingClassLoader;
        this.classPool = classPool;
        this.clazz = clazz;

        synchronized (CLASSES) {
            CLASSES.add(clazz.getName());
        }
    }

    @Override
    public void executeCommand() {
        LOGGER.info("[Modpack Development]: Applying reload script for modpack!");

        synchronized (CLASSES) {
            if (CLASSES.isEmpty())
                LOGGER.error("[Modpack Development]: Reload called with no class changes!\n " +
                        "This command didn't correctly batch all tasks!");
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
