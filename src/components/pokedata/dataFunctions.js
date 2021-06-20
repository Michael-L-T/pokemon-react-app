export async function getFullList(url) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data);
            })
    })
};

export function getPokemonUrl({ url } ) {
    return new Promise((resolve, reject) => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                resolve(data)
            })
    });
}

export function getFilterUrl(filter) {
    const dictionary = {
        "Gen1": "https://pokeapi.co/api/v2/pokemon?limit=151",
        "Gen2": "https://pokeapi.co/api/v2/pokemon?offset=151&limit=100",
        "Gen3": "https://pokeapi.co/api/v2/pokemon?offset=251&limit=135",
        "Gen4": "https://pokeapi.co/api/v2/pokemon?offset=386&limit=107",
        "Gen5": "https://pokeapi.co/api/v2/pokemon?offset=493&limit=156",
        "Gen6": "https://pokeapi.co/api/v2/pokemon?offset=649&limit=71",
        "Gen7": "https://pokeapi.co/api/v2/pokemon?offset=721&limit=88",
        "Gen8": "https://pokeapi.co/api/v2/pokemon?offset=809&limit=89",

        "Normal": "https://pokeapi.co/api/v2/type/1",
        "Fighting": "https://pokeapi.co/api/v2/type/2",
        "Flying": "https://pokeapi.co/api/v2/type/3",
        "Poison": "https://pokeapi.co/api/v2/type/4",
        "Ground": "https://pokeapi.co/api/v2/type/5",
        "Rock": "https://pokeapi.co/api/v2/type/6",
        "Bug": "https://pokeapi.co/api/v2/type/7",
        "Ghost": "https://pokeapi.co/api/v2/type/8",
        "Steel": "https://pokeapi.co/api/v2/type/9",
        "Fire": "https://pokeapi.co/api/v2/type/10",
        "Water": "https://pokeapi.co/api/v2/type/11",
        "Grass": "https://pokeapi.co/api/v2/type/12",
        "Electric": "https://pokeapi.co/api/v2/type/13",
        "Psychic": "https://pokeapi.co/api/v2/type/14",
        "Ice": "https://pokeapi.co/api/v2/type/15",
        "Dragon": "https://pokeapi.co/api/v2/type/16",
        "Dark": "https://pokeapi.co/api/v2/type/17",
        "Fairy": "https://pokeapi.co/api/v2/type/18",
    }
    console.log(dictionary[filter]);
    return dictionary[filter];

}