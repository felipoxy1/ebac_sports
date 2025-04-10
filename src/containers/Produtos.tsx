import { useDispatch, useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../App'
import Produto from '../components/Produto'
import { useGetProdutosQuery } from '../services/api'

import * as S from './styles'
import { toggleFavorito } from '../store/reducers/favoritar'

const ProdutosComponent = () => {
  const dispatch = useDispatch()
  const { data: produtos, isLoading } = useGetProdutosQuery()

  const favoritos = useSelector(
    (state: { favoritos: { itens: ProdutoType[] } }) => state.favoritos.itens
  )

  const produtoEstaNosFavoritos = (produto: ProdutoType) => {
    return favoritos.some((f) => f.id === produto.id)
  }

  const favoritar = (produto: ProdutoType) => {
    dispatch(toggleFavorito(produto))
  }

  return (
    <>
      <S.Produtos>
        {produtos?.map((produto) => (
          <Produto
            estaNosFavoritos={produtoEstaNosFavoritos(produto)}
            key={produto.id}
            produto={produto}
            favoritar={() => favoritar(produto)}
          />
        ))}
      </S.Produtos>
    </>
  )
}

export default ProdutosComponent
