package com.stockieslad.mobsiege.runtime.startup


import com.stockieslad.mobsiege.util.RegistryHelper
import dev.latvian.mods.kubejs.bindings.event.ServerEvents
import dev.latvian.mods.kubejs.recipe.RecipesEventJS
import dev.latvian.mods.kubejs.script.ScriptType
import groovy.transform.CompileStatic
import net.minecraft.sounds.SoundEvent

@CompileStatic
class Lifecycle {
    public static final SoundEvent NETHER_SCREAMS = RegistryHelper.registerSoundEvent("ambient.nether.screams")

    static run() {}
}
