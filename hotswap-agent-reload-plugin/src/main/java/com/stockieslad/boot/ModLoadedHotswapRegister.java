package com.stockieslad.boot;

import cpw.mods.modlauncher.api.NamedPath;
import cpw.mods.modlauncher.serviceapi.ILaunchPluginService;
import org.objectweb.asm.Type;
import org.objectweb.asm.tree.ClassNode;

import java.security.ProtectionDomain;
import java.util.EnumSet;

public class ModLoadedHotswapRegister implements ILaunchPluginService {
    @Override
    public String name() {
        return "mobsiege_hotswap_plugin";
    }

    @Override
    public void initializeLaunch(
            ITransformerLoader transformerLoader, NamedPath[] specialPaths) {
        System.out.println("[Modpack Development]: Initialising plugin for hotswap...");

        var sysClassLoader = ClassLoader.getSystemClassLoader();
        var unionClassLoader = this.getClass().getClassLoader();

        try {
            var managerClass = sysClassLoader.loadClass(
                    "org.hotswap.agent.config.PluginManager"
            );
            var agentClassLoader = managerClass.getClassLoader();

            var poolClass = agentClassLoader.loadClass(
                    "org.hotswap.agent.javassist.ClassPool"
            );
            var pool = poolClass.getConstructor().newInstance();

            var classPathClass = agentClassLoader.loadClass(
                    "org.hotswap.agent.javassist.ClassPath"
            );
            var loaderClassPathClass = agentClassLoader.loadClass(
                    "org.hotswap.agent.javassist.LoaderClassPath"
            );

            var loaderClassPath = loaderClassPathClass
                    .getConstructor(ClassLoader.class)
                    .newInstance(unionClassLoader);

            poolClass.getMethod(
                    "appendClassPath",
                    classPathClass
            ).invoke(pool, loaderClassPath);

            var ctClass = poolClass.getMethod(
                    "get",
                    String.class
            ).invoke(pool, "com.stockieslad.boot.JvmLoadedHotswapRegister");

            ctClass.getClass().getMethod(
                    "toClass",
                    ClassLoader.class,
                    ProtectionDomain.class
            ).invoke(
                    ctClass,
                    agentClassLoader,
                    null
            );

            var hotswap = agentClassLoader.loadClass(
                    "com.stockieslad.boot.JvmLoadedHotswapRegister"
            );

            hotswap.getMethod(
                    "initializePlugin",
                    poolClass,
                    ClassLoader.class,
                    ClassLoader.class
            ).invoke(
                    null,
                    pool,
                    agentClassLoader,
                    unionClassLoader
            );
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public EnumSet<Phase> handlesClass(Type type, boolean b) {
        return EnumSet.noneOf(Phase.class);
    }

    @Override
    public boolean processClass(Phase phase, ClassNode classNode, Type classType) {
        return false;
    }
}
