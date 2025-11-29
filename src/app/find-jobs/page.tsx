'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Clock, MapPin, Sparkles, Zap, Briefcase } from 'lucide-react';
import { mockJobs, type Job } from '@/lib/mock-data';
import Image from 'next/image';

const GoOnlineCard = ({ onMatch }: { onMatch: (job: Job) => void }) => {
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isSearching) {
      timer = setTimeout(() => {
        const randomJob = mockJobs[Math.floor(Math.random() * mockJobs.length)];
        onMatch(randomJob);
        setIsSearching(false);
      }, 3000); // Simulate 3-second matching time
    }
    return () => clearTimeout(timer);
  }, [isSearching, onMatch]);

  return (
    <Card className="bg-gradient-to-br from-primary/20 to-background">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Zap className="w-8 h-8 text-primary" />
          <div>
            <CardTitle className="text-2xl font-headline">Mode Go Online</CardTitle>
            <CardDescription>Dapatkan pekerjaan secara otomatis dan instan.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center gap-4 text-center">
        {isSearching ? (
          <div className="flex flex-col items-center gap-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
            >
              <Sparkles className="w-16 h-16 text-primary" />
            </motion.div>
            <p className="font-semibold text-primary-foreground">Mencari pekerjaan terbaik untuk Anda...</p>
            <p className="text-sm text-muted-foreground">Harap tunggu sebentar.</p>
          </div>
        ) : (
          <>
            <p className="text-muted-foreground">Aktifkan untuk mulai menerima tawaran pekerjaan secara real-time.</p>
            <div className="flex items-center space-x-2">
              <Switch id="go-online-switch" onCheckedChange={setIsSearching} />
              <Label htmlFor="go-online-switch" className="text-lg font-medium">
                Go Online
              </Label>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};

const MatchedJobCard = ({ job, onDecline }: { job: Job; onDecline: () => void }) => (
  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
    <Card className="border-2 border-accent shadow-lg shadow-accent/20">
      <CardHeader>
        <div className="flex justify-between items-start">
            <div>
                 <Badge variant="default" className="bg-accent text-accent-foreground mb-2">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Pekerjaan Ditemukan!
                </Badge>
                <CardTitle className="font-headline">{job.title}</CardTitle>
                <CardDescription>{job.company.name}</CardDescription>
            </div>
            <Image
                src={job.company.logoUrl}
                alt={`${job.company.name} logo`}
                width={48}
                height={48}
                className="rounded-lg"
            />
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        <p className="text-lg font-semibold text-primary">Rp {job.salary.toLocaleString('id-ID')}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <MapPin className="mr-2 h-4 w-4" />
          <span>{job.location}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="mr-2 h-4 w-4" />
          <span>{job.type}</span>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="outline" onClick={onDecline}>
          Tolak
        </Button>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Terima Pekerjaan</Button>
      </CardFooter>
    </Card>
  </motion.div>
);


const JobCard = ({ job }: { job: Job }) => (
  <Card className="hover:shadow-md transition-shadow duration-300">
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
    <CardContent>
        <div className="flex flex-col space-y-2 text-sm">
             <div className="flex items-center text-primary font-semibold">
                <span>Rp {job.salary.toLocaleString('id-ID')}</span>
             </div>
             <div className="flex items-center text-muted-foreground">
                <MapPin className="mr-2 h-4 w-4" />
                <span>{job.location}</span>
            </div>
             <div className="flex items-center text-muted-foreground">
                <Clock className="mr-2 h-4 w-4" />
                <span>{job.type}</span>
            </div>
        </div>
    </CardContent>
    <CardFooter>
        <Button className="w-full bg-primary/90 hover:bg-primary text-primary-foreground">Lamar Sekarang</Button>
    </CardFooter>
  </Card>
);

export default function FindJobsPage() {
  const [matchedJob, setMatchedJob] = useState<Job | null>(null);

  return (
    <div className="flex flex-col gap-8">
      <AnimatePresence mode="wait">
        {matchedJob ? (
          <MatchedJobCard job={matchedJob} onDecline={() => setMatchedJob(null)} />
        ) : (
          <GoOnlineCard onMatch={setMatchedJob} />
        )}
      </AnimatePresence>

      <Separator />

      <div>
        <h2 className="text-2xl font-bold mb-4 font-headline flex items-center gap-2">
            <Briefcase/>
            Telusuri Pekerjaan
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </div>
    </div>
  );
}
