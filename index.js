

const setup = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=810')
    // console.log(res.data)
    const pokemons = res.data.results
    pokemons.forEach(async pokemon => {
        const res = await axios.get(pokemon.url)
        $('#pokeCards').append(`
            <div class="card text-center" style="width: 18rem;">
                <h2 class="card-title">${pokemon.name.toUpperCase()}</h2>
                <img src="${res.data.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
                <div class="card-body">
                    <button class="btn btn-primary" id="${pokemon.name}">More</button>
                </div>
            </div>
        `)
    })
}

$(document).ready(setup)