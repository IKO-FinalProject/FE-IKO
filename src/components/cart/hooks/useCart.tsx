import { getStoredToken } from '../../local-storage/userStorage'
import { getJWTToken } from '../../axiosinstance/index'

import { AxiosResponse } from 'axios'
import React from 'react'
import { useQuery, useQueryClient } from 'react-query'
import { axiosInstance } from '../../axiosinstance'
import { queryKeys } from '../../react-query/queryKeys'

export interface CartItemsType {
  cartId: number
  color: string
  colorCode: string
  degree: number
  discount: number
  graphicDiameter: number
  imageUrl: string
  name: string
  period: number
  price: number
  productDetailsId: number
  stock: number
  pcs: number
}

const getCartItems = async (): Promise<CartItemsType[]> => {
  const { data } = await axiosInstance.get<AxiosResponse<CartItemsType[]>>('/cart/list')
  return data.data
}

const useCart = () => {
  const fallback: CartItemsType[] = []
  const queryClient = useQueryClient()
  const { data: cartItems = fallback } = useQuery(queryKeys.cart, () => getCartItems(), {})

  return { cartItems }
}

const token = getStoredToken()
export const addCart = async (id: number) => {
  await axiosInstance({
    url: `/cart/add`,
    method: 'POST',
    headers: getJWTToken(token),
    data: {
      productDetailsId: id
    }
  })
}

export default useCart
