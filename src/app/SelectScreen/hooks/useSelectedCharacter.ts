import { useReducer } from 'react';
import { Character, CharacterColor } from '../model';

enum ActionName {
  HIGHLIGHT_CHARACTER,
  CHANGE_CHARACTER_COLOR,
  CHANGE_SELECTION_STATE
}

enum SelectionState {
  SelectingCharacter,
  SelectingColor,
  ConfirmingCharacter
}

type Action =
  | { type: ActionName.HIGHLIGHT_CHARACTER; character?: Character }
  | { type: ActionName.CHANGE_CHARACTER_COLOR; color: CharacterColor }
  | { type: ActionName.CHANGE_SELECTION_STATE; selectionState: SelectionState };

type Dispatcher = (value: Action) => void;

interface State {
  hightlightedCharacter?: Character;
  selectedCharacterColor?: CharacterColor;
  selectionState: SelectionState;
}

const initialState: State = {
  selectionState: SelectionState.SelectingCharacter
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionName.HIGHLIGHT_CHARACTER:
      return {
        ...state,
        hightlightedCharacter: action.character,
        selectedCharacterColor: CharacterColor.Color1
      };
    case ActionName.CHANGE_CHARACTER_COLOR:
      return {
        ...state,
        selectedCharacterColor: action.color
      };
    case ActionName.CHANGE_SELECTION_STATE:
      return {
        ...state,
        selectionState: action.selectionState,
        hightlightedCharacter:
          action.selectionState === SelectionState.SelectingCharacter ? undefined : state.hightlightedCharacter
      };
    default:
      throw new Error();
  }
};

const hightlightCharacter = (dispatch: Dispatcher) => (character?: Character) =>
  dispatch({ type: ActionName.HIGHLIGHT_CHARACTER, character });

const selectCharacterColor = (dispatch: Dispatcher) => (color?: CharacterColor) =>
  dispatch({ type: ActionName.CHANGE_CHARACTER_COLOR, color });

const toggleConfirming = (dispatch: Dispatcher) => (isConfirming: boolean) =>
  dispatch({
    type: ActionName.CHANGE_SELECTION_STATE,
    selectionState: isConfirming ? SelectionState.ConfirmingCharacter : SelectionState.SelectingCharacter
  });

const toggleColorSelection = (dispatch: Dispatcher) => (isSelectingColor: boolean) =>
  dispatch({
    type: ActionName.CHANGE_SELECTION_STATE,
    selectionState: isSelectingColor ? SelectionState.SelectingColor : SelectionState.ConfirmingCharacter
  });

export const useSelectedCharacter = () => {
  const [{ hightlightedCharacter, selectedCharacterColor, selectionState }, dispatch] = useReducer(
    reducer,
    initialState
  );
  return {
    state: {
      hightlightedCharacter,
      selectedCharacterColor,
      isSelectingCharacter: selectionState === SelectionState.SelectingCharacter,
      isConfirming: selectionState === SelectionState.ConfirmingCharacter,
      isSelectingColor: selectionState === SelectionState.SelectingColor
    },
    actions: {
      hightlightCharacter: hightlightCharacter(dispatch),
      selectCharacterColor: selectCharacterColor(dispatch),
      toggleConfirming: toggleConfirming(dispatch),
      toggleColorSelection: toggleColorSelection(dispatch)
    }
  };
};
