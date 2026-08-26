'use client';

import useSWR, { mutate } from 'swr';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Heart,
  UserCheck,
  Clock,
  CheckCircle2,
  DollarSign,
  AlertCircle,
  Sparkles,
} from 'lucide-react';
import { verifyPaymentAction } from '@/app/actions/sponsorship';
import { toast } from 'sonner';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function SponsorsTable() {
  const { data: sponsorships, error, isLoading } = useSWR('/api/sponsorships', fetcher);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const handleVerifyPending = async (paymentId?: string) => {
    if (!paymentId) {
      toast.error('No payment record associated with this sponsorship.');
      return;
    }
    try {
      setProcessingId(paymentId);
      const res = await verifyPaymentAction(paymentId);
      if (res.success) {
        toast.success('Payment verified and sponsorship marked ACTIVE!');
        mutate('/api/sponsorships');
        mutate('/api/children');
      } else {
        toast.error(res.error || 'Failed to verify payment.');
      }
    } catch (err: any) {
      toast.error(err.message || 'An error occurred.');
    } finally {
      setProcessingId(null);
    }
  };

  const totalActive = sponsorships?.filter((s: any) => s.status === 'ACTIVE').length || 0;
  const totalPending = sponsorships?.filter((s: any) => s.status === 'PENDING').length || 0;
  const totalRevenue = sponsorships
    ?.filter((s: any) => s.status === 'ACTIVE')
    ?.reduce((sum: number, s: any) => sum + Number(s.amount), 0) || 0;

  return (
    <div className="space-y-6 mx-auto px-4 max-w-7xl sm:px-6 lg:px-8 py-6">
      {/* Top Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Manage Sponsors &amp; Sponsorships</h2>
        <p className="text-sm text-gray-500">
          Track donor sponsorships, billing frequency, and pending payment gateway records.
        </p>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-emerald-700">
              Active Sponsors
            </p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{totalActive}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <UserCheck className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Pending Sponsorships
            </p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">{totalPending}</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-yellow-700">
              Active Commitment Vol.
            </p>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-1">${totalRevenue.toLocaleString()} USD</h3>
          </div>
          <div className="w-12 h-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Sponsorship Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm w-full">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/75">
              <TableHead className="font-semibold text-gray-700">Donor</TableHead>
              <TableHead className="font-semibold text-gray-700">Sponsored Child</TableHead>
              <TableHead className="font-semibold text-gray-700">Plan / Frequency</TableHead>
              <TableHead className="font-semibold text-gray-700">Status</TableHead>
              <TableHead className="font-semibold text-gray-700">Payment Ref</TableHead>
              <TableHead className="font-semibold text-gray-700">Date Created</TableHead>
              <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  Loading sponsorships data...
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-red-500">
                  Failed to load sponsorships.
                </TableCell>
              </TableRow>
            ) : !sponsorships || sponsorships.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No sponsorships created yet.
                </TableCell>
              </TableRow>
            ) : (
              sponsorships.map((s: any) => (
                <TableRow key={s.id} className="hover:bg-gray-50/50">
                  <TableCell>
                    <div className="font-medium text-gray-900">{s.donor.name}</div>
                    <div className="text-xs text-gray-500">{s.donor.email}</div>
                  </TableCell>

                  <TableCell className="font-medium text-gray-900">
                    {s.child.name}
                  </TableCell>

                  <TableCell>
                    <div className="font-semibold text-gray-900">
                      ${s.amount} {s.currency}
                    </div>
                    <div className="text-xs text-gray-500 capitalize">
                      {s.frequency.toLowerCase()}
                    </div>
                  </TableCell>

                  <TableCell>
                    {s.status === 'ACTIVE' ? (
                      <Badge className="bg-emerald-100 text-emerald-800 border-emerald-200 font-medium">
                        Active
                      </Badge>
                    ) : s.status === 'PENDING' ? (
                      <Badge variant="outline" className="bg-amber-50 text-amber-800 border-amber-200 font-medium">
                        Pending Payment
                      </Badge>
                    ) : (
                      <Badge variant="secondary">{s.status}</Badge>
                    )}
                  </TableCell>

                  <TableCell>
                    {s.latestPayment ? (
                      <div>
                        <div className="font-mono text-xs text-gray-800 font-semibold">
                          {s.latestPayment.reference}
                        </div>
                        <div className="text-[11px] text-gray-500">
                          Status: {s.latestPayment.status}
                        </div>
                      </div>
                    ) : (
                      <span className="text-gray-400 text-xs">—</span>
                    )}
                  </TableCell>

                  <TableCell className="text-xs text-gray-500">
                    {new Date(s.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell className="text-right">
                    {s.status === 'PENDING' && s.latestPayment && (
                      <Button
                        size="sm"
                        onClick={() => handleVerifyPending(s.latestPayment?.id)}
                        disabled={processingId === s.latestPayment?.id}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs rounded-lg px-3 py-1 font-semibold h-8"
                      >
                        {processingId === s.latestPayment?.id ? 'Activating...' : 'Verify & Activate'}
                      </Button>
                    )}
                    {s.status === 'ACTIVE' && (
                      <span className="text-xs text-emerald-700 font-semibold inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Active
                      </span>
                    )}
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
