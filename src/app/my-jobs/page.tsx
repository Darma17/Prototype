'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, Users, Bot, UserCheck, Clock, Briefcase } from 'lucide-react';
import { mockJobs, type Job, type User } from '@/lib/mock-data';
import { recommendCandidates } from '@/ai/flows/recommendCandidates';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';


const CandidateCard = ({ user }: { user: User }) => (
  <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/50">
    <div className="flex items-center gap-3">
      <Image src={user.avatarUrl} alt={user.name} width={40} height={40} className="rounded-full" />
      <div>
        <p className="font-semibold">{user.name}</p>
        <p className="text-sm text-muted-foreground">{user.skills.slice(0, 3).join(', ')}</p>
      </div>
    </div>
    <Button size="sm" variant="outline">Lihat Profil</Button>
  </div>
);

const AIRecommendations = ({ job }: { job: Job }) => {
    const [recommendations, setRecommendations] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchRecommendations = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await recommendCandidates(job);
            setRecommendations(result);
        } catch (e) {
            setError('Gagal memuat rekomendasi.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <AccordionItem value={`item-${job.id}`}>
        <AccordionTrigger className="hover:no-underline">
           <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <Bot className="w-6 h-6 text-primary"/>
                </div>
                <div>
                    <h4 className="font-semibold text-left">Rekomendasi Kandidat AI</h4>
                    <p className="text-sm text-muted-foreground text-left">Ditenagai oleh AI untuk menemukan kandidat terbaik</p>
                </div>
           </div>
        </AccordionTrigger>
        <AccordionContent>
            <div className="p-4 bg-background rounded-b-lg">
                {isLoading ? (
                    <div className="space-y-3">
                        {[...Array(3)].map((_, i) => (
                           <div key={i} className="flex items-center space-x-4">
                               <Skeleton className="h-10 w-10 rounded-full" />
                               <div className="space-y-2">
                                   <Skeleton className="h-4 w-[150px]" />
                                   <Skeleton className="h-4 w-[100px]" />
                               </div>
                           </div>
                        ))}
                    </div>
                ) : error ? (
                    <p className="text-destructive text-center">{error}</p>
                ) : recommendations.length > 0 ? (
                    <div className="space-y-3">
                        {recommendations.map(user => <CandidateCard key={user.id} user={user} />)}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-center">Tidak ada rekomendasi yang cocok saat ini.</p>
                )}
                 <Button onClick={fetchRecommendations} disabled={isLoading} className="mt-4 w-full" variant="ghost">
                    {isLoading ? 'Memuat...' : 'Muat Ulang Rekomendasi'}
                </Button>
            </div>
        </AccordionContent>
        </AccordionItem>
    );
};


const JobPostCard = ({ job }: { job: Job }) => (
    <Card className="overflow-hidden">
        <CardHeader>
            <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="font-headline">{job.title}</CardTitle>
                    <CardDescription>{job.company.name}</CardDescription>
                </div>
                <Badge variant={job.status === 'Aktif' ? 'default' : 'secondary'} className={job.status === 'Aktif' ? 'bg-green-600' : ''}>
                    {job.status}
                </Badge>
            </div>
        </CardHeader>
        <CardContent>
             <div className="flex items-center text-sm text-muted-foreground space-x-4">
                <div className="flex items-center gap-1"><Users className="w-4 h-4" /><span>15 Pelamar</span></div>
                <div className="flex items-center gap-1"><UserCheck className="w-4 h-4" /><span>3 Diterima</span></div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4" /><span>{job.type}</span></div>
            </div>
        </CardContent>
        <CardFooter className="bg-muted/50 p-0">
             <Accordion type="single" collapsible className="w-full">
                <AIRecommendations job={job} />
            </Accordion>
        </CardFooter>
    </Card>
);

const PostJobDialog = () => (
    <Dialog>
        <DialogTrigger asChild>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Buat Lowongan Baru
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
                <DialogTitle>Buat Lowongan Baru</DialogTitle>
                <DialogDescription>
                    Isi detail pekerjaan untuk menemukan kandidat yang tepat.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">Judul</Label>
                    <Input id="title" defaultValue="Kasir Toko" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">Deskripsi</Label>
                    <Textarea id="description" placeholder="Deskripsi pekerjaan..." className="col-span-3" />
                </div>
                 <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="salary" className="text-right">Gaji (Rp)</Label>
                    <Input id="salary" type="number" defaultValue="2500000" className="col-span-3" />
                </div>
            </div>
            <DialogFooter>
                <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Publikasikan Lowongan</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
)

export default function MyJobsPage() {
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold font-headline flex items-center gap-2"><Briefcase />Lowongan Anda</h2>
                    <p className="text-muted-foreground">Kelola dan lihat status lowongan yang telah Anda publikasikan.</p>
                </div>
                <PostJobDialog />
            </div>

            <div className="space-y-6">
                {mockJobs.filter(j => j.company.id === 'comp-1').map(job => (
                    <JobPostCard key={job.id} job={job} />
                ))}
            </div>
        </div>
    );
}
