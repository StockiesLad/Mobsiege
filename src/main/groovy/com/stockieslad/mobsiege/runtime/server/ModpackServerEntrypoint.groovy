package com.stockieslad.mobsiege.runtime.server

import com.google.gson.Gson
import com.google.gson.JsonObject
import dev.latvian.mods.kubejs.bindings.event.ServerEvents
import dev.latvian.mods.kubejs.core.RecipeKJS
import dev.latvian.mods.kubejs.recipe.OutputReplacement
import dev.latvian.mods.kubejs.recipe.RecipesEventJS
import dev.latvian.mods.kubejs.recipe.ReplacementMatch
import dev.latvian.mods.kubejs.recipe.filter.RecipeFilter
import dev.latvian.mods.kubejs.script.ScriptType

class ModpackServerEntrypoint {
    static run() {
        ServerEvents.RECIPES.listenJava(ScriptType.SERVER, null) { event ->
            // This is how you add recipes
            event = event as RecipesEventJS
            JsonObject json = new Gson().toJsonTree([
                    type: 'minecraft:crafting_shapeless',
                    ingredients: [
                            [item: 'minecraft:dirt']
                    ],
                    result: [
                            item: 'minecraft:dirt',
                            count: 1
                    ]
            ]).asJsonObject;
            def tRecipe = event.custom(json);

            // This is how you change them.
            def stick = ReplacementMatch.of("minecraft:crafting_table")
            def dirt = OutputReplacement.of("minecraft:dirt")

            event.replaceOutput(new RecipeFilter() {
                @Override
                boolean test(RecipeKJS r) {
                    boolean a = r.hasOutput(stick)
                    return a
                }
            }, stick, dirt)
        }
    }
}
