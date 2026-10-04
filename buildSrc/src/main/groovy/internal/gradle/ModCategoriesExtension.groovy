package internal.gradle

import com.stockieslad.mobsiege.mod_category.ModCategoryProvider
import org.gradle.api.Project

class ModCategoriesExtension {
    final Project project

    ModCategoriesExtension(Project project) {
        this.project = project
    }

    Object dependency(String notation) {
        return project.dependencies.create(notation)
    }

    ModCategoryProvider modCategoryProvider() {
        return new ModCategoryProvider(
                (property -> {
                    var gradleProperty = project.providers.gradleProperty(property).getOrNull()
                    return gradleProperty == null ? null : gradleProperty.toBoolean()
                }),
                project.file("src/main/resources/META-INF/mod_categories.json"),
                false
        )
    }
}
