package com.stockieslad.mobsiege.content;

import com.stockieslad.mobsiege.util.RegistryHelper;
import net.minecraft.sounds.SoundEvent;

public class Lifecycle {
    public static final SoundEvent NETHER_SCREAMS = RegistryHelper.registerSoundEvent("ambient.nether.screams");

    public static void init() {}
}
