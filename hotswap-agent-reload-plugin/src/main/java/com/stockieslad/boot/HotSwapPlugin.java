package com.stockieslad.boot;

import org.hotswap.agent.annotation.Init;
import org.hotswap.agent.annotation.LoadEvent;
import org.hotswap.agent.annotation.OnClassLoadEvent;
import org.hotswap.agent.annotation.Plugin;
import org.hotswap.agent.command.Scheduler;
import org.hotswap.agent.javassist.ClassPool;
import org.hotswap.agent.javassist.CtClass;

import java.util.concurrent.atomic.AtomicBoolean;

//TODO: Add hotswap class caching to scan which files have been changed
//TODO: Commit current state then add the above functionality
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
            classNameRegexp = ".*",
            events = LoadEvent.REDEFINE
    )
    public void onClassLoad(
            ClassLoader transformingClassLoader,
            ClassPool classPool,
            CtClass clazz
    )  {
        try {
            synchronized (this) {
                if (!LOADED_COMMAND.get()) {
                    classPool.get("com.stockieslad.boot.HotswapReloadCommand").toClass(
                            this.getClass().getClassLoader(), null);
                    LOADED_COMMAND.compareAndSet(false, true);
                }
            }

            scheduler.scheduleCommand(new HotswapReloadCommand(transformingClassLoader, classPool, clazz), 100);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
