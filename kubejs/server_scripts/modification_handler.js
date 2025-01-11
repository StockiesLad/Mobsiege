//Java
const WrapperBoolean = Java.loadClass('java.lang.Boolean')
const HashMap = Java.loadClass('java.util.HashMap')
const LinkedList = Java.loadClass('java.util.LinkedList')
//Minecraft
const BlockPos = Java.loadClass('net.minecraft.core.BlockPos')
const Containers = Java.loadClass('net.minecraft.world.Containers')
const Direction = Java.loadClass('net.minecraft.core.Direction')
const Properties = Java.loadClass('net.minecraft.world.level.block.state.properties.BlockStateProperties')
const ServerPlayer = Java.loadClass('net.minecraft.server.level.ServerPlayer')
const SoundType = Java.loadClass('net.minecraft.world.level.block.SoundType')
const SpawnType = Java.loadClass('net.minecraft.world.entity.SpawnPlacements$Type')
//Modloader
const ForgeFakePlayer = Java.loadClass('net.minecraftforge.common.util.FakePlayer')
const FabricFakePlayer = Java.loadClass('net.fabricmc.fabric.api.entity.FakePlayer')
//Mod
const PrimalStageItems = Java.loadClass('com.nanokulon.primalstage.init.ModItems')
const NTPSounds = Java.loadClass('com.alcatrazescapee.notreepunching.client.ModSounds')
const NTPConfig = Java.loadClass('com.alcatrazescapee.notreepunching.Config')
//Mobsiege
const Mobsiege2Minecraft = Java.loadClass('com.stockieslad.mobsiege.Mobsiege2Minecraft')
const Mobsiege2ToughAsNails = Java.loadClass('com.stockieslad.mobsiege.Mobsiege2ToughAsNails')

const modpackId = global.modpackId
const maths = global.mathHelper
const common = global.commonHelper
const stacks = global.stackHelper
const content = global.content

/** @type {Array<String|Internal.Item>} */ global.hiddenItems = []

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