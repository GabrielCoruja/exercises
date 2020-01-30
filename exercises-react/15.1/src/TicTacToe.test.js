import React from 'react';
import {render, cleanup, fireEvent} from '@testing-library/react';
import TicTacToe from './TicTacToe';

afterEach(cleanup);

describe("gameboard's starting status", () => {
  test('renders nine game cells', () => {
    const {getByTestId} = render(<TicTacToe />);

    for (let i = 0; i <= 8; i++) {
      expect(getByTestId(`cell_${i}`)).toBeDefined();
    }
  });

  test('renders game board, at first, without any symbols', () => {
    const {queryByAltText} = render(<TicTacToe />);
    expect(queryByAltText('X')).toBeNull();
    expect(queryByAltText('O')).toBeNull();
  });

  test("renders no 'Fim de Jogo' message at game's start", () => {
    const {queryByText} = render(<TicTacToe />);

    expect(queryByText('Fim de Jogo')).toBeNull();
  });
});

describe("gamecell's behaviour", () => {
  test('clicking a game cell creates a symbol in it and nowhere else', () => {
    const {getByTestId, getAllByAltText, queryByAltText} = render(<TicTacToe />);

    fireEvent.click(getByTestId('cell_0'));
    expect(getAllByAltText('X')).toHaveLength(1);
    expect(queryByAltText('O')).toBeNull();

    fireEvent.click(getByTestId('cell_1'));
    expect(getAllByAltText('X')).toHaveLength(1);
    expect(getAllByAltText('O')).toHaveLength(1);

    fireEvent.click(getByTestId('cell_2'));
    expect(getAllByAltText('X')).toHaveLength(2);
    expect(getAllByAltText('O')).toHaveLength(1);
  });

  test("toggles symbols when clicking the cells starting by 'X'", () => {
    const {getByTestId, getByAltText, getAllByAltText, queryByTestId} = render(
      <TicTacToe />,
    );

    fireEvent.click(getByTestId('cell_0'));
    expect(getByAltText('X')).toBeDefined();

    fireEvent.click(getByTestId('cell_1'));
    expect(getByAltText('O')).toBeDefined();

    fireEvent.click(getByTestId('cell_2'));
    expect(queryByTestId('cell_2_image')).toBeDefined();
    expect(getAllByAltText('X')).toHaveLength(2);
  });

  test("doesn't toggle symbols when clicking cells already filled", () => {
    const {getByTestId, getByAltText, queryByAltText} = render(<TicTacToe />);

    fireEvent.click(getByTestId('cell_0'));
    expect(getByAltText('X')).toBeDefined();

    fireEvent.click(getByTestId('cell_0'));
    fireEvent.click(getByTestId('cell_2'));
    expect(queryByAltText('O')).not.toBeNull();
  });

  test("doesn't alter older symbols when clicking on new cells", () => {
    const {getByTestId, getByAltText, getAllByAltText} = render(<TicTacToe />);

    fireEvent.click(getByTestId('cell_0'));
    const cellZeroImage = getByTestId('cell_0_image');
    expect(cellZeroImage).toEqual(getByAltText('X'));

    fireEvent.click(getByTestId('cell_1'));
    const cellOneImage = getByTestId('cell_1_image');
    expect(cellZeroImage).toEqual(getByAltText('X'));
    expect(cellOneImage).toEqual(getByAltText('O'));

    fireEvent.click(getByTestId('cell_2'));
    const cellTwoImage = getByTestId('cell_2_image');
    expect(cellZeroImage).toEqual(getAllByAltText('X')[0]);
    expect(cellOneImage).toEqual(getByAltText('O'));
    expect(cellTwoImage).toEqual(getAllByAltText('X')[1]);
  });

  test("doesn't change a cell's symbol if it's clicked twice", () => {
    const {getByTestId, getByAltText, queryByAltText} = render(<TicTacToe />);

    fireEvent.click(getByTestId('cell_0'));
    const cellZeroImage = getByTestId('cell_0_image');
    expect(cellZeroImage).toEqual(getByAltText('X'));

    fireEvent.click(getByTestId('cell_0'));
    expect(cellZeroImage).toEqual(queryByAltText('X'));
  });
});

