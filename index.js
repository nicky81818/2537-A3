

const setup = async () => {
    const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=810')
    console.log(res.data)
}

$(document).ready(setup)