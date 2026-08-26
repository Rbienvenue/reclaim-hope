"use client";

import {
  MoreVertical,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CreateChildDialog } from "./create-child";
import useSWR from "swr";
import DeleteChildDialog from "./delete-child-dialog";
import { UpdateChildDialog } from "./update-child";

export default function DataTable() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());
  const getAge = (dateOfBirth: string) => {
    if (!dateOfBirth) return "N/A";
    const birthDate = new Date(dateOfBirth);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return Math.max(0, age);
  };
  const { data, error, isLoading: isFetching } = useSWR('/api/children', fetcher);

  return (
    <div className="space-y-4 mx-auto px-4 max-w-7xl sm:px-6 lg:px-8">
      {/* Top Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Manage Children</h2>
          <p className="text-sm text-gray-500">Track registered children and sponsorship availability</p>
        </div>
        <CreateChildDialog />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/75">
              <TableHead className="font-semibold text-gray-700">Full Name</TableHead>
              <TableHead className="font-semibold text-gray-700">Age</TableHead>
              <TableHead className="font-semibold text-gray-700">Dream</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Active Sponsor</TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isFetching ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  Loading children data...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-red-500">
                  Error loading children.
                </TableCell>
              </TableRow>
            ) : !data || data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  No children registered yet. Click &quot;Create Child&quot; to add one.
                </TableCell>
              </TableRow>
            ) : (
              data.map((child: any) => (
                <TableRow key={child.id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-900">
                    {child.firstName} {child.lastName}
                  </TableCell>
                  <TableCell className="text-gray-600">{getAge(child.dateOfBirth)} yrs</TableCell>
                  <TableCell className="text-gray-600">{child.dream}</TableCell>
                  <TableCell>
                    {child.isSponsored || child.sponsorshipStatus === "Sponsored" ? (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 font-medium">
                        Sponsored
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 font-medium">
                        Available
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600 font-medium">
                    {child.sponsorName || "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-gray-100">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36">
                        <UpdateChildDialog child={child} />
                        <DeleteChildDialog id={child.id} />
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}