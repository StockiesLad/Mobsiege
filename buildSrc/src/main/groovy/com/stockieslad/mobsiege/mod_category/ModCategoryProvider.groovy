package com.stockieslad.mobsiege.mod_category

import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import java.util.function.Function

class ModCategoryProvider {
    protected final Function<String, Boolean> gradlePropertyEnabled
    private final Map<String, Set<String>> modCategories


    ModCategoryProvider(Function<String, Boolean> gradlePropertyEnabled, Object modCategoryLocation) {
        this.gradlePropertyEnabled = gradlePropertyEnabled

        var rawModCategories = new JsonSlurper().parse(modCategoryLocation) as Map<String, List<String>>
        rawModCategories = new HashMap<>(rawModCategories)

        var validator = new ModCategoryValidator(gradlePropertyEnabled)
        var builder = new ModCategoryBuilder(rawModCategories)
        validator.validateModCategories(rawModCategories)

        this.modCategories = builder.applySubCategories()

        if (gradlePropertyEnabled != null && gradlePropertyEnabled.apply("dump_parsed_json"))
            println JsonOutput.prettyPrint(JsonOutput.toJson(modCategories))
    }

    Map<String, Set<String>> get() {
        return modCategories
    }

    ModChecker getModChecker() {
        if (gradlePropertyEnabled != null)
            return new ModChecker(this)
        else throw new RuntimeException("[ERROR]: Mod checker called with no gradle property function! " +
                "If this is being called from runtime, this is strictly forbidden!")
    }

    @Override
    String toString() {
        return modCategories.toString()
    }
}
