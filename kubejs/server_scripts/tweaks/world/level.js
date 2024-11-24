const tancc = 'toughasnails:climate_clemency'
const regulator = comfuncs.packDef('orb_of_thermoregulation')
PlayerEvents.tick(event => {
    var player = event.player
    var playerName = player.getGameProfile().getName()
    if (player.inventory.contains(regulator) && !player.hasEffect(tancc))
        player.server.runCommandSilent('execute run effect give ' + playerName + ' ' + tancc + ' infinite')
    if (!player.inventory.contains(regulator) && player.hasEffect(tancc)) 
        player.server.runCommandSilent('execute run effect clear ' + playerName + ' ' + tancc)
})