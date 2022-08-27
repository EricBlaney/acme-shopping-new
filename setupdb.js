const { conn, User, Product } = require('./db');
const { faker } = require('@faker-js/faker');
const igdb = require('igdb-api-node').default;
const client = igdb(process.env.IGDB_CLIENT_ID, process.env.IGDB_SECRET_KEY);

const arr = ['Poor', 'Fair', 'Good', 'Excellent'];

function randomCondition(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

const setupdb = async() => {
    try {
        await conn.sync({ force: true });
    // General / Landing Page Queries

        const thisYearsGames1985 = await client
          .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
          .limit(10)
          .where('release_dates.platform = 18 & release_dates.date > 473385600 & release_dates.date < 504921599 & total_rating > 40')
          .request('https://api.igdb.com/v4/games')
          thisYearsGames1985.data.map(game=>{
            Product.create({theme: 'thisYearsGames1985', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
        const thisYearsGames1987 = await client
          .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
          .limit(10)
          .where('release_dates.platform = 18 & release_dates.date > 566457600 & release_dates.date < 597993599 & total_rating > 50')
          .request('https://api.igdb.com/v4/games')
          thisYearsGames1987.data.map(game=>{
            Product.create({theme: 'thisYearsGames1987', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
        const thisYearsGames1990 = await client
        .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
        .limit(10)
        .where('release_dates.platform = 19 & release_dates.date > 631152000 & release_dates.date < 692687999 & total_rating > 50')
        .request('https://api.igdb.com/v4/games')
        thisYearsGames1990.data.map(game=>{
          Product.create({theme: 'thisYearsGames1990', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
      });
    
      const thisYearsGames1992 = await client
        .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
        .limit(10)
        .where('release_dates.platform = 18 & release_dates.date > 694224000 & release_dates.date < 725846399 & total_rating > 50')
        .request('https://api.igdb.com/v4/games')
        thisYearsGames1992.data.map(game=>{
          Product.create({theme: 'thisYearsGames1992', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
      });
    
      const thisYearsGames1994 = await client
      .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
      .limit(10)
      .where('release_dates.platform = 29 & release_dates.date > 757382400 & release_dates.date < 788918399 & total_rating > 40')
      .request('https://api.igdb.com/v4/games')
      thisYearsGames1994.data.map(game=>{
        Product.create({theme: 'thisYearsGames1994', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
    });
    
    //   //   const zeldaGames = await client
    //   //   .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
    //   //   .limit(10)
    //   //   .search('zelda') 
    //   //   .request('https://api.igdb.com/v4/games');
    //   //   zeldaGames.data.map(game=>{
    //   //     Product.create({theme: 'zeldaGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
    //   //  });
    
    //   // const marioGames = await client
    //   //   .fields('name,summary,cover.url,total_rating,release_dates.date,screenshots.*')
    //   //   .limit(10)
    //   //   .search('mario')
    //   //   .request('https://api.igdb.com/v4/games');
    //   //   marioGames.data.map(game=>{
    //   //     Product.create({theme: 'marioGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, releaseDate: `${new Date(game.release_dates[0].date * 1000)}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
    //   // });
    
    //   // Platform-specific Queries
    
          const topNESGames = await client
          .fields('name,summary,cover.url,total_rating')
          .limit(10)
          .where('release_dates.platform = 18 & total_rating > 80')
          .request('https://api.igdb.com/v4/games')
          // console.log(topNESGames.data)
          topNESGames.data.map(game=>{
            Product.create({theme: 'topNESGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
          const topSNESGames = await client
          .fields('name,summary,cover.url,total_rating')
          .limit(10)
          .where('release_dates.platform = 19 & total_rating > 80')
          .request('https://api.igdb.com/v4/games')
          // console.log(topSNESGames.data)
          topSNESGames.data.map(game=>{
            Product.create({theme: 'topSNESGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
          const topPlayStationGames = await client
          .fields('name,summary,cover.url,total_rating')
          .limit(10)
          .where('release_dates.platform = 7 & total_rating > 80')
          .request('https://api.igdb.com/v4/games')
          // console.log(topPlayStationGames.data)
          topPlayStationGames.data.map(game=>{
            Product.create({theme: 'topPlayStationGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
          const topXboxGames = await client
          .fields('name,summary,cover.url,total_rating')
          .limit(10)
          .where('release_dates.platform = 11 & total_rating > 80')
          .request('https://api.igdb.com/v4/games')
          // console.log(topXboxGames.data)
          topXboxGames.data.map(game=>{
            Product.create({theme: 'topXboxGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
          const topSegaGenesisGames = await client
          .fields('name,summary,cover.url,total_rating')
          .limit(10)
          .where('release_dates.platform = 29 & total_rating > 80')
          .request('https://api.igdb.com/v4/games')
          // console.log(topSegaGenesisGames.data)
          topSegaGenesisGames.data.map(game=>{
            Product.create({theme: 'topSegaGenesisGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, condition: `${randomCondition(arr)}`})
        });
      
    // //   Genre-specific Queries
    
        const topFightingGames = await client
        .fields('name,summary,cover.url, total_rating')
        .limit(10)
        .where('(release_dates.platform = (7,18,19,11,29) & genres = 4) & total_rating > 60')
        .request('https://api.igdb.com/v4/games')
        // console.log(topFightingGames.data)
          topFightingGames.data.map(game=>{
            Product.create({theme: 'topFightingGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
        const topRPGGames = await client
        .fields('name,summary,cover.url, total_rating')
        .limit(10)
        .where('(release_dates.platform = (7,18,19,11,29) & genres = 12) & total_rating > 60')
        .request('https://api.igdb.com/v4/games')
        // console.log(topRPGGames.data)
        topRPGGames.data.map(game=>{
            Product.create({theme: 'topRPGGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
        const topSportsGames = await client
        .fields('name,summary,cover.url, total_rating')
        .limit(10)
        .where('(release_dates.platform = (7,18,19,11,29) & genres = 14) & total_rating > 60')
        .request('https://api.igdb.com/v4/games')
        // console.log(topSportsGames.data)
        topSportsGames.data.map(game=>{
            Product.create({theme: 'topSportsGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
        const topAdventureGames = await client
        .fields('name,summary,cover.url, total_rating')
        .limit(10)
        .where('(release_dates.platform = (7,18,19,11,29) & genres = 31) & total_rating > 60')
        .request('https://api.igdb.com/v4/games')
        // console.log(topAdventureGames.data)
        topAdventureGames.data.map(game=>{
            Product.create({theme: 'topAdventureGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
        const topPlatformGames = await client
        .fields('name,summary,cover.url, total_rating, summary')
        .limit(10)
        .where('(release_dates.platform = (7,18,19,11,29) & genres = 8) & total_rating > 60')
        .request('https://api.igdb.com/v4/games')
        console.log(topPlatformGames.data)
        topPlatformGames.data.map(game=>{
            Product.create({theme: 'topPlatformGames', name: `${game.name}`, summary: `${game.summary}`, imageUrl: `${game.cover.url}`, rating: `${game.total_rating}`, price: `${Number(faker.commerce.price(10,60,2))}`, condition: `${randomCondition(arr)}`})
        });
    
    // // Console Queries
    
    const consoles = await Promise.all ([
      Product.create({theme: 'consoles', name: 'Nintendo Entertainment System', summary: 'The history of NES the Nintendo Entertainment System -NES- spans the 1982 development of the Family Computer, to the 1985 launch of the NES, to Nintendos rise to global dominance based upon this platform throughout the late 1980s. The Family Computer or Famicom was developed in 1982 and launched in 1983 in Japan. Following the North American video game crash of 1983, the Famicom was adapted into the NES which was brazenly launched in North America in 1985. Transitioning the company from its arcade game history into this combined global 8-bit home video game console platform, the Famicom and NES continued to aggressively compete with the next-generation 16-bit consoles including the 1988 Sega Genesis. The platform was succeeded by the Super Famicom in 1990 and the Super Nintendo Entertainment System in 1991, but its support and production continued until 1995. Interest in the NES has been renewed by collectors and emulators, including Nintendos own Virtual Console platform.', imageUrl: 'https://tinyurl.com/5y877rfv', condition: `${randomCondition(arr)}`, price: `300`}),
      Product.create({theme: 'consoles', name: 'Super Nintendo Entertainment System', summary: 'The Super Nintendo Entertainment System, also known as the SNES, was a 16-bit console developed by Nintendo in the 1990s. Also known as the Super Famicom in Japan, the SNES was Nintendos second home console and followed the success of the NES. The console introduced advanced graphics and sound capabilities as well as a variety of enhancement chips integrated in game cartridges that helped keep it competitive in the marketspace as more consoles began to populate it.', imageUrl: 'https://tinyurl.com/3b8v8sem', condition: `${randomCondition(arr)}`, price: `400`}),
      Product.create({theme: 'consoles', name: 'Super Genesis System', summary: 'Known as the Mega Drive in Europe and Japan, the Genesis was known for having classics in nearly every genre with support from Electronic Arts giving it the edge in the sports category (go NHL ’94!), the bloodier Mortal Kombat, and what some consider to be the greatest controller ever created: the six button.  It isnt difficult to prove why the software lineup was so successful considering the recent release and success of Sonics Ultimate Genesis Collection. Just tick down the list and youll find a bundle of absolutely brilliant games. The Phantasy Star and Shining Force series combined to offer role playing options that were equal to, if not better than anything available from the competition and titles like Ecco the Dolphin and Comix Zone offered dashes of edgy action that were highly original at the time.', imageUrl: 'https://tinyurl.com/44c7sa8b', condition: `${randomCondition(arr)}`, price: `250`}),
      Product.create({theme: 'consoles', name: 'PlayStation', summary: 'PlayStation, video game console released in 1994 by Sony Computer Entertainment. The PlayStation, one of a new generation of 32-bit consoles, signaled Sonys rise to power in the video game world. Also known as the PS One, the PlayStation used compact discs, heralding the video game industrys move away from cartridges. After a failed venture with Nintendo to release the PlayStation as the Super Nintendo Entertainment System CD in the early 1990s, Sony made the decision to market its own console. The PlayStation was released in Japan in December 1994, and it made its American debut in September 1995; both releases elicited critical acclaim and impressive sales. Titles such as Twisted Metal and Ridge Racer were very popular. By 2005 the PlayStation had become the first console ever to ship 100 million units. PlayStations premier games included fan favourites such as Final Fantasy 7, Crash Bandicoot, and Tekken, all of which spawned numerous sequels.', imageUrl: 'https://tinyurl.com/3wpypcux', condition: `${randomCondition(arr)}`, price: `500`}),
      Product.create({theme: 'consoles', name: 'Xbox', summary: 'Xbox, video game console system created by the American company Microsoft. The Xbox, Microsoft’s first entry into the world of console electronic gaming, was released in 2001, which placed it in direct competition with Sony’s PlayStation 2 and Nintendo’s GameCube. Concerned about Sony’s successful PlayStation console damaging the personal computer market, Microsoft initiated plans in 1999 to create its own console gaming system to both diversify its product line and capitalize on the thriving gaming industry. The system—originally termed the DirectX-box for its use of the eponymous video software—underwent multiple launch delays and several pricing adjustments after it made its debut. Despite popular titles such as Halo: Combat Evolved and Halo 2, Microsoft reported in 2005 that it had thus far lost $4 billion from the Xbox enterprise.', imageUrl: 'https://tinyurl.com/4rm5rybp', condition: `${randomCondition(arr)}`, price: `450`})
    ]);
    
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
    
        await User.create({ username: 'fred', password: 'fred_pw', email: 'fred@gmail.com', isAdmin: true});
        await User.create({ username: 'moe', password: 'moe_pw', email: 'moe@gmail.com', isAdmin: true});
        await User.create({ username: 'lucy', password: 'lucy_pw', email: 'lucy@gmail.com'});
    
      }
      catch(ex){
        console.log(ex);
      }
}

setupdb();

