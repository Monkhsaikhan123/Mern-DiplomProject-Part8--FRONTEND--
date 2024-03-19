import { useQuery } from '@tanstack/react-query';
import React from 'react'
import useAxiosPublic from './useAxiosPublic';

const useBlog = () => {
    const axiosPublic = useAxiosPublic();
    const {data: blog = [], isPending : loading, refetch} = useQuery({
        queryKey: ['blog'],
        queryFn: async() => {
            const res = await axiosPublic.get('blog');
            console.log('blog in useBLOG', res.data)
            return res.data
        }
})
  return [blog, loading, refetch]
}

export default useBlog