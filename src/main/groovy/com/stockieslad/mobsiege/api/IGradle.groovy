package com.stockieslad.mobsiege.api


import com.stockieslad.mobsiege.mod_category.ModCategoryProvider
import groovy.json.JsonSlurper
import groovy.transform.CompileStatic
import net.minecraftforge.fml.ModList

import static com.stockieslad.mobsiege.Mobsiege.LOGGER
import static com.stockieslad.mobsiege.mod_category.ModCategoryValidator.categoryExists

@CompileStatic
@Singleton(strict = false)
class IGradle {
    private final ModCategoryProvider MOD_CATEGORIES
    private final Map<String, String> GRADLE_SETTINGS
    public final String LIFECYCLE = "lifecycle"
    public final String PRIMITIVE_TECHNOLOGY_1 = "primitive_technology_1";

    private IGradle() {
        var settings = IGradle.class.getClassLoader().getResourceAsStream("META-INF/build_configuration.json")
        GRADLE_SETTINGS = (Map<String, String>) new JsonSlurper().parse(settings)

        var categories = IGradle.class.getClassLoader().getResourceAsStream("META-INF/mod_categories.json")
        MOD_CATEGORIES = new ModCategoryProvider((property) -> Boolean.parseBoolean(gradleProperty(property.toString())),
                categories, true)
    }

    String gradleProperty(String property) {
        return GRADLE_SETTINGS.get(property)
    }

    boolean areDependenciesEnabled(List<String> dependencies) {
        if (dependencies != null) {
            dependencies.forEach(dependency -> {
            if (!(dependency.contains("[ModList]:") || dependency.contains("[ModCategory]:")) || dependency.split(":").length != 2)
                throw new RuntimeException(dependency + " is a malformed name. Must have format \"[ModList]:modid\" " +
                        "or \"[ModCategory]:category\"")
            })

            return dependencies.stream().allMatch(dependency -> {
                var args = dependency.split(":")
                var dependencyType = args[0]
                var dependencyKey = args[1]
                if (dependencyType == "[ModList]") return isModEnabled(dependencyKey)
                else if (dependencyType == "[ModCategory]") return isCategoryEnabled(dependencyKey)
                // For extra safety...
                else throw new RuntimeException(dependency + " is a malformed name. Must have format \"[ModList]:modid\" or \"[ModCategory]:modid\"")
            })
        }

        return false
    }

    boolean isCategoryEnabled(String category) {
        category = "enable_" + category
        if (!GRADLE_SETTINGS.containsKey(category)) {
            if (categoryExists(MOD_CATEGORIES.get(), category))
                return false
            else LOGGER.error("[ERROR]: Category ${category} not a valid category in: ${GRADLE_SETTINGS.keySet()}")
        }
        return Boolean.parseBoolean(GRADLE_SETTINGS.getOrDefault(category, "false"))
    }

    boolean isModEnabled(String modid) {
        return ModList.get().isLoaded(modid)
    }

    boolean lifecycleEnabled() {
        return isCategoryEnabled(LIFECYCLE)
    }

    boolean primitiveTechnology1Enabled() {
        return isCategoryEnabled(PRIMITIVE_TECHNOLOGY_1)
    }
}
