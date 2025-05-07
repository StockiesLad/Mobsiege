//Java
const WrapperBoolean = Java.loadClass('java.lang.Boolean')
const HashMap = Java.loadClass('java.util.HashMap')
const LinkedList = Java.loadClass('java.util.LinkedList')
const JavaString = Java.loadClass('java.lang.String');
const JavaInteger = Java.loadClass('java.lang.Integer');
//Minecraft
const BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const Containers = Java.loadClass('net.minecraft.world.Containers')
const Direction = Java.loadClass('net.minecraft.core.Direction')
const Properties = Java.loadClass('net.minecraft.world.level.block.state.properties.BlockStateProperties')
const ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer')
const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')
const SpawnType = Java.loadClass('net.minecraft.world.entity.SpawnPlacements$Type')
const IntegerArgumentType = Java.loadClass('com.mojang.brigadier.arguments.IntegerArgumentType');
const StringArgumentType = Java.loadClass('com.mojang.brigadier.arguments.StringArgumentType');
const Component = Java.loadClass('net.minecraft.network.chat.Component');
const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
const Commands = Java.loadClass('net.minecraft.commands.Commands');
const Style = Java.loadClass('net.minecraft.network.chat.Style');
const ClickEvent = Java.loadClass('net.minecraft.network.chat.ClickEvent');
const ChatFormatting = Java.loadClass('net.minecraft.ChatFormatting');
//Modloader
const ForgeFakePlayer = Java.loadClass('net.minecraftforge.common.util.FakePlayer')
const FabricFakePlayer = Java.loadClass('net.fabricmc.fabric.api.entity.FakePlayer')
//Mod
const PrimalStageItems = Java.loadClass('com.nanokulon.primalstage.init.ModItems')
const NTPSounds = Java.loadClass('com.alcatrazescapee.notreepunching.client.ModSounds')
const NTPConfig = Java.loadClass('com.alcatrazescapee.notreepunching.Config')
const TileEngineBase_BC8 = Java.loadClass('buildcraft.lib.engine.TileEngineBase_BC8')
const BlazeBurnerBlock = Java.loadClass('com.simibubi.create.content.processing.burner.BlazeBurnerBlock')
const TanTags = Java.loadClass('toughasnails.init.ModTags')
//Mobsiege
const Mobsiege2BuildCraft = Java.loadClass('com.stockieslad.mobsiege.api.Mobsiege2BuildCraft')
const Mobsiege2Minecraft = Java.loadClass('com.stockieslad.mobsiege.api.Mobsiege2Minecraft')
const Mobsiege2ToughAsNails = Java.loadClass('com.stockieslad.mobsiege.api.Mobsiege2ToughAsNails')

const modpackId = global.modpackId
const maths = global.mathHelper
const common = global.commonHelper
const stacks = global.stackHelper
const content = global.content

/** @type {Array<String|Internal.ItemStack>} */ global.hiddenItems = []

//It's very important that we always cache the event extensions. This is far more performant

//Tags
    /**
     * @callback ExtendedTagEvent
     * @param {Internal.TagEventJS} call.event
     * @param {TagObject} call.funcs
     */

    /**
     * @param {ExtendedTagEvent} call
     */
    function commonTags(call) {
        itemTags(call)
        blockTags(call)
    }

    /** @type {TagObject} */ var itemTagsCache = null

    /**
     * @param {ExtendedTagEvent} call
     */
    function itemTags(call) {
        ServerEvents.tags('item', event => {
            if (itemTagsCache == null) 
                itemTagsCache = new TagObject(event)
            else itemTagsCache.start(event)
            call(event, itemTagsCache)
        })
    }

    /** @type {TagObject} */ var blockTagsCache = null

    /**
     * @param {ExtendedTagEvent} call
     */
    function blockTags(call) {
        ServerEvents.tags('block', event => {
            if (blockTagsCache == null) 
                blockTagsCache = new TagObject(event)
            else blockTagsCache.start(event)
            call(event, blockTagsCache)
        })
    }


//Loot Tables
    /** @type {LootTableObject} */ var lootTablesCache = null

    /**
     * @callback ExtendedLootTableEvent
     * @param {Internal.LootModificationEventJS} call.event
     * @param {LootTableObject} call.funcs
     */

    /**
     * @param {ExtendedLootTableEvent} call
     */
    function lootTables(call) {
        LootJS.modifiers(event => {
            if (lootTablesCache == null) 
                lootTablesCache = new LootTableObject(event)
            else lootTablesCache.start(event)
            call(event, lootTablesCache)
        })
    }


//Recipes
    /** @type {RecipeObject} */ var recipesCache = null
    
    /**
     * @callback ExtendedRecipeEvent
     * @param {Internal.RecipesEventJS} call.event
     * @param {RecipeObject} call.funcs
     */

    /**
     * @param {ExtendedRecipeEvent} call
     */
    function recipes(call) {
        ServerEvents.recipes(event => {
            if (recipesCache == null) 
                recipesCache = new RecipeObject(event)
            else recipesCache.start(event)
            call(event, recipesCache)
            recipesCache.testInsertions(event)
        })
    }