import React, { useState, useMemo } from 'react';

// === ESTILOS INLINE (Substituindo as importações que falharam) ===
// Usamos classes Tailwind para garantir a estética e responsividade,
// mas mantemos as classes Bulma na estrutura JSX para seguir o design original.

// A lista inicial de produtos (tipada como string[])
const initialGoods: string[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

// O componente principal, tipado como React.FC
export const App: React.FC = () => {
  // 1. Hook useState para gerenciar o estado da lista.
  const [goods, setGoods] = useState<string[]>(initialGoods);

  // 2. Funções de manipulação do estado (Hooks e imutabilidade são usados)

  const handleSortAlphabetically = () => {
    // Cria uma cópia da lista e ordena usando localeCompare para ordenação correta de strings.
    const sortedGoods = [...goods].sort((a, b) => a.localeCompare(b));

    setGoods(sortedGoods);
  };

  const handleSortByLength = () => {
    // Cria uma cópia da lista e ordena pelo comprimento da string.
    const sortedGoods = [...goods].sort((a, b) => a.length - b.length);

    setGoods(sortedGoods);
  };

  const handleReverse = () => {
    // Cria uma cópia da lista e inverte a ordem.
    const reversedGoods = [...goods].reverse();

    setGoods(reversedGoods);
  };

  const handleReset = () => {
    // Volta ao estado inicial.
    setGoods(initialGoods);
  };

  // Usando useMemo para determinar se a lista atual é idêntica à lista inicial.
  // A verificação é baseada no conteúdo e ordem.
  const isResetDisabled = useMemo(() => {
    if (goods.length !== initialGoods.length) {
      return false;
    }

    return goods.every((good, index) => good === initialGoods[index]);
  }, [goods]);

  return (
    // Carrega Bulma e Tailwind via CDN para um ambiente de arquivo único.
    // O estilo Tailwind `font-sans` e o layout básico são aplicados aqui.
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
      />

      <div className="section content container mx-auto max-w-lg">
        <h1 className="title is-4 has-text-centered text-gray-800">
          Goods List Manager (TypeScript Hooks)
        </h1>

        {/* Botões de Ação */}
        <div
          className="buttons is-centered mb-6 space-y-2 
          sm:space-y-0 sm:space-x-2
         flex flex-col sm:flex-row"
        >
          <button
            type="button"
            className="button is-info is-light is-medium shadow-md 
            transition duration-300 
            hover:shadow-lg rounded-lg"
            onClick={handleSortAlphabetically}
          >
            Sort Alphabetically
          </button>

          <button
            type="button"
            className="button is-success is-light is-medium 
            shadow-md transition duration-300 
            hover:shadow-lg rounded-lg"
            onClick={handleSortByLength}
          >
            Sort by Length
          </button>

          <button
            type="button"
            className="button is-warning is-light is-medium 
            shadow-md transition duration-300 
            hover:shadow-lg rounded-lg"
            onClick={handleReverse}
          >
            Reverse
          </button>

          <button
            type="button"
            className="button is-danger is-medium shadow-md 
            transition duration-300 
            hover:shadow-lg rounded-lg disabled:opacity-50"
            onClick={handleReset}
            disabled={isResetDisabled}
          >
            Reset
          </button>
        </div>

        {/* Exibição da Lista */}
        <div className="box p-5 bg-white shadow-xl rounded-xl">
          <p
            className="subtitle is-6 has-text-weight-semibold 
          mb-4 border-b pb-2 text-gray-700"
          >
            (<span className="has-text-info">{goods.length}</span> )
          </p>

          <ul className="divide-y divide-gray-200">
            {goods.map(good => (
              <li
                key={good}
                data-cy="Good"
                className="py-3 px-4 text-lg text-gray-800 
                hover:bg-indigo-50 
                hover:text-indigo-800 transition duration-150 
                rounded-md cursor-pointer"
              >
                {good}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
