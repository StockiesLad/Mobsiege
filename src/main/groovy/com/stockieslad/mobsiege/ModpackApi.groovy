package com.stockieslad.mobsiege

import com.stockieslad.mobsiege.api.*
import groovy.transform.CompileStatic

/**
 * All API code is strictly declared in groovy, as it depends on other groovy code...
 * @apiNote See {project_root}/buildSrc/src/main/groovy/com/stockieslad/mobsiege/mod_category
 */
@CompileStatic
class ModpackApi {
    private static final IGradle GRADLE
    private static final IModpack MODPACK
    private static final IMinecraft MINECRAFT
    private static final IFabric FABRIC
    private static final IBuildCraft BUILD_CRAFT
    private static final IToughAsNails TOUGH_AS_NAILS

    static init() {}

    static {
        GRADLE = IGradle.instance
        MODPACK = IModpack.instance
        MINECRAFT = IMinecraft.instance
        FABRIC = GRADLE.isModEnabled("fabric_api") ? IFabric.instance : null
        BUILD_CRAFT = GRADLE.isModEnabled("buildcraftcore") ? IBuildCraft.instance : null
        TOUGH_AS_NAILS = GRADLE.isModEnabled("toughasnails") ? IToughAsNails.instance : null
    }

    static IGradle gradle() {
        return GRADLE
    }

    static IModpack modpack() {
        return MODPACK
    }

    static IMinecraft minecraft() {
        return MINECRAFT
    }

    static IFabric fabric() {
        if (FABRIC)
            throw new RuntimeException("[ERROR]: IFabric accessed without presence of \"fabric api\"!")
        else return FABRIC
    }

    static IBuildCraft buildCraft() {
        if (BUILD_CRAFT)
            throw new RuntimeException("[ERROR]: IBuildCraft accessed without presence of \"buildcraft\"!")
        else return BUILD_CRAFT
    }

    static IToughAsNails toughAsNails() {
        if (TOUGH_AS_NAILS)
            throw new RuntimeException("[ERROR]: IToughAsNails accessed without presence of \"toughasnails\"!")
        else return TOUGH_AS_NAILS
    }
}
