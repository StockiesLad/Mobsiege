package com.stockieslad.mobsiege.mod_category


import mod_category.ModCategoryParser

import java.util.function.Function

class ModCategoryValidator {
    Function<String, Boolean> gradlePropertyEnabled

    ModCategoryValidator(Function<String, Boolean> gradlePropertyEnabled) {
        this.gradlePropertyEnabled = gradlePropertyEnabled
    }

    /**
     * <p> Category format:  [optional/required/constraint]:modid
     * <p> Optionals - At least one option must be enabled for a given mod.
     * <p> Requirements - All requirements must be enabled for a given mod
     * <p> Constraint - Enables the dependents of a given mod
     * @param rawModCategories The json object for mod_categories.json
     */
    void validateModCategories(Map<String, List<String>> rawModCategories) {
        List<String> scannedCategories = new ArrayList<>()
        // Iterate through all categories
        rawModCategories.entrySet().stream().forEach {entry ->
            // Error if duplicate
            if (scannedCategories.contains(ModCategoryParser.getCategoryName(entry.key)))
                throw new RuntimeException("There are two mod categories with the same name: '${ModCategoryParser.getCategoryName entry.key}'")
            // Warn if empty category
            if (entry.value.size() == 0)
                println("[WARN]: Mod category '${ModCategoryParser.getCategoryName(entry.key)}' is empty.")
            // Scan for correct category format
            var keyList = entry.key.split(':')
            var type = keyList[0]
            var id = keyList[1]
            if (    entry.key != entry.key.toLowerCase() ||
                    entry.key.contains(" ") ||
                    keyList.length != 2 ||
                    !(      type == "[optional]" ||
                            type == "[required]" ||
                            type == "[constraint]"
                    ) ||
                    id.contains("||") ||
                    id.contains("{}") ||
                    (id.contains("{") && !id.contains("}")) ||
                    (!id.contains("{") && id.contains("}")) ||
                    id.contains("()")
            ) throw new RuntimeException("Mod category '${entry.key}' is does not obey naming convention!")
            // Check for cyclic constraints
            entry.value.stream().forEach { dependencyModid -> {
                List<String> parents = new ArrayList<>()
                if (entry.key.contains("[constraint]"))
                    parents.add(entry.key.split(":")[1])
                hasCyclicDependencies(rawModCategories, parents, dependencyModid)
            }}
            // Warn about missing gradle properties
            if (    gradlePropertyEnabled != null &&
                    !gradlePropertyEnabled.apply("enable_${ModCategoryParser.getCategoryName entry.key}") &&
                    !entry.key.contains("[constraint]")
            ) println("Category '${entry.key}' has no gradle properties definition. This will be assumed to be false.")
            // Add as scanned category for checking duplicates
            scannedCategories.add(ModCategoryParser.getCategoryName(entry.key))
        }
    }

    static void hasCyclicDependencies(Map<String, List<String>> modCategories, List<String> parents, String dependency) {
        // Find category for dependency
        if (dependency.contains("#")) {
            // Get any category for name
            dependency = ModCategoryParser.findCategory(modCategories, dependency)
        } else {
            // Only search for constraints for regular mod
            dependency = "[constraint]:${dependency}"
        }
        // Throw error if there is a cycle
        if (parents.contains(dependency))
            throw new RuntimeException("Cyclic dependency '${dependency}' found in tree: ${parents}")
        // Skip if such dependency is not existent
        if (!modCategories.containsKey(dependency))
            return
        // Iterate for sub-dependencies
        parents.add(dependency)
        modCategories.get(dependency).stream().forEach {subDependency -> {
            hasCyclicDependencies(modCategories, parents, subDependency)
        }}
        parents.remove(dependency)
    }

    static boolean categoryExists(Map<String, ? extends Collection<String>> modCategories, String rawCategory) {
        try {
            ModCategoryParser.findCategory(modCategories, rawCategory)
            return true
        } catch (RuntimeException ignored) {
            return false
        }
    }

}
