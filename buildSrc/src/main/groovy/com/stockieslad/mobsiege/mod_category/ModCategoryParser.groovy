package mod_category

import groovy.json.JsonOutput

class ModCategoryParser {
    static String findCategory(Map<String, ? extends Collection<String>> modCategories, String rawCategory) {
        rawCategory = rawCategory.replace("#", "")
        String oldName = rawCategory

        if (!rawCategory.contains(":")) {
            for (var type : List.of("optional", "required", "constraint")) {
                if (modCategories.containsKey("[${type}]:${rawCategory}".toString())) {
                    rawCategory = "[${type}]:${oldName}"
                    break
                }
            }
        }

        if (!oldName.contains(":") && oldName == rawCategory)
            throw new RuntimeException("[ERROR]: Category \"${rawCategory}\" does not exist in ${JsonOutput.prettyPrint(JsonOutput.toJson(modCategories))}!")

        return rawCategory
    }

    static String getCategoryName(String rawCategoryName) {
        return rawCategoryName.trim().split(":")[1]
    }
}
