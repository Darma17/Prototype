
'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, UserCheck, ShieldCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    const { toast } = useToast();

    const handleVerification = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: "Proses Verifikasi Dikirim",
            description: "Data Anda sedang kami periksa. Anda akan menerima notifikasi jika sudah selesai.",
        });
    }

    return (
        <div className="flex flex-col gap-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <Avatar className="h-20 w-20 border-2 border-primary">
                            <AvatarImage src="https://picsum.photos/seed/avatar/100/100" alt="User Avatar" />
                            <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                            <CardTitle className="text-2xl font-headline">Nama Pengguna</CardTitle>
                            <CardDescription>pengguna@example.com</CardDescription>
                            <div className="mt-2 flex gap-2">
                                <Badge variant="secondary">Pencari Kerja Harian</Badge>
                                <Badge variant="default" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                                    <UserCheck className="mr-1 h-3 w-3" />
                                    Terverifikasi
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardHeader>
            </Card>

            <Separator />

            <Card>
                <form onSubmit={handleVerification}>
                    <CardHeader>
                        <div className="flex items-center gap-2">
                            <ShieldCheck className="h-6 w-6 text-primary"/>
                            <CardTitle className="font-headline">Verifikasi Identitas (KTP)</CardTitle>
                        </div>
                        <CardDescription>
                            Verifikasi identitas Anda untuk meningkatkan kepercayaan dan membuka semua fitur.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="nik">Nomor Induk Kependudukan (NIK)</Label>
                            <Input id="nik" placeholder="Masukkan 16 digit NIK Anda" type="text" maxLength={16} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="full-name">Nama Lengkap (sesuai KTP)</Label>
                            <Input id="full-name" placeholder="Masukkan nama lengkap Anda" type="text" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ktp-upload">Unggah Foto KTP</Label>
                             <div className="flex items-center justify-center w-full">
                                <label htmlFor="ktp-upload" className="flex flex-col items-center justify-center w-full h-32 border-2 border-border border-dashed rounded-lg cursor-pointer bg-card hover:bg-muted/50">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <UploadCloud className="w-8 h-8 mb-4 text-muted-foreground" />
                                        <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">Klik untuk mengunggah</span> atau seret file</p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG, atau JPEG (MAX. 5MB)</p>
                                    </div>
                                    <Input id="ktp-upload" type="file" className="hidden" />
                                </label>
                            </div> 
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground">Kirim Verifikasi</Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
