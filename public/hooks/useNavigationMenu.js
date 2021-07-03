import React from "react";
import useGlobalHook from "./useGlobalHook";

const initialState = {
  isOpened: false,
};

const actions = {
  toggle: (store) => {
    store.setState({ isOpened: !store.state.isOpened });
  },
  update: (store, isOpened) => {
    store.setState({ isOpened });
  },
};

const useNavigationMenu = useGlobalHook(React, initialState, actions);

export default useNavigationMenu;
