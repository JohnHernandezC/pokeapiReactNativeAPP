export async function getPokemonList(limit = 20, offset = 0) {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;

    const response = await fetch(url);
    const json = await response.json();

    const results = json.results;

    // Obtener detalles de cada Pokémon
    const detailedPokemonList = await Promise.all(
      results.map(async (pokemon) => {
        try {
          const res = await fetch(pokemon.url);
          const data = await res.json();

          // Obtener la mejor imagen disponible
          const getPreferredImage = () => {
            const images = [
              data.sprites?.other?.['official-artwork']?.front_default,
              data.sprites?.other?.home?.front_default,
              data.sprites?.front_default
            ];
            return images.find(img => img) || null;
          };

          // Asegurarse de que la URL de la imagen sea HTTPS
          let imageUrl = getPreferredImage();
          if (imageUrl && imageUrl.startsWith('http:')) {
            imageUrl = imageUrl.replace('http:', 'https:');
          }

          return {
            id: data.id,
            name: data.name,
            image: imageUrl,
            types: data.types.map((t) => t.type.name),
            stats: data.stats.map(stat => ({
              name: stat.stat.name,
              value: stat.base_stat
            })),
            height: data.height,
            weight: data.weight,
            abilities: data.abilities.map(ability => ({
              name: ability.ability.name,
              is_hidden: ability.is_hidden
            }))
          };
        } catch (error) {
          console.error(`Error fetching pokemon details for ${pokemon.name}:`, error);
          return null;
        }
      })
    );

    // Filtrar cualquier pokemon null (que falló al cargar)
    return detailedPokemonList.filter(pokemon => pokemon !== null);
  } catch (error) {
    console.error("Error fetching pokemon list:", error);
    return [];
  }
}

export async function getPokemonDetails(id) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await response.json();
    
    // Asegurarse de que todas las URLs de imágenes sean HTTPS
    const processImageUrl = (url) => {
      if (url && url.startsWith('http:')) {
        return url.replace('http:', 'https:');
      }
      return url;
    };

    // Procesar todas las variantes de imágenes
    if (data.sprites) {
      data.sprites.front_default = processImageUrl(data.sprites.front_default);
      if (data.sprites.other) {
        if (data.sprites.other['official-artwork']) {
          data.sprites.other['official-artwork'].front_default = 
            processImageUrl(data.sprites.other['official-artwork'].front_default);
        }
        if (data.sprites.other.home) {
          data.sprites.other.home.front_default = 
            processImageUrl(data.sprites.other.home.front_default);
        }
      }
    }

    // Obtener información adicional de la especie
    const speciesResponse = await fetch(data.species.url);
    const speciesData = await speciesResponse.json();
    
    // Obtener la cadena de evolución
    const evolutionResponse = await fetch(speciesData.evolution_chain.url);
    const evolutionData = await evolutionResponse.json();

    // Procesar la cadena de evolución
    const processEvolutionChain = async (chain) => {
      const evolutions = [];
      let current = chain;

      while (current) {
        const pokemonId = current.species.url.split('/').slice(-2, -1)[0];
        const pokemonResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
        const pokemonData = await pokemonResponse.json();

        evolutions.push({
          id: pokemonId,
          name: current.species.name,
          image: processImageUrl(pokemonData.sprites.other['official-artwork'].front_default || pokemonData.sprites.front_default),
          min_level: current.evolution_details[0]?.min_level || null,
          trigger: current.evolution_details[0]?.trigger?.name || null,
          item: current.evolution_details[0]?.item?.name || null,
        });

        current = current.evolves_to[0]; // Tomar solo la primera evolución por simplicidad
      }

      return evolutions;
    };

    // Añadir información de especie y evolución al objeto Pokemon
    data.species_info = {
      flavor_text: speciesData.flavor_text_entries.find(entry => entry.language.name === "es")?.flavor_text ||
                  speciesData.flavor_text_entries.find(entry => entry.language.name === "en")?.flavor_text,
      habitat: speciesData.habitat?.name,
      generation: speciesData.generation.name,
      is_legendary: speciesData.is_legendary,
      is_mythical: speciesData.is_mythical,
    };

    data.evolution_chain = await processEvolutionChain(evolutionData.chain);

    return data;
  } catch (error) {
    console.error("Error fetching pokemon details:", error);
    throw error;
  }
}
