package com.stockieslad.mobsiege;

import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.event.lifecycle.FMLConstructModEvent;

import static com.stockieslad.mobsiege.Mobsiege.MODID;

@Mod.EventBusSubscriber(modid = MODID, bus = Mod.EventBusSubscriber.Bus.MOD, value = Dist.CLIENT)

public class MobsiegeClient {
    @SubscribeEvent
    public static void onConstructMod(FMLConstructModEvent evt) {
    }

    @SubscribeEvent
    public static void onClientSetup(FMLClientSetupEvent event) {
    }
}
