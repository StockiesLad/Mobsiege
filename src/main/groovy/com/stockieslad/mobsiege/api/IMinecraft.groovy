package com.stockieslad.mobsiege.api

import groovy.transform.CompileStatic
import net.minecraft.ChatFormatting
import net.minecraft.core.registries.Registries
import net.minecraft.network.chat.ClickEvent
import net.minecraft.network.chat.MutableComponent
import net.minecraft.network.chat.Style
import net.minecraft.network.chat.TextColor
import net.minecraft.resources.ResourceLocation
import net.minecraft.tags.TagKey
import net.minecraft.util.RandomSource
import net.minecraft.world.level.block.Block
import net.minecraft.world.level.block.state.BlockState
import net.minecraft.world.level.block.state.properties.Property

@CompileStatic
@Singleton
class IMinecraft {
    public final RandomSource staticRandom = createRandom(0);

    RandomSource createRandom(Integer seed) {
        return seed != null ? RandomSource.create(seed) : RandomSource.create()
    }

    ResourceLocation identifier(String string) {
        return ResourceLocation.parse(string)
    }

    TagKey<Block> createBlockTag(String string) {
        return TagKey.create(Registries.BLOCK, identifier(string))
    }

    boolean hasTag(BlockState state, TagKey<Block> tag) {
        return state.is(tag)
    }

    <T extends Comparable<T>> BlockState stateWith(BlockState state, Property<T> property, T value) {
        return state.trySetValue(property, value)
    }

    MutableComponent withStyle(MutableComponent text, Style style) {
        return text.withStyle(style)
    }

    Style withClickEvent(Style style, ClickEvent clickEvent) {
        return style.withClickEvent(clickEvent)
    }

    Style withColorFormat(Style style, ChatFormatting color) {
        return style.withColor(color)
    }

    Style withColorText(Style style, TextColor color) {
        return style.withColor(color)
    }
}
