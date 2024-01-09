"use-client"
import { atom, AtomEffect } from "recoil"

const store = typeof window !== "undefined" ? window.localStorage : null

export const localStorageEffect = key => ({setSelf, onSet}) => {
    if(store) {
        const savedValue = store.getItem(key)
        if (savedValue != null) {
          setSelf(JSON.parse(savedValue));
        }
    }
  
    onSet((newValue, _, isReset) => {
      isReset
        ? store.removeItem(key)
        : store.setItem(key, JSON.stringify(newValue));
    });
  };

export const rchainId = atom({
    key:'rchainId',
    default: 421614,
    effects: [
        localStorageEffect('chainId'),
      ]
})

export const risLoading = atom({
    key:'risLoading',
    default: false
})

export const risLoadingContainer = atom({
    key:'risLoadingContainer',
    default: true
})

export const risFilterChanged = atom({
    key:'risFilterChanged',
    default: true
})

