package com.stockieslad.mobsiege.api;

import com.stockieslad.mobsiege.Mobsiege;
import com.stockieslad.mobsiege.mod_category.ModCategoryProvider;
import groovy.json.JsonSlurper;
import net.minecraftforge.fml.ModList;

import java.util.List;
import java.util.Map;
import java.util.Set;


// Required categories are not implemented as KubeJS doesn't need them.
public class Modpack2Gradle {
    // Optional Categories
    private static final Map<String, Set<String>> MOD_CATEGORIES;
    private static final Map<String, Boolean> CATEGORY_SETTINGS;
    public static final Set<String>
            LIFECYCLE,
            PRIMITIVE_TECHNOLOGY_1;
    //...[insert other categories]

    static  {
        var categories = Modpack2Gradle.class.getClassLoader().getResourceAsStream("META-INF/mod_categories.json");
        MOD_CATEGORIES = new ModCategoryProvider(null, categories).get();

        var settings = Modpack2Gradle.class.getClassLoader().getResourceAsStream("META-INF/mod_category_settings.json");
        //noinspection unchecked
        CATEGORY_SETTINGS = (Map<String, Boolean>) new JsonSlurper().parse(settings);

        LIFECYCLE = getCategory("lifecycle");
        PRIMITIVE_TECHNOLOGY_1 = getCategory("primitive_technology_1");
    }

    public static void init() {}

    private static Set<String> getCategory(String category) {
        category = "[optional]:" + category;
        if (!MOD_CATEGORIES.containsKey(category))
            throw new RuntimeException("[" + Mobsiege.MODID + "]: Mod category \"" + category + "\" does not exist!");
        return MOD_CATEGORIES.get(category);
    }

    public static boolean areDependenciesEnabled(List<String> dependencies) {
        if (dependencies != null) {
            dependencies.forEach(dependency -> {
            if (!(dependency.contains("[ModList]:") || dependency.contains("[ModCategory]:")) || dependency.split(":").length != 2)
                throw new RuntimeException(dependency + " is a malformed name. Must have format \"[ModList]:modid\" or \"[ModCategory]:modid\"");
            });

            return dependencies.stream().allMatch(dependency -> {
                var args = dependency.split(":");
                var dependencyType = args[0];
                var dependencyKey = args[1];
                if (dependencyType.equals("[ModList]")) return isModEnabled(dependencyKey);
                else if (dependencyType.equals("[ModCategory]")) return isCategoryEnabled(getCategory(dependencyKey));
                // For extra safety...
                else throw new RuntimeException(dependency + " is a malformed name. Must have format \"[ModList]:modid\" or \"[ModCategory]:modid\"");
            });
        }

        return false;
    }

    /**
     * Must take in a set and not a string to centralise all categories here.
     *  Leaves less room for mistakes/errors.
     * @param category One of the defined categories in this class
     * @return Whether the given category is enabled
     */
    public static boolean isCategoryEnabled(Set<String> category) {
        return CATEGORY_SETTINGS.get(MOD_CATEGORIES.entrySet().stream()
                .filter(entry -> entry.getValue().equals(category))
                .findFirst().orElseThrow().getKey()
        );
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
