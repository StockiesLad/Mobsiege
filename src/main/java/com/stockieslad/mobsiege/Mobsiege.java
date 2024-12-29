package com.stockieslad.mobsiege;

import com.mojang.logging.LogUtils;
import net.jmb19905.CarbonizeClient;
import net.minecraft.resources.ResourceLocation;
import net.minecraft.world.item.BlockItem;
import net.minecraft.world.item.Item;
import net.minecraft.world.level.block.Block;
import net.minecraft.world.level.block.ConcretePowderBlock;
import net.minecraft.world.level.block.SoundType;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.minecraft.world.level.block.state.properties.NoteBlockInstrument;
import net.minecraftforge.api.distmarker.Dist;
import net.minecraftforge.common.MinecraftForge;
import net.minecraftforge.event.server.ServerStartingEvent;
import net.minecraftforge.eventbus.api.IEventBus;
import net.minecraftforge.eventbus.api.SubscribeEvent;
import net.minecraftforge.fml.common.Mod;
import net.minecraftforge.fml.event.lifecycle.FMLClientSetupEvent;
import net.minecraftforge.fml.event.lifecycle.FMLCommonSetupEvent;
import net.minecraftforge.fml.javafmlmod.FMLJavaModLoadingContext;
import net.minecraftforge.registries.ForgeRegistries;
import org.slf4j.Logger;

// The value here should match an entry in the META-INF/mods.toml file
@Mod(Mobsiege.MODID)
public class Mobsiege {
    public static final String MODID = "mobsiege";
    public static final Logger LOGGER = LogUtils.getLogger();

    //Only register things that KubeJS absolutely can't do. This is messy but it'll have to work.
    public static final Block ASH_CLAY = registerBlockAndItem("ash_clay", new Block(BlockBehaviour.Properties.of().instrument(NoteBlockInstrument.FLUTE).strength(0.6f).sound(SoundType.GRAVEL)));
    public static final Block PACKED_ASH = registerBlockAndItem("packed_ash", new ConcretePowderBlock(ASH_CLAY, BlockBehaviour.Properties.of().instrument(NoteBlockInstrument.SNARE).strength(0.75f).sound(SoundType.SAND)));

    public Mobsiege(FMLJavaModLoadingContext context) {
        IEventBus modEventBus = context.getModEventBus();
        modEventBus.addListener(this::commonSetup);
        MinecraftForge.EVENT_BUS.register(this);

    }

    private void commonSetup(final FMLCommonSetupEvent event) {
        Mobsiege2Fabric.init();
        Mobsiege2Minecraft.init();
        Mobsiege2ToughAsNails.init();
    }

    @SubscribeEvent
    public void onServerStarting(ServerStartingEvent event) {
    }

    @Mod.EventBusSubscriber(modid = MODID, bus = Mod.EventBusSubscriber.Bus.MOD, value = Dist.CLIENT)
    public static class ClientModEvents {
        @SubscribeEvent
        public static void onClientSetup(FMLClientSetupEvent event) {
            // Some client setup code
            LOGGER.info("HELLO FROM CLIENT SETUP");
            new CarbonizeClient().onInitializeClient();
        }
    }

    public static ResourceLocation of(String path) {
        return new ResourceLocation(MODID, path);
    }

    private static Block registerBlockAndItem(String path, Block block) {
        var id = of(path);
        ForgeRegistries.BLOCKS.register(id, block);
        ForgeRegistries.ITEMS.register(id, new BlockItem(block, new Item.Properties()));
        return block;
    }
}
