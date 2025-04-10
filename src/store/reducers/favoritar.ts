import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Produto } from '../../App'

type FavoritosState = {
  itens: Produto[]
}

const initialState: FavoritosState = {
  itens: []
}

const favoritosSlice = createSlice({
  name: 'Favoritos',
  initialState,
  reducers: {
    toggleFavorito: (state, action: PayloadAction<Produto>) => {
      const produto = action.payload
      const jaExiste = state.itens.find((p) => p.id === produto.id)

      if (jaExiste) {
        state.itens = state.itens.filter((p) => p.id !== produto.id)
      } else {
        state.itens.push(produto)
      }
    }
  }
})

export const { toggleFavorito } = favoritosSlice.actions
export default favoritosSlice.reducer
