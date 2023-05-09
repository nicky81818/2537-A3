const PAGE_SIZE = 10
let currentPage = 1
let pokemons = []

const updatePaginationDiv = (currentPage, numPages, pokemons) => {
    $('#pagination').empty()

    const startPage = currentPage - 2 > 0 ? currentPage - 2 : 1;
    const endPage = currentPage + 2 < numPages ? currentPage + 2 : numPages;
    if (currentPage > 1) {
        $('#pagination').append(`
            <button class="btn btn-primary page ml-1 numberedButtons" value="${currentPage - 1}">Previous</button>
        `)
    }
    for (let i = startPage; i <= endPage; i++) {
        $('#pagination').append(`
            <button class="btn btn-primary page ml-1 numberedButtons" value="${i}">${i}</button>
        `)
    }
    if (endPage < pokemons.length/PAGE_SIZE) {
        $('#pagination').append(`
            <button class="btn btn-primary page ml-1 numberedButtons" value="${currentPage + 1}">Next</button>
        `)
    }
}

const paginate = async (currentPage, PAGE_SIZE, pokemons) => {
    selected_pokemons = pokemons.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

    $('#pokeCards').empty()
    selected_pokemons.forEach(async (pokemon) => {
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
}


const setup = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=810')
    pokemons = res.data.results
    paginate(currentPage, PAGE_SIZE, pokemons)
    const numPages = Math.ceil(pokemons.length / PAGE_SIZE)
    updatePaginationDiv(currentPage, numPages, pokemons)

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
    $('body').on('click', ".numberedButtons", async function (e) {
     currentPage = Number(e.target.value)
     paginate(currentPage, PAGE_SIZE, pokemons) 
     updatePaginationDiv(currentPage, numPages, pokemons)
    })
}

$(document).ready(setup)