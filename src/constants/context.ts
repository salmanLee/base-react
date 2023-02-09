import React, { Context } from 'react';

let BmContext: Context<any> | undefined = undefined;

export function getBmContext() {
  if (BmContext) return BmContext;
  else {
    BmContext = React.createContext(undefined);
    return BmContext;
  }
}
