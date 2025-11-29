
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Briefcase, CheckCircle, Users, Wallet, Activity } from 'lucide-react';
import Link from 'next/link';

const seekerStats = [
  { title: 'Pekerjaan Selesai', value: '12', icon: CheckCircle },
  { title: 'Penghasilan Bulan Ini', value: 'Rp 2.5jt', icon: Wallet },
  { title: 'Tingkat Penyelesaian', value: '95%', icon: Activity },
];

const employerStats = [
  { title: 'Lowongan Aktif', value: '3', icon: Briefcase },
  { title: 'Kandidat Diterima', value: '8', icon: Users },
  { title: 'Total Pembayaran', value: 'Rp 8.7jt', icon: Wallet },
];

const recentActivities = {
  seeker: [
    { title: 'Waiter di Restoran Padang', status: 'Selesai', pay: 'Rp 150.000' },
    { title: 'Kurir Paket', status: 'Aktif', pay: 'Rp 200.000' },
    { title: 'Barista di Coffee Shop', status: 'Selesai', pay: 'Rp 180.000' },
  ],
  employer: [
    { title: 'Kasir Toko Retail', applicants: 15, status: 'Aktif' },
    { title: 'Staff Gudang', applicants: 8, status: 'Ditutup' },
    { title: 'Pengemudi Pengiriman', applicants: 22, status: 'Aktif' },
  ],
};

export default function DashboardPage() {
  const [isEmployer, setIsEmployer] = useState(false);

  const stats = isEmployer ? employerStats : seekerStats;
  const activities = isEmployer ? recentActivities.employer : recentActivities.seeker;
  const userType = isEmployer ? 'Pelaku Usaha' : 'Pencari Kerja';

  return (
    <div className="flex flex-col gap-8">
      <Card className="bg-card/80 backdrop-blur-sm">
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-2xl font-headline">Selamat Datang di Dashboard!</CardTitle>
              <CardDescription>Mode Saat Ini: {userType}</CardDescription>
            </div>
            <div className="mt-4 flex items-center space-x-2 sm:mt-0">
              <Label htmlFor="user-type-switch">Pencari Kerja</Label>
              <Switch id="user-type-switch" checked={isEmployer} onCheckedChange={setIsEmployer} aria-label="Toggle user type" />
              <Label htmlFor="user-type-switch">Pelaku Usaha</Label>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            {isEmployer
              ? 'Kelola lowongan pekerjaan Anda dan temukan kandidat terbaik dengan cepat.'
              : 'Temukan pekerjaan harian, mingguan, atau bulanan yang sesuai dengan keahlian Anda.'}
          </p>
          <div className="mt-6">
            {isEmployer ? (
              <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Link href="/my-jobs">Buat Lowongan Baru</Link>
              </Button>
            ) : (
              <Button asChild className="bg-accent hover:bg-accent/90 text-accent-foreground">
                <Link href="/find-jobs">Mulai Cari Pekerjaan</Link>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <section>
        <h2 className="mb-4 text-xl font-semibold font-headline">Ringkasan Anda</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold font-headline">Aktivitas Terbaru</h2>
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-semibold">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {isEmployer ? `${activity.applicants} Pelamar` : `Pembayaran: ${activity.pay}`}
                    </p>
                  </div>
                  <div
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      activity.status === 'Aktif' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {activity.status}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
