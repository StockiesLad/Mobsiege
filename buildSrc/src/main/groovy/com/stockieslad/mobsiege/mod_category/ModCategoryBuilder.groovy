package com.stockieslad.mobsiege.mod_category

import static com.stockieslad.mobsiege.mod_category.ModCategoryValidator.findCategory

class ModCategoryBuilder {
    private final Map<String, List<String>> rawModCategories

    ModCategoryBuilder(Map<String, List<String>> rawModCategories) {
        this.rawModCategories = rawModCategories
    }

    Map<String, Set<String>> applySubCategories() {
        Map<String, Set<String>> newModCategories = new HashMap<>()
        rawModCategories.forEach {category, entries ->
            newModCategories.put(category, applySubCategory(category, new ArrayList<String>()))}
        return newModCategories
    }

    Set<String> applySubCategory(String workingCategory, List<String> iteratedCategories) {
        // Find the working category actually exists
        workingCategory = findCategory(rawModCategories, workingCategory)
        // Add working category
        iteratedCategories.add(workingCategory)
        // Iterate for entries
        Set<String> filledEntries = new HashSet<>()
        rawModCategories.get(workingCategory).forEach {entry ->
            // If entry is non-existent, remove
            if (entry == null || entry.isEmpty())
                return
            // Add normally if it's a regular modid entry
            if (!entry.contains("#"))
                filledEntries.add(entry)
            // Apply subcategories for entry
            else filledEntries.addAll(applySubCategory(entry, iteratedCategories))
        }
        // Remove working category: Avoids sibling branches duplicating entries in iterated categories
        iteratedCategories.remove(workingCategory)
        return filledEntries
    }
}
