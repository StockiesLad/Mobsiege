package com.stockieslad.boot;

import org.hotswap.agent.annotation.Init;
import org.hotswap.agent.annotation.LoadEvent;
import org.hotswap.agent.annotation.OnClassLoadEvent;
import org.hotswap.agent.annotation.Plugin;
import org.hotswap.agent.command.Scheduler;
import org.hotswap.agent.javassist.ClassPool;
import org.hotswap.agent.javassist.CtClass;

import java.util.concurrent.atomic.AtomicBoolean;

@Plugin(
        name = "Modpack Hotswapper",
        description = "Modpack development auto minecraft asset reloader.",
        testedVersions = "1.20.1"
)
public class HotSwapPlugin {
    @Init
    Scheduler scheduler;

    private static final AtomicBoolean LOADED_COMMAND = new AtomicBoolean(false);

    @OnClassLoadEvent(
            // Dynamic package search? Later
            classNameRegexp = "com[./]stockieslad[./].*",
            events = {LoadEvent.REDEFINE, LoadEvent.DEFINE}
    )
    public void onClassLoad(
            byte[] classBytes,
            ClassLoader transformingClassLoader,
            ClassPool classPool,
            CtClass clazz,
            LoadEvent event
    )  {
        try {
            synchronized (this) {
                if (!LOADED_COMMAND.get()) {
                    classPool.get("com.stockieslad.boot.HotswapReloadCommand").toClass(
                            this.getClass().getClassLoader(), null);
                    LOADED_COMMAND.compareAndSet(false, true);
                }
            }
            var command = new HotswapReloadCommand(
                    classBytes,
                    transformingClassLoader,
                    classPool,
                    clazz,
                    event
            );

            if (event == LoadEvent.REDEFINE)
                scheduler.scheduleCommand(command, 100);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
