

const setup = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=810')
    // console.log(res.data)
    const pokemons = res.data.results.slice(0, 10)
    pokemons.forEach(async pokemon => {
        const res = await axios.get(pokemon.url)
        $('#pokeCards').append(`
            <div class="card text-center pokeCard" style="width: 18rem;" pokeName=${pokemon.name}>
                <h2 class="card-title">${pokemon.name.toUpperCase()}</h2>
                <img src="${res.data.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <button class="btn btn-primary moreInfo" id=${pokemon.name} data-toggle="modal" data-target="#pokeModal">More</button>
                </div>
            </div>
        `)
    })
     $('body').on('click', '.pokeCard', async function (e) {
    const pokemonName = $(this).attr('pokeName')
    console.log("pokemonName: ", pokemonName);
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    console.log("res.data: ", res.data);
    const types = res.data.types.map((type) => type.type.name)
    console.log("types: ", types);
    $('.modal-body').html(`
        <div style="width:200px">
            <img src="${res.data.sprites.other['official-artwork'].front_default}" alt="${res.data.name}"/>
            <div>
            <h3>Abilities</h3>
            <ul>
                ${res.data.abilities.map((ability) => `<li>${ability.ability.name.charAt(0).toUpperCase()}${ability.ability.name.slice(1)}</li>`).join('')}
            </ul>
            </div>
            <div>
            <h3>Stats</h3>
            <ul>
            ${res.data.stats.map((stat) => `<li>${stat.stat.name.toUpperCase()}: ${stat.base_stat}</li>`).join('')}
            </ul>
            </div>
        </div>
        <div>
            <h3>Types</h3>
            <ul>
                ${types.map((type) => `<li>${type.charAt(0).toUpperCase()}${type.slice(1)}</li>`).join('')}
            </ul>
        </div>
        <div>
            <h3>Size</h3>
            <ul>
                <li>Height: ${res.data.height} decimeters</li>
                <li>Weight: ${res.data.weight} hectograms</li>
            </ul>
        </div>
        `)
    $('.modal-title').html(`
        <h2>${res.data.name.toUpperCase()}</h2>
        <h3>${res.data.id}</h3>
        `)
  })

}

$(document).ready(setup)