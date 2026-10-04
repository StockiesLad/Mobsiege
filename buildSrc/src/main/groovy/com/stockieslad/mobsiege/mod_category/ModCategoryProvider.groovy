package com.stockieslad.mobsiege.mod_category

import groovy.json.JsonOutput
import groovy.json.JsonSlurper

import javax.annotation.Nullable
import java.util.function.Function

class ModCategoryProvider {
    private final Function<String, Boolean> gradlePropertyEnabled
    private final Map<String, Set<String>> modCategories
    private final ModHandler modHandler


    ModCategoryProvider(Function<Object, Boolean> gradlePropertyEnabled, Object modCategoryLocation, boolean runtime) {
        this.gradlePropertyEnabled = gradlePropertyEnabled

        //noinspection GroovyAssignabilityCheck
        var rawModCategories = new JsonSlurper().parse(modCategoryLocation) as Map<String, List<String>>
        rawModCategories = new HashMap<>(rawModCategories)

        var validator = new ModCategoryValidator(this)
        var builder = new ModCategoryBuilder(rawModCategories, runtime)

        validator.validateModCategories(rawModCategories)

        this.modCategories = builder.applySubCategories()

        if (gradlePropertyEnabled != null)
            this.modHandler = new ModHandler(this)
        else this.modHandler == null

        if (gradlePropertyEnabled != null && gradlePropertyEnabled.apply("dump_parsed_json"))
            println JsonOutput.prettyPrint(JsonOutput.toJson(modCategories))
    }

    Map<String, Set<String>> get() {
        if (modCategories == null)
            throw new IllegalAccessError("Mod Categories were accessed before they were finished processing.")
        return modCategories
    }

    ModHandler getModHandler() {
        if (modHandler != null)
            return modHandler
        else throw new RuntimeException("[ERROR]: Mod checker called with no gradle property function!")
    }

    /**
     * This performs a safe check, where it's definitively true or false
     * @param The gradle property property name
     * @return Whether it's strictly enabled or not
     */
    boolean isGradlePropertyEnabledSafe(String property) {
        if (gradlePropertyEnabled == null) return false
        var gradleProperty = gradlePropertyEnabled.apply(property)
        return gradleProperty != null ? gradleProperty : false
    }

    /**
     * This performs an unsafe check, where it may be null if it doesn't exist.
     * @param The gradle property property name
     * @return Whether it's strictly enabled or not
     */
    @Nullable Boolean isGradlePropertyEnabledUnsafe(String property) {
        if (gradlePropertyEnabled == null)
            throw new RuntimeException("Gradle property checked with no implementation!")
        var gradleProperty = gradlePropertyEnabled.apply(property)
        return gradleProperty != null ? gradleProperty : null
    }

    @Override
    String toString() {
        return modCategories.toString()
    }
}
