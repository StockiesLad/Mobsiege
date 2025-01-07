const Containers = Java.loadClass('net.minecraft.world.Containers')

const modpackId = global.modpackId
const comfuncs = global.functions.common({})
const commaths = global.functions.math
const custom = global.customImpl

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

    /**
     * @param {ExtendedTagEvent} call
     */
    function itemTags(call) {
        ServerEvents.tags('item', event => {
            call(event, new TagObject(event))
        })
    }

    /**
     * @param {ExtendedTagEvent} call
     */
    function blockTags(call) {
        ServerEvents.tags('block', event => {
            call(event, new TagObject(event))
        })
    }


//Loot Tables
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
            call(event, new LootTableObject(event))
        })
    }


//Recipes

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
            var recipes = new RecipeObject(event)
            call(event, recipes)
            recipes.testInsertions()
        })
    }