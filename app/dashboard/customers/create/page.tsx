import Form from '@/app/ui/customers/create-form'
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'

const page = () => {
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customer',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>  )
}

export default page