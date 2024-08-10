import CustomersTable from "@/app/ui/customers/table";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import { Suspense } from "react";

type SearchParams = {
    query?: string;
    page?:string;
}

export default function Page({ searchParams }: { searchParams: SearchParams}) {
    const query = searchParams.query || '';
    return <Suspense fallback={<InvoicesTableSkeleton/>}>
        <CustomersTable query={query}/>
    </Suspense>
}