package com.stockieslad.mobsiege;

import com.mojang.logging.LogUtils;
import com.stockieslad.mobsiege.runtime.client.ModpackClientEntrypoint;
import com.stockieslad.mobsiege.runtime.server.ModpackServerEntrypoint;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
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
        //TODO: DO NOT INIT HERE. THIS IS FOR TESTING
        ModpackClientEntrypoint.init();
        ModpackServerEntrypoint.init();
        ModpackApi.init();

        // Commented out to show that this doesn't work unfortunately
        //MODID = Modpack2Gradle.gradleProperty("mod_id");
    }

    public Mobsiege(FMLJavaModLoadingContext context) {
        IEventBus modEventBus = context.getModEventBus();
        modEventBus.addListener(this::commonSetup);
        MinecraftForge.EVENT_BUS.register(this);

    }

    private void commonSetup(final FMLCommonSetupEvent event) {}

    @SubscribeEvent
    public void onServerStarting(ServerStartingEvent event) {}
}
