const JavaString = Java.loadClass('java.lang.String');
const JavaInteger = Java.loadClass('java.lang.Integer');
const IntegerArgumentType = Java.loadClass('com.mojang.brigadier.arguments.IntegerArgumentType');
const StringArgumentType = Java.loadClass('com.mojang.brigadier.arguments.StringArgumentType');
const Component = Java.loadClass('net.minecraft.network.chat.Component');
const ForgeRegistries = Java.loadClass('net.minecraftforge.registries.ForgeRegistries');
const Commands = Java.loadClass('net.minecraft.commands.Commands');
const Style = Java.loadClass('net.minecraft.network.chat.Style');
const ClickEvent = Java.loadClass('net.minecraft.network.chat.ClickEvent');
const ChatFormatting = Java.loadClass('net.minecraft.ChatFormatting');

ServerEvents.commandRegistry(event => {
    event.register(Commands.literal('inventoryrecipe')
        .then(Commands.argument('x', IntegerArgumentType.integer())
            .then(Commands.argument('y', IntegerArgumentType.integer())
                .then(Commands.argument('z', IntegerArgumentType.integer())
                    .then(Commands.argument('chestWidth', IntegerArgumentType.integer())
                        .executes(ctx => runCommand(ctx, null)) // no override
                            .then(Commands.argument('size', IntegerArgumentType.integer(1)) // optional override
                                .executes(ctx => {
                                    var sizeOverride = ctx.getArgument('size', JavaInteger).intValue();
                                    return runCommand(ctx, sizeOverride);
                                })
                            )
                    )
                )
            )
        )
    )
})

function runCommand(ctx, sizeOverride) {
    var x = ctx.getArgument('x', JavaInteger).intValue();
    var y = ctx.getArgument('y', JavaInteger).intValue();
    var z = ctx.getArgument('z', JavaInteger).intValue();
    var chestWidth = ctx.getArgument('chestWidth', JavaInteger).intValue();

    var world = ctx.getSource().getLevel();
    var pos = new BlockPos(x, y, z);
    var be = world.getBlockEntity(pos);

    if (!be || typeof be.getContainerSize !== 'function') {
        ctx.getSource().sendFailure(Component.literal(`§cNo chest at ${x},${y},${z}`));
        return 0;
    }

    var resultStack = be.getItem(0);
    if (resultStack.isEmpty()) {
        ctx.getSource().sendFailure(Component.literal('§cSlot 0 is empty!'));
        return 0;
    }

    var recipeTypeStack = be.getItem(chestWidth)
    var type = null
    if (recipeTypeStack.isEmpty()) {
        ctx.getSource().sendFailure(Component.literal('§cRecipe type is missing [\n\t"minecraft:crafting_table" = vanilla,\n\t"create:mechanical_crafter" = mechanical,\n\t"projecte:transmutation_table" = toolBreaking\n]!'));
        return 0
    } else {
        var recipeTypeId = ForgeRegistries.ITEMS.getKey(recipeTypeStack.getItem()).toString();
        if (recipeTypeId === 'minecraft:crafting_table')
            type = 'vanilla'
        else if (recipeTypeId === 'create:mechanical_crafter')
            type = 'mechanical'
        else if (recipeTypeId === 'projecte:transmutation_table')
            type = 'toolDamaging'
        else {
            ctx.getSource().sendFailure(Component.literal('§cRecipe type is missing [\n\t"minecraft:crafting_table" = vanilla,\n\t"create:mechanical_crafter" = mechanical,\n\t"projecte:transmuatation_table" = toolBreaking\n]!'));
            return 0
        }
    }


    var invSize = be.getContainerSize();
    var recipeSize = 0;

    for (var i = 1; i < invSize; i++) {
        var stack = be.getItem(i);
        if (!stack.isEmpty()) {
            var coords = maths.locateSquare(i, chestWidth)
            console.info(coords)
            coords.height++
            console.info(coords)
            console.info(recipeSize)
            var biggestAxis = coords.width > coords.height ? coords.width : coords.height
            console.info(biggestAxis)
            if (biggestAxis > recipeSize)
                recipeSize = biggestAxis
        }
    }

    if (sizeOverride !== null) {
        if (sizeOverride < recipeSize)
            ctx.getSource().sendFailure(Component.literal(`§eWarning: specified size ${sizeOverride} is smaller than actual ingredient count ${recipeSize}`));
        recipeSize = sizeOverride;
    }

    var resultId = ForgeRegistries.ITEMS.getKey(resultStack.getItem()).toString();
    var ingredients = [];

    for (var i = 1; i < invSize; i++) {
        var stack = be.getItem(i);
        if (!stack.isEmpty() && i % chestWidth != 0) {
            ingredients.push({
                id: ForgeRegistries.ITEMS.getKey(stack.getItem()).toString(),
                slot: maths.stretch(i - 1, chestWidth, recipeSize)
            });
        }
    }

    if (ingredients.length === 0) {
        ctx.getSource().sendFailure(Component.literal('§cNo ingredients found'));
        return 0;
    }

    var grouped = {};
    for (var j = 0; j < ingredients.length; j++) {
        var ing = ingredients[j];
        if (!grouped[ing.id]) grouped[ing.id] = [];
        grouped[ing.id].push(ing.slot);
    }

    var method = {
        vanilla: 'vanillaInsert',
        mechanical: 'mechanicalInsert',
        toolDamaging: 'toolDamagingInsert'
    }[type] || 'vanillaInsert';

    var output = `funcs.${method}('${resultId}', [\n\t`;
    output += Object.entries(grouped).map(([id, slots]) => `['${id}', [${slots.join(', ')}]]`).join(',\n\t');
    output += '\n]);';

    var styled = Style.EMPTY;
    styled = Mobsiege2Minecraft.withClickEvent(styled, new ClickEvent(ClickEvent.Action.COPY_TO_CLIPBOARD, output));
    styled = Mobsiege2Minecraft.withColorFormat(styled, ChatFormatting.GREEN);

    var msg = Mobsiege2Minecraft.withStyle(Component.literal(output), styled);
    ctx.getSource().sendSystemMessage(msg);
    return 1;
}