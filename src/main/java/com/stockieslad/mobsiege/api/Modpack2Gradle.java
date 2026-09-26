package com.stockieslad.mobsiege.api;

import com.stockieslad.mobsiege.Mobsiege;
import com.stockieslad.mobsiege.mod_category.ModCategoryProvider;
import groovy.json.JsonSlurper;
import net.minecraftforge.fml.ModList;

import java.util.List;
import java.util.Map;

import static com.stockieslad.mobsiege.mod_category.ModCategoryValidator.categoryExists;


// Required categories are not implemented as KubeJS doesn't need them.
public class Modpack2Gradle {
    // Optional Categories
    private static final ModCategoryProvider MOD_CATEGORIES;
    private static final Map<String, String> GRADLE_SETTINGS;
    public static final String
            LIFECYCLE = "lifecycle",
            PRIMITIVE_TECHNOLOGY_1 = "primitive_technology_1";
    //...[insert other categories]

    static  {
        var settings = Modpack2Gradle.class.getClassLoader().getResourceAsStream("META-INF/build_configuration.json");
        //noinspection unchecked
        GRADLE_SETTINGS = (Map<String, String>) new JsonSlurper().parse(settings);

        var categories = Modpack2Gradle.class.getClassLoader().getResourceAsStream("META-INF/mod_categories.json");
        MOD_CATEGORIES = new ModCategoryProvider(property -> Boolean.parseBoolean(gradleProperty(property.toString())),
                categories, true);
    }

    public static void init() {}

    public static String gradleProperty(String property) {
        return GRADLE_SETTINGS.get(property);
    }

    public static boolean areDependenciesEnabled(List<String> dependencies) {
        if (dependencies != null) {
            dependencies.forEach(dependency -> {
            if (!(dependency.contains("[ModList]:") || dependency.contains("[ModCategory]:")) || dependency.split(":").length != 2)
                throw new RuntimeException(dependency + " is a malformed name. Must have format \"[ModList]:modid\" " +
                        "or \"[ModCategory]:category\"");
            });

            return dependencies.stream().allMatch(dependency -> {
                var args = dependency.split(":");
                var dependencyType = args[0];
                var dependencyKey = args[1];
                if (dependencyType.equals("[ModList]")) return isModEnabled(dependencyKey);
                else if (dependencyType.equals("[ModCategory]")) return isCategoryEnabled(dependencyKey);
                // For extra safety...
                else throw new RuntimeException(dependency + " is a malformed name. Must have format \"[ModList]:modid\" or \"[ModCategory]:modid\"");
            });
        }

        return false;
    }

    public static boolean isCategoryEnabled(String category) {
        category = "enable_" + category;
        if (!GRADLE_SETTINGS.containsKey(category)) {
            if (categoryExists(MOD_CATEGORIES.get(), category))
                return false;
            else Mobsiege.LOGGER.error("[ERROR]: Category '{}' not a valid category in: {}", category, GRADLE_SETTINGS.keySet());
        }
        return Boolean.parseBoolean(GRADLE_SETTINGS.getOrDefault(category, "false"));
    }

    public static boolean isModEnabled(String modid) {
        return ModList.get().isLoaded(modid);
    }

    public static boolean lifecycleEnabled() {
        return isCategoryEnabled(LIFECYCLE);
    }

    public static boolean primitiveTechnology1Enabled() {
        return isCategoryEnabled(PRIMITIVE_TECHNOLOGY_1);
    }
}
