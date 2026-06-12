import { data } from "@/components/admin-sidebar";
import { DataTable } from "@/components/data-table";

export default function Page() {
    return(
        <>
            <DataTable data={data}/>
        </>
    )
}