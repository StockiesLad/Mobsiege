recipes((event, funcs) => {
     comfuncs.iterate([
          'customportals:white_portal_catalyst',
          'customportals:light_gray_portal_catalyst',
          'customportals:gray_portal_catalyst',
          'customportals:black_portal_catalyst',
          'customportals:brown_portal_catalyst',
          'customportals:red_portal_catalyst',
          'customportals:orange_portal_catalyst',
          'customportals:yellow_portal_catalyst',
          'customportals:lime_portal_catalyst',
          'customportals:green_portal_catalyst',
          'customportals:cyan_portal_catalyst',
          'customportals:light_blue_portal_catalyst',
          'customportals:blue_portal_catalyst',
          'customportals:purple_portal_catalyst',
          'customportals:magenta_portal_catalyst',
          'customportals:pink_portal_catalyst'
     ], item => event.replaceInput({input: 'minecraft:ender_eye', output: item}, 'minecraft:ender_pearl', '#forge:ingots/enderium'))
})