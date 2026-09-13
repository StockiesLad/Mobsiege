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
import java.util.List;
import java.util.Map;

// Required categories are not implement yet as KubeJS doesn't need them yet.
public class Mobsiege2GradleCategories {
    // Optional Categories
    private static Map<String, List<String>> MOD_CATEGORIES;
    private static List<String> LIBRARIES = null;
    private static List<String> KUBEJS = null;
    private static List<String> ENTITY = null;
    private static List<String> PRIMITIVE_TECHNOLOGY_1 = null;
    //...[insert other categories]

    {
        try (InputStream inputStream = getClass().getClassLoader().getResourceAsStream("META-INF/mod_categories.json")) {
            assert inputStream != null;
            try (Reader reader = new InputStreamReader(inputStream)) {
                    Gson gson = new Gson();
                    Type type = new TypeToken<Map<String, List<String>>>(){}.getType();
                    MOD_CATEGORIES = gson.fromJson(reader, type);
            }
        } catch (IOException e) {
            throw new RuntimeException("[" + Mobsiege.MODID + "]: Error reading mod categories. This must be resolved.");
        }

        LIBRARIES = getCategory("libraries");
        ENTITY = getCategory("entity");
        KUBEJS = getCategory("kubejs");
        PRIMITIVE_TECHNOLOGY_1 = getCategory("primitive_technology_1");


    }

    private static List<String> getCategory(String category) {
        return MOD_CATEGORIES.get("[optional]:" + category);
    }

    private static boolean isCategoryEnabled(List<String> category) {
        return category.stream().allMatch(mod -> ModList.get().isLoaded(mod));
    }

    public static boolean librariesEnabled() {
        return isCategoryEnabled(LIBRARIES);
    }

    public static boolean kubejsEnabled() {
        return isCategoryEnabled(KUBEJS);
    }

    public static boolean entityEnabled() {
        return isCategoryEnabled(ENTITY);
    }

    public static boolean primitiveTechnology1Enabled() {
        return isCategoryEnabled(PRIMITIVE_TECHNOLOGY_1);
    }
}
