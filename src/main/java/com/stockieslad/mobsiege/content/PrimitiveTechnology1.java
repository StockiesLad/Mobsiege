package com.stockieslad.mobsiege.content;

import com.alcatrazescapee.notreepunching.common.blocks.LooseRockBlock;
import lilypuree.decorative_blocks.blocks.LatticeBlock;
import net.minecraft.world.level.block.*;
import net.minecraft.world.level.block.state.BlockBehaviour;
import net.minecraft.world.level.block.state.properties.NoteBlockInstrument;
import net.minecraft.world.level.material.MapColor;

import static com.stockieslad.mobsiege.util.RegistryHelper.registerBlockAndItem;
import static net.minecraft.world.level.block.Blocks.BRICKS;

public class PrimitiveTechnology1 {
    public static final Block
            ASH_CLAY = registerBlockAndItem("ash_clay", new Block(BlockBehaviour.Properties.of().instrument(NoteBlockInstrument.FLUTE).strength(0.6f).sound(SoundType.GRAVEL))),
            PACKED_ASH = registerBlockAndItem("packed_ash", new ConcretePowderBlock(ASH_CLAY, BlockBehaviour.Properties.of().instrument(NoteBlockInstrument.SNARE).strength(0.75f).sound(SoundType.SAND))),
            HOLYSILT_BRICK_STAIRS = registerBlockAndItem("holysilt_brick_stairs", new StairBlock(BRICKS::defaultBlockState, BlockBehaviour.Properties.copy(BRICKS))),
            HOLYSILT_BRICK_SLAB = registerBlockAndItem("holysilt_brick_slab", new SlabBlock(BlockBehaviour.Properties.of().mapColor(MapColor.COLOR_GRAY).instrument(NoteBlockInstrument.BASEDRUM).requiresCorrectToolForDrops().strength(2.0F, 6.0F))),
            HOLYSILT_BRICK_WALL = registerBlockAndItem("holysilt_brick_wall", new WallBlock(BlockBehaviour.Properties.copy(BRICKS).forceSolidOn())),
            HOLY_PEBBLE = registerBlockAndItem("holy_pebble", new LooseRockBlock()),
            STONE_LATTICE = registerBlockAndItem("stone_lattice", new LatticeBlock(BlockBehaviour.Properties.of().sound(SoundType.STONE).strength(2f, 6f).mapColor(MapColor.STONE).noOcclusion()));

    public static void init() {}
}
