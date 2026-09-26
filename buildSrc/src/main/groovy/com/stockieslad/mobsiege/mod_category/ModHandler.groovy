package com.stockieslad.mobsiege.mod_category

import mod_category.ModCategoryParser

import java.util.function.Consumer

class ModHandler {
    private final ModCategoryProvider modCategories
    private final List<String> declaredMods

    protected ModHandler(ModCategoryProvider modCategories) {
        this.modCategories = modCategories
        this.declaredMods = new ArrayList<>()
    }

    boolean isModEnabled(String modid) {
        // Save that mod is a dependency
        declaredMods.add(modid)
        //Check if modid exists
        if (!modCategories.get().entrySet().stream().anyMatch { category -> {
            category.value.stream().anyMatch {mod -> mod == modid}
        }}) throw new RuntimeException("${modid} does not exist in mod_categories.json!")
        //Check requirements
        boolean allRequirementsSatisfied = modCategories.get().entrySet().stream()
        // Get requirements
                .filter{entry -> entry.key.contains("[required]")}
        // Remove categories that are not a requirement of mod
                .filter {entry -> entry.value.stream().anyMatch {categoryModId -> (modid == categoryModId) }}
        // Test all categories to see if they are all enabled
                .allMatch { entry -> modCategories.gradlePropertyEnabled.apply("enable_${ModCategoryParser.getCategoryName entry.key}")}
        if (!allRequirementsSatisfied)
            return false
        // Check constraints
        boolean allConstraintsSatisfied = modCategories.get()
                .getOrDefault("[constraint]:" + modid, new HashSet<String>()).stream()
        // Checks if all dependencies exist first
                .allMatch {dependency -> isModEnabled(dependency)}
        if (!allConstraintsSatisfied)
            return false
        // Check options
        boolean anyOptionsSatisfied = modCategories.get().entrySet().stream()
        // Get options
                .filter{entry -> entry.key.contains("[optional]")}
        // Remove options that are disabled
                .filter { entry -> modCategories.gradlePropertyEnabled.apply("enable_${ModCategoryParser.getCategoryName entry.key}")}
        // Combine all enabled options' modids
                .flatMap{entry -> entry.value.stream()}
        // Test all categories to see if any are enabled
                .anyMatch{modElement -> (modid == modElement) }
        // Show when mod is loaded
        if (anyOptionsSatisfied && modCategories.gradlePropertyEnabled.apply("debug_mod_list"))
            println("Mod \"${modid}\" loaded: ${anyOptionsSatisfied}")

        return anyOptionsSatisfied
    }

    void addEnabledDependencies(Consumer<String> addDependency) {
        modCategories.get().entrySet().stream()
                .flatMap {it.value.stream()}
                .toSet().forEach {modid -> {
            if (isModEnabled(modid)) {
                addDependency.accept(modid)
            }
        }}

        printMissingDependencies()
    }

    void printMissingDependencies() {
        modCategories.get().entrySet().stream().forEach {
            it.value.forEach {modid -> {
                if (declaredMods.stream().noneMatch {mod -> modid == mod})
                    println("[WARN]: Mod \"${modid}\" in category \"${it.key}\" is not listed in the gradle dependencies!")
            }}
        }
    }
}
