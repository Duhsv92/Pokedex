const pokeContainer = document.querySelector("#pokeContainer")
const pokemonCount = 151
const colors = {
    fire: '#FDDFDF',
    grass: '#DEFDE0',
    electric: '#FCF7DE',
    water: '#DEF3FD',
    ground: '#f4e7da',
    rock: '#d5d5d4',
    fairy: '#fceaff',
    poison: '#98d7a5',
    bug: '#f8d5a3',
    dragon: '#97b3e6',
    psychic: '#eaeda1',
    flying: '#F5F5F5',
    fighting: '#E6E0D4',
    normal: '#F5F5F5'
}


const mainTypes = Object.keys(colors);

const fetchPokemons = async () => {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemons(i)

    }
}

const getPokemons = async (id) => {
const url = `https://pokeapi.co/api/v2/pokemon/${id}`
const resp = await fetch(url)
const data = await resp.json()
createPokemonCard (data)

}

const createPokemonCard = (poke) => {
    const card = document.createElement('div')
    card.classList.add("pokemon")
    

    const name = poke.name[0].toUpperCase() + poke.name.slice(1)
    const id = poke.id.toString().padStart(3,'0')

    const pokeTypes = poke.types.map(type => type.type.name)
    const type = mainTypes.find(type => pokeTypes.indexOf(type) > -1)
    const color = colors [type]

    card.style.backgroundColor = color

    const pokemoninnerHTML = `<div class="imgContainer">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png"  alt="${name}">   
</div>
<div class="info">
    <span class="number">#${id}</span>
    <h3 class="name">${name}</h3>
    <small class="type">type:${type}<span></span></small>
</div>
`

card.innerHTML = pokemoninnerHTML

pokeContainer.appendChild(card)



}

fetchPokemons();

var contador=0;

function buscar() {
    var entrada = document.getElementById("entrada").value.toLowerCase();
    var url;

    if (entrada.length < 1) {         
        entrada = contador;
        // Com o campo de input vazio, busque por número na URL
        url = "https://pokeapi.co/api/v2/pokemon/" + entrada;
    } else {
        // Se houver um valor no campo de entrada, use-o diretamente na URL
        url = "https://pokeapi.co/api/v2/pokemon/" + entrada;
    }

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Exiba o resultado na tela
            const card = document.createElement('div');
            card.classList.add("pokemon");

            const name = data.name[0].toUpperCase() + data.name.slice(1);
            const id = data.id.toString().padStart(3, '0');

            const pokeTypes = data.types.map(type => type.type.name);
            const type = pokeTypes[0]; // Assumindo que sempre há pelo menos um tipo
            const color = colors [type]; // Defina uma cor padrão caso 'colors' não esteja definido

            card.style.backgroundColor = color;

            const pokemoninnerHTML = `
                <div class="imgContainer">
                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${data.id}.png"  alt="${name}">
                </div>
                <div class="info">
                    <span class="number">#${id}</span>
                    <h3 class="name">${name}</h3>
                    <small class="type">Type: ${type}</small>
                </div>
                <div class="botoesAp">
                    <button class="btAP" onclick="anterior()">Anterior</button>
                    <button class="btAP" onclick="proximo()">Proximo</button>
                </div>
            `;

            card.innerHTML = pokemoninnerHTML;

            const resultadoDiv = document.getElementById("resultado");
            resultadoDiv.innerHTML = ''; // Limpa resultados anteriores
            resultadoDiv.appendChild(card);

            contador = data.id;                              //atualiza o contador para o id do pokemon
            document.getElementById("entrada").value="";     //limpa o input de entrada
        })
        .catch(error => {
            console.error('Erro ao buscar o Pokémon:', error);
            // Em caso de erro, limpe o resultado na tela
            const resultadoDiv = document.getElementById("resultado");
            resultadoDiv.innerHTML = 'Erro ao buscar o Pokémon.';
        });
}


function proximo(){
    contador = contador + 1;
    buscar();
    

 }

 function anterior(){
    contador = contador - 1;
    buscar();
    

 }

