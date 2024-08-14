import { fetchCustomerById } from '@/app/lib/data'
import { notFound } from 'next/navigation';

import React from 'react'

const page = async ({ params }:{ params:{ id:string }}) => {
    const { id } = params 
    const customer = await fetchCustomerById(id)

    if(!customer){
      notFound()
    }

  return (
    <div>{JSON.stringify(customer)}</div>
  )
}

export default page