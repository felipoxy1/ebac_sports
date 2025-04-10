import { useDispatch, useSelector } from 'react-redux'
import { Produto as ProdutoType } from '../../App'
import { adicionar } from '../../store/reducers/carrinho'
import { toggleFavorito } from '../../store/reducers/favoritar'

import * as S from './styles'

type Props = {
  produto: ProdutoType
  favoritar: () => void
  estaNosFavoritos: boolean
}

export const paraReal = (valor: number) =>
  new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(
    valor
  )

const ProdutoComponent = ({ produto }: Props) => {
  const dispatch = useDispatch()

  const favoritos = useSelector(
    (state: { favoritos: { itens: ProdutoType[] } }) => state.favoritos.itens
  )

  const estaNosFavoritos = favoritos.some((f) => f.id === produto.id)

  return (
    <S.Produto>
      <S.Capa>
        <img src={produto.imagem} alt={produto.nome} />
      </S.Capa>
      <S.Titulo>{produto.nome}</S.Titulo>
      <S.Prices>
        <strong>{paraReal(produto.preco)}</strong>
      </S.Prices>

      <S.BtnComprar
        onClick={() => dispatch(toggleFavorito(produto))}
        type="button"
      >
        {estaNosFavoritos
          ? '- Remover dos favoritos'
          : '+ Adicionar aos favoritos'}
      </S.BtnComprar>

      <S.BtnComprar onClick={() => dispatch(adicionar(produto))} type="button">
        Adicionar ao carrinho
      </S.BtnComprar>
    </S.Produto>
  )
}

export default ProdutoComponent
