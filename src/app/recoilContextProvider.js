"use client";

import { RecoilRoot} from "recoil";
import React from "react";


export default function RecoidContextProvider({ children }) {
  return <RecoilRoot>
    {children}
    </RecoilRoot>;
}