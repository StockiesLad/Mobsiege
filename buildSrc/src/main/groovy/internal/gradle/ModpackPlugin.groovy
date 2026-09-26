package internal.gradle

import org.gradle.api.Plugin
import org.gradle.api.Project

class ModpackPlugin implements Plugin<Project> {
    @Override
    void apply(Project project) {
        project.extensions.create(
                "modpack",
                ModCategoriesExtension,
                project
        )
    }
}