recipes((event, funcs) => {
     funcs.replace({input: '#forge:leather', output: 'toughasnails:empty_leather_canteen'}, r => funcs.generate(r, '#forge:leather').flatSquare(3).override(['#forge:string', 4]).next().vanilla())
})