package com.stockieslad.mobsiege.mod_category

import mod_category.ModCategoryParser

class ModCategoryBuilder {
    private final Map<String, List<String>> rawModCategories
    private final boolean runtime

    ModCategoryBuilder(Map<String, List<String>> rawModCategories, boolean runtime) {
        this.rawModCategories = rawModCategories
        this.runtime = runtime
    }

    Map<String, Set<String>> applySubCategories() {
        Map<String, Set<String>> newModCategories = new HashMap<>()
        rawModCategories.forEach {category, entries ->
            newModCategories.put(category, applySubCategory(category, new ArrayList<String>()))}
        return newModCategories
    }

    Set<String> applySubCategory(String workingCategory, List<String> iteratedCategories) {
        // Find the working category actually exists
        workingCategory = ModCategoryParser.findCategory(rawModCategories, workingCategory)
        // Add working category
        iteratedCategories.add(workingCategory)
        // Iterate for entries
        Set<String> filledEntries = new HashSet<>()
        rawModCategories.get(workingCategory).forEach {entry ->
            // If entry is non-existent, remove
            if (entry == null || entry.isEmpty())
                return

            // Add normally if it's a regular modid entry
            if (!entry.contains("#")) {

                if (runtime) {
                    entry = entry.replace("|", "")
                    entry = entry.replaceAll(/\{[^}]*}/, '')
                    entry = entry.replace("(", "").replace(")", "")

                } else {
                    entry = entry.replaceAll(/\([^)]*\)/, '')
                    entry = entry.replace("{", "").replace("}", "")
                }
                filledEntries.add(entry)
            }
            // Apply subcategories for entry
            else {
                // Extra validation for safety
                if (entry.contains("|") || entry.contains("{") || entry.contains("}") || entry.contains("(") || entry.contains(")"))
                    throw new RuntimeException("[ERROR]: Id flags are not allowed in libraries!")
                filledEntries.addAll(applySubCategory(entry, iteratedCategories))
            }
        }
        // Remove working category: Avoids sibling branches duplicating entries in iterated categories
        iteratedCategories.remove(workingCategory)
        return filledEntries
    }
}
