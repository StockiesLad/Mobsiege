package com.stockieslad.mobsiege;

import com.mojang.logging.LogUtils;
import com.stockieslad.mobsiege.api.*;
import com.stockieslad.mobsiege.content.Lifecycle;
import com.stockieslad.mobsiege.content.PrimitiveTechnology1;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.ModList;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import org.slf4j.Logger;

// Ensure that there are no mod imports in this class
// The value here should match an entry in the META-INF/mods.toml file
@Mod(Mobsiege.MODID)
public class Mobsiege {
    public static final String MODID = "mobsiege";
    public static final Logger LOGGER = LogUtils.getLogger();

    static {
        Mobsiege2GradleCategories.init();

        if (Mobsiege2GradleCategories.primitiveTechnology1Enabled()) {
            PrimitiveTechnology1.init();
            Mobsiege2ToughAsNails.init();
        }

        if (Mobsiege2GradleCategories.lifecycleEnabled())
            Lifecycle.init();

        if (ModList.get().isLoaded("buildcraftcore"))
            Mobsiege2BuildCraft.init();

        if (ModList.get().isLoaded("fabric_api"))
            Mobsiege2Fabric.init();

        Mobsiege2Minecraft.init();
    }

    public Mobsiege(FMLJavaModLoadingContext context) {
        IEventBus modEventBus = context.getModEventBus();
        modEventBus.addListener(this::commonSetup);
        MinecraftForge.EVENT_BUS.register(this);

    }

    private void commonSetup(final FMLCommonSetupEvent event) {
    }

    @SubscribeEvent
    public void onServerStarting(ServerStartingEvent event) {}
}
