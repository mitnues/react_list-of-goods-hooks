import React, { useState, useMemo } from 'react';

// === ESTILOS INLINE (Substituindo as importações que falharam) ===
// Usamos classes Tailwind e Bulma para o design.

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

// 1. Definição do Enum para os tipos de ordenação
enum SortType {
  Initial = 'INITIAL',
  Alphabetical = 'ALPHABETICAL',
  Length = 'LENGTH',
  Reversed = 'REVERSED',
}

// O componente principal, tipado como React.FC
export const App: React.FC = () => {
  // 2. Estado único para rastrear o tipo de ordenação atual
  const [currentSortType, setCurrentSortType] = useState<SortType>(
    SortType.Initial,
  );

  // Manipulador genérico para mudar o tipo de ordenação
  const handleSort = (type: SortType) => {
    setCurrentSortType(type);
  };

  // 3. useMemo para calcular a lista ordenada apenas quando o tipo de ordenação muda
  const sortedGoods = useMemo(() => {
    // Começa sempre com uma cópia da lista inicial como base
    const list = [...initialGoods];

    if (currentSortType === SortType.Alphabetical) {
      // Ordenação Alfabética: localeCompare para segurança
      list.sort((a, b) => a.localeCompare(b));
    } else if (currentSortType === SortType.Length) {
      // Ordenação por Comprimento
      list.sort((a, b) => a.length - b.length);
    } else if (currentSortType === SortType.Reversed) {
      // Reverte a ordem inicial (se o objetivo fosse reverter o último estado,
      // a lógica seria mais complexa, mas para este exercício, reverte a base.)
      list.reverse();
    }
    // Se SortType.Initial, a lista é retornada sem alterações (list = initialGoods)

    return list;
  }, [currentSortType]); // Dependência: só recalcula se currentSortType mudar

  // O botão Reset é ativo apenas se o estado atual NÃO for o Initial
  const isResetDisabled = currentSortType === SortType.Initial;

  // Função auxiliar para construir classes (incluindo 'is-active')
  const getButtonClass = (type: SortType, baseClass: string) => {
    const isActive = currentSortType === type;

    return `${baseClass} ${isActive ? 'is-active shadow-xl' : 'is-light shadow-md'}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 font-sans">
      <script src="https://cdn.tailwindcss.com"></script>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bulma@0.9.3/css/bulma.min.css"
      />

      <div className="section content container mx-auto max-w-lg">
        <h1 className="title is-4 has-text-centered text-gray-800">
          Goods List Manager (Stateful Sorting)
        </h1>

        {/* Botões de Ação */}
        <div
          className="buttons is-centered mb-6 space-y-2 
        sm:space-y-0 sm:space-x-2 flex flex-col sm:flex-row"
        >
          <button
            type="button"
            className={getButtonClass(
              SortType.Alphabetical,
              'button  hover:shadow-lg rounded-lg',
            )}
            onClick={() => handleSort(SortType.Alphabetical)}
          >
            Sort Alphabetically
          </button>

          <button
            type="button"
            className={getButtonClass(
              SortType.Length,
              'button hover:shadow-lg rounded-lg',
            )}
            onClick={() => handleSort(SortType.Length)}
          >
            Sort by Length
          </button>

          <button
            type="button"
            className={getButtonClass(
              SortType.Reversed,
              'button hover:shadow-lg rounded-lg',
            )}
            onClick={() => handleSort(SortType.Reversed)}
          >
            Reverse (Initial List)
          </button>

          <button
            type="button"
            className="button is-danger is-medium shadow-md 
            transition duration-300 hover:shadow-lg rounded-lg 
            disabled:opacity-50"
            onClick={() => handleSort(SortType.Initial)}
            disabled={isResetDisabled}
          >
            Reset
          </button>
        </div>

        {/* Exibição da Lista */}
        <div className="box p-5 bg-white shadow-xl rounded-xl">
          <p
            className="subtitle is-6 
          has-text-weight-semibold mb-4 
          border-b pb-2 text-gray-700"
          >
            Current List (
            <span className="has-text-info">{sortedGoods.length}</span> items):
          </p>

          <ul className="divide-y divide-gray-200">
            {sortedGoods.map(good => (
              <li
                key={good}
                data-cy="Good"
                className="py-3 px-4 text-lg text-gray-800 
                hover:bg-indigo-50 hover:text-indigo-800 
                transition duration-150 rounded-md cursor-pointer"
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
