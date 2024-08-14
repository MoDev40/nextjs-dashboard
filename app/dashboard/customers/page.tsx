import { CreateCustomer } from "@/app/ui/customers/buttons";
import CustomersTable from "@/app/ui/customers/table";
import { lusitana } from "@/app/ui/fonts";
import Search from "@/app/ui/search";
import { CustomersTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

type SearchParams = {
  query?: string;
  page?: string;
};

export default function Page({ searchParams }: { searchParams: SearchParams }) {
  const query = searchParams.query || "";
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateCustomer />
      </div>
      <Suspense fallback={<CustomersTableSkeleton />}>
        <CustomersTable query={query} />
      </Suspense>
    </div>
  );
}
