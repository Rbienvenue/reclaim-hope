"use client";

import {
  CheckCircle2,
  MoreVertical,
  Plus,
  Columns,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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

const data = [
  {
    id: 1,
    header: "Hero Section",
    type: "Landing Page",
    status: "Done",
    target: "100",
    limit: "50",
    reviewer: "John Doe",
  },
  {
    id: 2,
    header: "About Section",
    type: "Content",
    status: "In Progress",
    target: "80",
    limit: "40",
    reviewer: "Jane Smith",
  },
];

export default function DataTable() {
  return (
    <div className="space-y-4">
      {/* Top Actions */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Website Sections</h2>

        <div className="flex gap-2">
          <Button variant="outline">
            <Columns />
            Columns
          </Button>

          <Button>
            <Plus />
            Add Section
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Header</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Target</TableHead>
              <TableHead>Limit</TableHead>
              <TableHead>Reviewer</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {item.header}
                </TableCell>

                <TableCell>
                  <Badge variant="outline">
                    {item.type}
                  </Badge>
                </TableCell>

                <TableCell>
                  <Badge
                    variant="outline"
                    className="flex w-fit items-center gap-1"
                  >
                    <CheckCircle2 className="size-4 text-green-500" />
                    {item.status}
                  </Badge>
                </TableCell>

                <TableCell>{item.target}</TableCell>

                <TableCell>{item.limit}</TableCell>

                <TableCell>{item.reviewer}</TableCell>

                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                      >
                        <MoreVertical />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuItem>View</DropdownMenuItem>

                      <DropdownMenuSeparator />

                      <DropdownMenuItem>
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}