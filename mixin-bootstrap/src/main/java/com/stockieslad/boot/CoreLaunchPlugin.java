package com.stockieslad.boot;
import cpw.mods.modlauncher.serviceapi.ILaunchPluginService;
import org.objectweb.asm.Type;
import org.objectweb.asm.tree.ClassNode;
import org.spongepowered.asm.mixin.Mixins;

import java.util.EnumSet;

public final class CoreLaunchPlugin implements ILaunchPluginService {

    @Override
    public String name() {
        return "mobsiege_mixin_bootstrap";
    }

    @Override
    public void initializeLaunch(ITransformerLoader transformerLoader,
                                 cpw.mods.modlauncher.api.NamedPath[] specialPaths) {

        System.out.println("[Mobsiege Development]: Performing hacky boot for mixin config...");

        Mixins.addConfiguration(
                "mixins.mobsiege.json"
        );
    }

    @Override
    public EnumSet<Phase> handlesClass(Type classType, boolean isEmpty) {
        return EnumSet.noneOf(Phase.class);
    }

    @Override
    public boolean processClass(Phase phase, ClassNode classNode, Type classType) {
        return false;
    }
}