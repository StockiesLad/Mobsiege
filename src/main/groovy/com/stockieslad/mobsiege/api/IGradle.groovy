package com.stockieslad.mobsiege.api


import com.stockieslad.mobsiege.mod_category.ModCategoryProvider
import groovy.json.JsonSlurper
import groovy.transform.CompileStatic
import net.minecraftforge.fml.ModList

import java.util.function.Supplier

import static com.stockieslad.mobsiege.Mobsiege.LOGGER
import static com.stockieslad.mobsiege.mod_category.ModCategoryValidator.categoryExists

@CompileStatic
@Singleton(strict = false)
class IGradle {
    private final ModCategoryProvider modCategories
    private final Map<String, String> gradleSettings

    private IGradle() {
        var settings = IGradle.class.getClassLoader().getResourceAsStream("META-INF/build_configuration.json")
        gradleSettings = (Map<String, String>) new JsonSlurper().parse(settings)

        var categories = IGradle.class.getClassLoader().getResourceAsStream("META-INF/mod_categories.json")
        modCategories = new ModCategoryProvider((property) -> {
            var gradleProperty = gradleProperty(property.toString())
            return gradleProperty == null ? null : Boolean.parseBoolean(gradleProperty)
        }, categories, true)
    }

    String gradleProperty(String property) {
        return gradleSettings.get(property)
    }

    boolean areDependenciesEnabled(Collection<String> dependencies) {
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
        if (!gradleSettings.containsKey(category)) {
            if (categoryExists(modCategories.get(), category))
                return false
            else LOGGER.error("[ERROR]: Category ${category} not a valid category in: ${gradleSettings.keySet()}")
        }
        return Boolean.parseBoolean(gradleSettings.getOrDefault(category, "false"))
    }

    boolean isModEnabled(String modid) {
        var forge = ModList.get().isLoaded(modid)
        var fabric = ModList.get().isLoaded("connectormod") &&
                IFabricLoader.instance.isModLoaded(modid)
        return forge || fabric
    }

    <T> T ifModEnabled(String modid, Supplier<T> getter) {
        if (isModEnabled(modid))
            getter.get()
        else return null
    }

    <T> T ifCategoryEnabled(String category, Supplier<T> getter) {
        if (isCategoryEnabled(category))
            getter.get()
        else return null
    }

    <T> T ifDependenciesEnabled(Collection<String> dependencies, Supplier<T> getter) {
        if (areDependenciesEnabled(dependencies))
            getter.get()
        else return null
    }

    /////////////////////////////////////////////////////////////////////////////////////////////

    public final String lifecycle = "lifecycle"
    public final String primitiveTechnology1 = "primitive_technology_1"
    public final String primitiveTechnology2 = "primitive_technology_2"


    boolean lifecycleEnabled() {
        return isCategoryEnabled(lifecycle)
    }

    boolean primitiveTechnology1Enabled() {
        return isCategoryEnabled(primitiveTechnology1)
    }

    boolean primitiveTechnology2Enabled() {
        return isCategoryEnabled(primitiveTechnology2)
    }
}
