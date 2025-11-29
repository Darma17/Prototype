'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Clock, MapPin } from 'lucide-react';
import type { Job } from '@/lib/types';
import Image from 'next/image';

const AppliedJobCard = ({ job }: { job: Job }) => (
  <Card>
    <CardHeader>
      <div className="flex justify-between items-start">
        <div>
          <CardTitle className="font-headline text-lg">{job.title}</CardTitle>
          <CardDescription>{job.company.name}</CardDescription>
        </div>
        <Image
          src={job.company.logoUrl}
          alt={`${job.company.name} logo`}
          width={40}
          height={40}
          className="rounded-md"
        />
      </div>
    </CardHeader>
    <CardContent className="space-y-3">
       <div className="flex items-center text-primary font-semibold">
          <span>Rp {job.salary.toLocaleString('id-ID')}</span>
       </div>
       <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{job.location}</span>
        </div>
         <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="mr-2 h-4 w-4" />
            <span>{job.type}</span>
        </div>
        <Badge>Diterima</Badge>
    </CardContent>
  </Card>
);

export default function AppliedJobsPage() {
  const [appliedJobs, setAppliedJobs] = useState<Job[]>([]);

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]');
    setAppliedJobs(jobs);
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h2 className="text-2xl font-bold mb-4 font-headline flex items-center gap-2">
          <Briefcase />
          Pekerjaan Saya
        </h2>
        <p className="text-muted-foreground mb-6">
          Berikut adalah daftar pekerjaan yang telah Anda terima.
        </p>
        {appliedJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {appliedJobs.map((job) => (
                <AppliedJobCard key={job.id} job={job} />
            ))}
            </div>
        ) : (
            <p className="text-center text-muted-foreground mt-10">Anda belum menerima pekerjaan apapun.</p>
        )}
      </div>
    </div>
  );
}
