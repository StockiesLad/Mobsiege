ClientEvents.tick(event => {
     var level = event.getLevel()

     if (level.dimension !== 'minecraft:the_nether') return

     if (level.getTime() % 20 != 0) return

     var random = level.getRandom()
     var minDist = 48
     var maxDist = 64

     level.getPlayers().forEach(player => {
          var offset = () => (random.nextBoolean() ?  minDist + random.nextInt(maxDist - minDist) : -minDist - random.nextInt(maxDist - minDist))
          var pos = player.blockPosition().offset(offset(), offset(), offset())
          var biome = level.getBiome(pos)

          if (!(biome.is('biomesoplenty:visceral_heap') || random.nextInt(25) == 0)) return

          if (random.nextInt(25) != 0) return

          console.info('playing sound')
          level.playLocalSound(pos, Mobsiege.NETHER_SCREAMS, 'ambient', random.nextFloat() * 0.1 , 0.75 + random.nextFloat()/4, true)
     })
})