const winnerSymbols = ['X', 'O'];

winnerSymbols.map(winnerSymbol => {
  describe(`victory conditions for player ${winnerSymbol}`, () => {
    const getStartOfAnotherLine = cellId => {
      if (cellId >= 0 && cellId <= 2) return 3;
      else if (cellId >= 3 && cellId <= 5) return 6;
      return 0;
    };

    const firstCellsOfLines = [0, 3, 6];
    firstCellsOfLines.map(cellId => {
      test(`same symbols in a line archive victory starting at cell ${cellId}`, () => {
        const opponentsLine = getStartOfAnotherLine(cellId);
        const {getByTestId, queryByText} = render(<TicTacToe />);

        if (winnerSymbol === 'O') {
          const cellNotRelatedToVictory = getStartOfAnotherLine(opponentsLine);
          fireEvent.click(getByTestId(`cell_${cellNotRelatedToVictory}`));
        }

        fireEvent.click(getByTestId(`cell_${cellId}`));
        fireEvent.click(getByTestId(`cell_${opponentsLine}`));
        fireEvent.click(getByTestId(`cell_${cellId + 1}`));
        fireEvent.click(getByTestId(`cell_${opponentsLine + 1}`));
        fireEvent.click(getByTestId(`cell_${cellId + 2}`));
        expect(queryByText('Fim de Jogo')).not.toBeNull();
      });

      return undefined;
    });

    const getStartOfAnotherColumn = cellId => {
      if (cellId === 0 || cellId === 3 || cellId === 6) return 1;
      else if (cellId === 1 || cellId === 4 || cellId === 7) return 2;
      return 0;
    };

    const firstCellsOfColumns = [0, 1, 2];
    firstCellsOfColumns.map(cellId => {
      test(`same symbols in a column archive victory starting at column ${cellId}`, () => {
        const opponentsColumn = getStartOfAnotherColumn(cellId);
        const {getByTestId, queryByText} = render(<TicTacToe />);

        if (winnerSymbol === 'O') {
          const cellNotRelatedToVictory = getStartOfAnotherColumn(opponentsColumn);
          fireEvent.click(getByTestId(`cell_${cellNotRelatedToVictory}`));
        }

        fireEvent.click(getByTestId(`cell_${cellId}`));
        fireEvent.click(getByTestId(`cell_${opponentsColumn}`));
        fireEvent.click(getByTestId(`cell_${cellId + 3}`));
        fireEvent.click(getByTestId(`cell_${opponentsColumn + 3}`));
        fireEvent.click(getByTestId(`cell_${cellId + 6}`));
        expect(queryByText('Fim de Jogo')).not.toBeNull();
      });

      return undefined;
    });

    test('same symbols on left to right diagonal archive victory', () => {
      const {getByTestId, queryByText} = render(<TicTacToe />);

      if (winnerSymbol === 'O') fireEvent.click(getByTestId('cell_5'));
      fireEvent.click(getByTestId('cell_0'));
      fireEvent.click(getByTestId('cell_2'));
      fireEvent.click(getByTestId('cell_4'));
      fireEvent.click(getByTestId('cell_3'));
      fireEvent.click(getByTestId('cell_8'));
      expect(queryByText('Fim de Jogo')).not.toBeNull();
    });

    test('same symbols on right to left diagonal archive victory', () => {
      const {getByTestId, queryByText} = render(<TicTacToe />);

      if (winnerSymbol === 'O') fireEvent.click(getByTestId('cell_8'));
      fireEvent.click(getByTestId('cell_2'));
      fireEvent.click(getByTestId('cell_0'));
      fireEvent.click(getByTestId('cell_4'));
      fireEvent.click(getByTestId('cell_3'));
      fireEvent.click(getByTestId('cell_6'));
      expect(queryByText('Fim de Jogo')).not.toBeNull();
    });
  });
  return undefined;
});
