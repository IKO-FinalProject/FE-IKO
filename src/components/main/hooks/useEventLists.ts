import { AxiosResponse } from 'axios'
import { useQuery, useQueryClient } from 'react-query'
import { axiosInstance } from '../../axiosinstance'
import useToast from '../../common/toast/hooks/useToast'
import { queryKeys } from '../../react-query/queryKeys'

export interface EventDetailResponseType {
  eventTitle: number
  description: string
  startTime: string
  endTime: string
  imageUrl: string
}
export interface InEventMainList {
  eventId: number
  eventTitle: string
  imageUrl: string
}

export interface EventResponseType {
  data: {
    eventMainList: InEventMainList[]
    totalCount: number
  }
  status: number
  message: string
}

export const getEvents = async (): Promise<EventResponseType> => {
  const { data }: AxiosResponse<EventResponseType> = await axiosInstance({
    url: '/event/main',
    // url: 'https://633010e5591935f3c8893690.mockapi.io/lenssis/api/v1/event'
    headers: {
      ContentType: 'application/json'
    }
  })

  return data
}
export const useGetEvent = () => {
  const { fireToast } = useToast()
  const { data, isFetching } = useQuery([queryKeys.allEvent], () => getEvents(), {
    refetchOnWindowFocus: false,
    staleTime: 900000,
    onError: () => {
      fireToast({
        id: 'getEventFailed',
        message: '이벤트 불러오는데 실패하였습니다. 다시 시도해주세요.',
        position: 'bottom',
        timer: 2000,
        type: 'failed'
      })
    }
  })
  return { data, isFetching }
}
// export const prefetchEvent = () => {
//   const queryClient = useQueryClient()
//   const maxPage = Math.floor(count / 10)
// }

const detailEvent = async (id: number): Promise<EventDetailResponseType[]> => {
  const {
    data: { data }
  } = await axiosInstance({
    url: `/event/details?eventId=${id}`
  })
  return data
}
export const useGetDetailEvent = (id: number) => {
  const { fireToast } = useToast()
  const fallback: [] = []
  const { data = fallback, isFetching } = useQuery([queryKeys.event, id], () => detailEvent(id), {
    refetchOnWindowFocus: false,
    onError: () => {
      fireToast({
        id: 'getDetailEventFailed',
        message: '이벤트 상세정보를 가져오는데 실패했습니다. 다시 시도해주세요.',
        position: 'bottom',
        timer: 2000,
        type: 'failed'
      })
    }
  })
  return { data, isFetching }
}
