import { atom } from "jotai";
import { atomWithStorage } from 'jotai/utils'
import { consts } from "../Constants";


export const userAuth = atom("")

export const imageAtom = atom()

export const base64sendAtom = atom("")

export const imageVQAatom = atom(consts.bg_image)

// export const userAuth = atomWithStorage("user", "", "AsyncStorage")