import { QueryClient, useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosPublic from './useAxiosPublic';

const useOrder = () => {

    const axiosPublic = useAxiosPublic();
    const {data: orders = [], isPending : loading, refetch} = useQuery({
        queryKey: ['orders'],
        queryFn: async() => {
            const res = await axiosPublic.get('/paidusers');
            console.log('Orders', res.data)
            return res.data
        }


})
  return  [orders, loading, refetch]
}

export default useOrder