if (!Modpack2Gradle.isCategoryEnabled(Modpack2Gradle.PRIMITIVE_TECHNOLOGY_1))
     return

commonTags(event => {
     event.add(`${main}:cake`, [
          'minecraft:cake', 
          'tconstruct:magma_cake', 
          'tconstruct:blood_cake', 
          'tconstruct:earth_cake', 
          'tconstruct:sky_cake', 
          'tconstruct:ichor_cake', 
          'tconstruct:ender_cake', 
          'supplementaries:pancake', 
          'farmersdelight:sweet_berry_cheesecake'
     ])
})