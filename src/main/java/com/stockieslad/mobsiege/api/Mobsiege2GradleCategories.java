package com.stockieslad.mobsiege.api;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.stockieslad.mobsiege.Mobsiege;
import net.minecraftforge.fml.ModList;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.lang.reflect.Type;
import java.util.*;

// Required categories are not implemented yet KubeJS doesn't need them.
public class Mobsiege2GradleCategories {
    // Optional Categories
    private static final Map<String, Set<String>> MOD_CATEGORIES;
    private static final Set<String>
            LIBRARIES,
            LIFECYCLE,
            PRIMITIVE_TECHNOLOGY_1;
    //...[insert other categories]

    static  {
        Map<String, List<String>> modCategories;
        try (InputStream inputStream = Mobsiege2GradleCategories.class.getClassLoader().getResourceAsStream("META-INF/mod_categories.json")) {
            assert inputStream != null;
            try (Reader reader = new InputStreamReader(inputStream)) {
                    Gson gson = new Gson();
                    Type type = new TypeToken<Map<String, List<String>>>(){}.getType();
                    modCategories = gson.fromJson(reader, type);
            }
        } catch (IOException e) {
            throw new RuntimeException("[" + Mobsiege.MODID + "]: Error reading mod categories. This must be resolved.");
        }

        MOD_CATEGORIES = applySubCategories(modCategories);

        LIBRARIES = getCategory("libraries");
        LIFECYCLE = getCategory("lifecycle");
        PRIMITIVE_TECHNOLOGY_1 = getCategory("primitive_technology_1");
    }

    public static void init() {}

    private static Map<String, Set<String>> applySubCategories(Map<String, List<String>> modCategories) {
        Map<String, Set<String>> newModCategories = new HashMap<>();
        modCategories.forEach((category, entries) ->
                newModCategories.put(category, applySubCategory(modCategories, category, new ArrayList<>())));
        return newModCategories;
    }

    private static Set<String> applySubCategory(Map<String, List<String>> modCategories, String workingCategory, List<String> iteratedCategories) {
        // Check if there are cyclic dependencies on mod categories
        var lWorkingCategory = workingCategory;
        if (iteratedCategories.stream().anyMatch(category -> (category.equals(lWorkingCategory))))
            throw new RuntimeException("[ERROR]: Cyclic category dependencies:  ${iteratedCategories}!");
        // Check that the working category actually exists
        if (modCategories.containsKey("[optional]:" + workingCategory))
            workingCategory = "[optional]:" + workingCategory;
        else if (modCategories.containsKey("[required]:" + workingCategory))
            workingCategory = "[required]:" + workingCategory;
        else if (!(workingCategory.contains("[optional]:") && modCategories.containsKey(workingCategory)) &&
                !(workingCategory.contains("[required]:") && modCategories.containsKey(workingCategory)))
            throw new RuntimeException("[ERROR]: Category \"${workingCategory}\" does not exist in ${modCategories}!");
        // Add working category
        iteratedCategories.add(workingCategory);
        // Iterate for entries
        Set<String> filledEntries = new HashSet<>();
        modCategories.get(workingCategory).forEach(entry -> {
            // If entry is non-existent, remove
            if (entry == null || entry.isEmpty())
                return;
            // Add normally if it's a regular modid entry
            if (!entry.contains("#"))
                filledEntries.add(entry);
                // Apply subcategories for entry
            else filledEntries.addAll(applySubCategory(modCategories, entry.replace("#", ""), iteratedCategories));
        });
        // Remove working category: Avoids sibling branches duplicating entries in iterated categories
        iteratedCategories.remove(workingCategory);
        return filledEntries;
    }

    private static Set<String> getCategory(String category) {
        category = "[optional]:" + category;
        if (!MOD_CATEGORIES.containsKey(category))
            throw new RuntimeException("[" + Mobsiege.MODID + "]: Mod category \"" + category + "\" does not exist!");
        return MOD_CATEGORIES.get(category);
    }

    private static boolean isCategoryEnabled(Set<String> category) {
        return category.stream().allMatch(mod -> ModList.get().isLoaded(mod));
    }

    public static boolean librariesEnabled() {
        return isCategoryEnabled(LIBRARIES);
    }

    public static boolean lifecycleEnabled() {
        return isCategoryEnabled(LIFECYCLE);
    }

    public static boolean primitiveTechnology1Enabled() {
        return isCategoryEnabled(PRIMITIVE_TECHNOLOGY_1);
    }
}
