const app = require('./app');
const { conn, User, Product } = require('./db');
const { faker } = require('@faker-js/faker');

const igdb = require('igdb-api-node').default;

const client = igdb('71n9jotfv4acipnlmuxyy6btvrik4u', '9y3fegv67pshqedo7s191euhphaztj');

const setUp = async()=> {
  try {
    await conn.sync({ force: true });

// General / Landing Page Queries


    const thisMonthGames1989 = await client
      .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
      .limit(10)
      .where('release_dates.date < 652165260 & release_dates.date > 649486860& total_rating > 50')
      .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
      thisMonthGames1989.data.map(game=>{
        Product.create({theme: 'thisMonthGames1989', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
    });
    

//     const thisYearsGames1985 = await client
//       .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
//       .limit(10)
//       .where('release_dates.date < 504853200 & release_dates.date > 473403600 & total_rating > 80')
//       .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//       thisYearsGames1985.data.map(game=>{
//         Product.create({theme: 'thisYearsGames1985', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

//     const thisYearsGames1987 = await client
//       .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
//       .limit(10)
//       .where('release_dates.date < 568011600 & release_dates.date > 536475600 & total_rating > 80')
//       .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//       thisYearsGames1987.data.map(game=>{
//         Product.create({theme: 'thisYearsGames1987', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

    const thisYearsGames1990 = await client
    .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
    .limit(10)
    .where('release_dates.date < 662706000 & release_dates.date > 631170000 & total_rating > 80')
    .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
    thisYearsGames1990.data.map(game=>{
      Product.create({theme: 'thisYearsGames1990', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
  });

  const thisYearsGames1992 = await client
    .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
    .limit(10)
    .where('release_dates.date < 725864400 & release_dates.date > 694242000 & total_rating > 80')
    .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
    thisYearsGames1992.data.map(game=>{
      Product.create({theme: 'thisYearsGames1992', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
  });

//   const thisYearsGames1994 = await client
//   .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
//   .limit(10)
//   .where('release_dates.date < 788936400 & release_dates.date > 757400400 & total_rating > 80')
//   .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//   thisYearsGames1994.data.map(game=>{
//     Product.create({theme: 'thisYearsGames1994', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
// });

  //   const zeldaGames = await client
  //   .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
  //   .limit(10)
  //   .search('zelda') 
  //   .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games');
  //   zeldaGames.data.map(game=>{
  //     Product.create({theme: 'zeldaGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
  //  });

  // const marioGames = await client
  //   .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
  //   .limit(10)
  //   .search('mario')
  //   .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games');
  //   marioGames.data.map(game=>{
  //     Product.create({theme: 'marioGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
  // });

//   Platform-specific Queries

//       const topNESGames = await client
//       .fields('name,cover.url,total_rating')
//       .limit(10)
//       .where('release_dates.platform = 18 & total_rating > 80')
//       .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//       console.log(topNESGames.data)
//       topNESGames.data.map(game=>{
//         Product.create({theme: 'topNESGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

//       const topSNESGames = await client
//       .fields('name,cover.url,total_rating')
//       .limit(10)
//       .where('release_dates.platform = 19 & total_rating > 80')
//       .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//       console.log(topSNESGames.data)
//       topSNESGames.data.map(game=>{
//         Product.create({theme: 'topSNESGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

//       const topPlayStationGames = await client
//       .fields('name,cover.url,total_rating')
//       .limit(10)
//       .where('release_dates.platform = 7 & total_rating > 80')
//       .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//       console.log(topPlayStationGames.data)
//       topPlayStationGames.data.map(game=>{
//         Product.create({theme: 'topPlayStationGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

//       const topXboxGames = await client
//       .fields('name,cover.url,total_rating')
//       .limit(10)
//       .where('release_dates.platform = 11 & total_rating > 80')
//       .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//       console.log(topXboxGames.data)
//       topXboxGames.data.map(game=>{
//         Product.create({theme: 'topXboxGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

//       const topSegaGenesisGames = await client
//       .fields('name,cover.url,total_rating')
//       .limit(10)
//       .where('release_dates.platform = 29 & total_rating > 80')
//       .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//       console.log(topSegaGenesisGames.data)
//       topSegaGenesisGames.data.map(game=>{
//         Product.create({theme: 'topSegaGenesisGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`})
//     });
  
// //   Genre-specific Queries

//     const topFightingGames = await client
//     .fields('name, cover.url, total_rating')
//     .limit(10)
//     .where('(release_dates.platform = (7,18,19,11,29) & genres = 4) & total_rating > 60')
//     .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//     console.log(topFightingGames.data)
//       topFightingGames.data.map(game=>{
//         Product.create({theme: 'topFightingGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

//     const topRPGGames = await client
//     .fields('name, cover.url, total_rating')
//     .limit(10)
//     .where('(release_dates.platform = (7,18,19,11,29) & genres = 12) & total_rating > 60')
//     .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//     console.log(topRPGGames.data)
//     topRPGGames.data.map(game=>{
//         Product.create({theme: 'topRPGGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

//     const topSportsGames = await client
//     .fields('name, cover.url, total_rating')
//     .limit(10)
//     .where('(release_dates.platform = (7,18,19,11,29) & genres = 14) & total_rating > 60')
//     .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//     console.log(topSportsGames.data)
//     topSportsGames.data.map(game=>{
//         Product.create({theme: 'topSportsGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

//     const topAdventureGames = await client
//     .fields('name, cover.url, total_rating')
//     .limit(10)
//     .where('(release_dates.platform = (7,18,19,11,29) & genres = 31) & total_rating > 60')
//     .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//     console.log(topAdventureGames.data)
//     topAdventureGames.data.map(game=>{
//         Product.create({theme: 'topAdventureGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

//     const topPlatformGames = await client
//     .fields('name, cover.url, total_rating')
//     .limit(10)
//     .where('(release_dates.platform = (7,18,19,11,29) & genres = 8) & total_rating > 60')
//     .request('http://0.0.0.0:8080/https://api.igdb.com/v4/games')
//     console.log(topPlatformGames.data)
//     topPlatformGames.data.map(game=>{
//         Product.create({theme: 'topPlatformGames', name: `${game.name}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`})
//     });

// Queries to get all platform ids + genre ids

    // const platformIds = await client
    // .fields('name')
    // .limit(200)
    // .sort('id')
    // .request('http://0.0.0.0:8080/https://api.igdb.com/v4/platforms')
    // console.log(platformIds.data); 

    // const genreIds = await client
    // .fields('name')
    // .limit(50)
    // .sort('id')
    // .request('http://0.0.0.0:8080/https://api.igdb.com/v4/genres')
    // console.log(genreIds.data); 

    await User.create({ username: 'moe', password: 'moe_pw', email: 'moe@gmail.com'});
    await User.create({ username: 'lucy', password: 'lucy_pw', email: 'lucy@gmail.com'});

    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

setUp();
