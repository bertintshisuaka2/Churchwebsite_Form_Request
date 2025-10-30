import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Church, Loader2, ExternalLink, Trash2 } from "lucide-react";
import { Link } from "wouter";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const ADMIN_PIN = "3495";
const PIN_STORAGE_KEY = "admin_pin_verified";

export default function AdminDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const { t } = useLanguage();
  const [pinVerified, setPinVerified] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");
  
  // Delete confirmation states
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [permanentDeleteDialogOpen, setPermanentDeleteDialogOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);
  const [deletePinInput, setDeletePinInput] = useState("");
  const [deletePinError, setDeletePinError] = useState("");
  
  // Date range filter state
  const [dateRange, setDateRange] = useState<string>("all");
  const [customStartDate, setCustomStartDate] = useState<string>("");
  const [customEndDate, setCustomEndDate] = useState<string>("");

  useEffect(() => {
    // Check if PIN was previously verified in this session
    const verified = sessionStorage.getItem(PIN_STORAGE_KEY);
    if (verified === "true") {
      setPinVerified(true);
    }
  }, []);

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setPinVerified(true);
      sessionStorage.setItem(PIN_STORAGE_KEY, "true");
      setPinError("");
      toast.success(t('pinVerified'));
    } else {
      setPinError(t('incorrectPin'));
      setPinInput("");
    }
  };
  const { data: submissions, isLoading, refetch } = trpc.submissions.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });
  const { data: trashedSubmissions, isLoading: isLoadingTrashed, refetch: refetchTrashed } = trpc.submissions.listTrashed.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });
  
  // Filter submissions by date range
  const filterByDateRange = (items: any[] | undefined) => {
    if (!items) return [];
    
    const now = new Date();
    let startDate: Date | null = null;
    
    switch (dateRange) {
      case 'today':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        break;
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      case 'custom':
        if (customStartDate && customEndDate) {
          const start = new Date(customStartDate);
          const end = new Date(customEndDate);
          end.setHours(23, 59, 59, 999);
          return items.filter(item => {
            const itemDate = new Date(item.createdAt);
            return itemDate >= start && itemDate <= end;
          });
        }
        return items;
      case 'all':
      default:
        return items;
    }
    
    if (startDate) {
      return items.filter(item => new Date(item.createdAt) >= startDate!);
    }
    
    return items;
  };
  
  const filteredSubmissions = filterByDateRange(submissions);
  const filteredTrashedSubmissions = filterByDateRange(trashedSubmissions);

  const updateStatus = trpc.submissions.updateStatus.useMutation({
    onSuccess: () => {
      toast.success(t('statusUpdated'));
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to update status: " + error.message);
    },
  });

  const deleteSubmission = trpc.submissions.delete.useMutation({
    onSuccess: () => {
      toast.success(t('movedToTrash'));
      refetch();
      setDeleteDialogOpen(false);
      setSelectedSubmission(null);
      setDeletePinInput("");
      setDeletePinError("");
    },
    onError: (error) => {
      toast.error("Failed to delete: " + error.message);
      setDeletePinError("Failed to delete");
    },
  });
  
  const handleDeleteClick = (submission: any) => {
    setSelectedSubmission(submission);
    setDeleteDialogOpen(true);
    setDeletePinInput("");
    setDeletePinError("");
  };
  
  const handleConfirmDelete = () => {
    if (deletePinInput !== ADMIN_PIN) {
      setDeletePinError(t('incorrectPin'));
      return;
    }
    deleteSubmission.mutate({ id: selectedSubmission.id });
  };

  const restoreSubmission = trpc.submissions.restore.useMutation({
    onSuccess: () => {
      toast.success(t('restored'));
      refetch();
      refetchTrashed();
    },
    onError: (error) => {
      toast.error("Failed to restore: " + error.message);
    },
  });

  const permanentlyDelete = trpc.submissions.permanentlyDelete.useMutation({
    onSuccess: () => {
      toast.success(t('permanentlyDeleted'));
      refetchTrashed();
      setPermanentDeleteDialogOpen(false);
      setSelectedSubmission(null);
      setDeletePinInput("");
      setDeletePinError("");
    },
    onError: (error) => {
      toast.error("Failed to permanently delete: " + error.message);
      setDeletePinError("Failed to permanently delete");
    },
  });
  
  const handlePermanentDeleteClick = (submission: any) => {
    setSelectedSubmission(submission);
    setPermanentDeleteDialogOpen(true);
    setDeletePinInput("");
    setDeletePinError("");
  };
  
  const handleConfirmPermanentDelete = () => {
    if (deletePinInput !== ADMIN_PIN) {
      setDeletePinError(t('incorrectPin'));
      return;
    }
    permanentlyDelete.mutate({ id: selectedSubmission.id });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-black shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-8">
              {/* University of Phoenix Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="/university-of-phoenix-logo.png" 
                  alt="University of Phoenix" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              
              {/* Center Content */}
              <div className="flex-1 text-center">
                <h1 className="text-2xl font-bold text-yellow-400">{t('companyName')}</h1>
              </div>
              
              {/* Georgia Tech Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="/georgia-tech-logo.png" 
                  alt="Georgia Tech" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">Admin Login Required</h2>
            <p className="text-gray-600">Please log in to access the admin dashboard.</p>
            <a href={getLoginUrl()}>
              <Button size="lg" className="w-full">Login</Button>
            </a>
            <Link href="/">
              <Button variant="outline" className="w-full">Back to Home</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  if (user?.role !== 'admin') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
        <header className="bg-black shadow-lg">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-8">
              {/* University of Phoenix Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="/university-of-phoenix-logo.png" 
                  alt="University of Phoenix" 
                  className="h-12 w-auto object-contain"
                />
              </div>
              
              {/* Center Content */}
              <div className="flex-1 text-center">
                <h1 className="text-2xl font-bold text-yellow-400">{t('companyName')}</h1>
              </div>
              
              {/* Georgia Tech Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="/georgia-tech-logo.png" 
                  alt="Georgia Tech" 
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
            <div className="flex justify-end mt-2">
              <Button variant="outline" size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500 border-yellow-400" onClick={() => logout()}>Logout</Button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center space-y-6 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900">Access Denied</h2>
            <p className="text-gray-600">You do not have permission to access the admin dashboard.</p>
            <Link href="/">
              <Button className="w-full">Back to Home</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      pending: "secondary",
      in_progress: "default",
      completed: "outline",
      cancelled: "destructive",
    };
    return <Badge variant={variants[status] || "default"}>{status.replace('_', ' ')}</Badge>;
  };

  return (
    <>
      {/* PIN Verification Dialog */}
      <Dialog open={!pinVerified} onOpenChange={() => {}}>
        <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()} onEscapeKeyDown={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>{t('pinTitle')}</DialogTitle>
            <DialogDescription>
              {t('pinDescription')}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder={t('enterPin')}
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError("");
                }}
                maxLength={4}
                className="text-center text-2xl tracking-widest"
                autoFocus
              />
              {pinError && (
                <p className="text-sm text-red-600 mt-2">{pinError}</p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={pinInput.length !== 4}>
              {t('verifyPin')}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="bg-black shadow-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* University of Phoenix Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/university-of-phoenix-logo.png" 
                alt="University of Phoenix" 
                className="h-12 w-auto object-contain"
              />
            </div>
            
            {/* Center Content */}
            <div className="flex-1 text-center">
              <h1 className="text-2xl font-bold text-yellow-400">{t('companyName')}</h1>
            </div>
            
            {/* Georgia Tech Logo */}
            <div className="flex-shrink-0">
              <img 
                src="/georgia-tech-logo.png" 
                alt="Georgia Tech" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
          <div className="flex justify-end items-center gap-4 mt-2">
            <LanguageSwitcher />
            <span className="text-sm text-yellow-300">{t('welcome')}, {user.name}</span>
            <Button variant="outline" size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500 border-yellow-400" onClick={() => logout()}>{t('logout')}</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">{t('churchWebsiteSubmissions')}</h2>
            <p className="text-gray-600 mt-1">{t('manageTrack')}</p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('viewPublicSite')}
            </Button>
          </Link>
        </div>
        
        {/* Date Range Filter */}
        <div className="bg-white rounded-lg shadow-md border border-gray-100 p-4 mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">{t('dateRange')}:</label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('allTime')}</SelectItem>
                  <SelectItem value="today">{t('today')}</SelectItem>
                  <SelectItem value="week">{t('thisWeek')}</SelectItem>
                  <SelectItem value="month">{t('thisMonth')}</SelectItem>
                  <SelectItem value="year">{t('thisYear')}</SelectItem>
                  <SelectItem value="custom">{t('custom')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {dateRange === 'custom' && (
              <>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">{t('from')}:</label>
                  <Input
                    type="date"
                    value={customStartDate}
                    onChange={(e) => setCustomStartDate(e.target.value)}
                    className="w-[150px]"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-sm font-medium text-gray-700">{t('to')}:</label>
                  <Input
                    type="date"
                    value={customEndDate}
                    onChange={(e) => setCustomEndDate(e.target.value)}
                    className="w-[150px]"
                  />
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('totalSubmissions')}</p>
                <p className="text-3xl font-bold text-blue-600 mt-2">{filteredSubmissions.length}</p>
              </div>
              <div className="bg-blue-100 rounded-full p-3">
                <Church className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('deletedFiles')}</p>
                <p className="text-3xl font-bold text-red-600 mt-2">{filteredTrashedSubmissions.length}</p>
              </div>
              <div className="bg-red-100 rounded-full p-3">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-md border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{t('totalFiles')}</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{filteredSubmissions.length + filteredTrashedSubmissions.length}</p>
              </div>
              <div className="bg-green-100 rounded-full p-3">
                <Church className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">{t('activeSubmissions')}</TabsTrigger>
            <TabsTrigger value="trash">{t('trash')} ({trashedSubmissions?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filteredSubmissions.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('churchName')}</TableHead>
                      <TableHead>{t('contact')}</TableHead>
                      <TableHead>{t('location')}</TableHead>
                      <TableHead>{t('submitted')}</TableHead>
                      <TableHead>{t('status')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubmissions.map((submission) => (
                      <TableRow key={submission.id}>
                        <TableCell className="font-medium">
                          <div>
                            <div>{submission.churchName}</div>
                            {submission.denomination && (
                              <div className="text-sm text-gray-500">{submission.denomination}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{submission.contactName}</div>
                            <div className="text-gray-500">{submission.contactEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {submission.city}, {submission.state || submission.country}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {new Date(submission.createdAt).toLocaleDateString()}
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(submission.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Select
                              value={submission.status}
                              onValueChange={(value) => {
                                updateStatus.mutate({
                                  id: submission.id,
                                  status: value as "pending" | "in_progress" | "completed" | "cancelled",
                                });
                              }}
                            >
                              <SelectTrigger className="w-[140px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">{t('pending')}</SelectItem>
                                <SelectItem value="in_progress">{t('inProgress')}</SelectItem>
                                <SelectItem value="completed">{t('completed')}</SelectItem>
                                <SelectItem value="cancelled">{t('cancelled')}</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteClick(submission)}
                              disabled={deleteSubmission.isPending}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-16 text-center">
                <p className="text-gray-600 text-lg">{t('noSubmissions')}</p>
                <p className="text-gray-500 mt-2">{t('newRequests')}</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trash">
            {isLoadingTrashed ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : filteredTrashedSubmissions.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{t('churchName')}</TableHead>
                      <TableHead>{t('contact')}</TableHead>
                      <TableHead>{t('location')}</TableHead>
                      <TableHead>{t('deleted')}</TableHead>
                      <TableHead>{t('actions')}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTrashedSubmissions.map((submission) => (
                      <TableRow key={submission.id} className="opacity-60">
                        <TableCell className="font-medium">
                          <div>
                            <div>{submission.churchName}</div>
                            {submission.denomination && (
                              <div className="text-sm text-gray-500">{submission.denomination}</div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <div>{submission.contactName}</div>
                            <div className="text-gray-500">{submission.contactEmail}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {submission.city}, {submission.state || submission.country}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            {submission.deletedAt ? new Date(submission.deletedAt).toLocaleDateString() : 'N/A'}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => restoreSubmission.mutate({ id: submission.id })}
                              disabled={restoreSubmission.isPending}
                            >
                              {t('restore')}
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handlePermanentDeleteClick(submission)}
                              disabled={permanentlyDelete.isPending}
                            >
                              {t('deleteForever')}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 p-16 text-center">
                <p className="text-gray-600 text-lg">{t('trashEmpty')}</p>
                <p className="text-gray-500 mt-2">{t('deletedSubmissions')}</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      {/* Delete to Trash Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('confirmDelete')}</DialogTitle>
            <DialogDescription>
              {t('areYouSureDelete')} <strong>{selectedSubmission?.churchName}</strong>?
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('enterPinToConfirm')}</label>
              <Input
                type="password"
                maxLength={4}
                value={deletePinInput}
                onChange={(e) => {
                  setDeletePinInput(e.target.value);
                  setDeletePinError("");
                }}
                placeholder="****"
              />
              {deletePinError && (
                <p className="text-sm text-red-600">{deletePinError}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                {t('cancel')}
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={deleteSubmission.isPending}
              >
                {deleteSubmission.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('moveToTrash')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Permanent Delete Confirmation Dialog */}
      <Dialog open={permanentDeleteDialogOpen} onOpenChange={setPermanentDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('confirmPermanentDelete')}</DialogTitle>
            <DialogDescription>
              {t('areYouSurePermanentDelete')} <strong>{selectedSubmission?.churchName}</strong>? {t('cannotBeUndone')}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">{t('enterPinToConfirm')}</label>
              <Input
                type="password"
                maxLength={4}
                value={deletePinInput}
                onChange={(e) => {
                  setDeletePinInput(e.target.value);
                  setDeletePinError("");
                }}
                placeholder="****"
              />
              {deletePinError && (
                <p className="text-sm text-red-600">{deletePinError}</p>
              )}
            </div>
            <div className="flex justify-end gap-2">
              <Button 
                variant="outline" 
                onClick={() => {
                  if (deletePinInput !== ADMIN_PIN) {
                    setDeletePinError(t('incorrectPin'));
                    return;
                  }
                  restoreSubmission.mutate({ id: selectedSubmission.id });
                  setPermanentDeleteDialogOpen(false);
                  setDeletePinInput("");
                  setDeletePinError("");
                }}
                disabled={restoreSubmission.isPending}
              >
                {restoreSubmission.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('no')} - {t('restore')}
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmPermanentDelete}
                disabled={permanentlyDelete.isPending}
              >
                {permanentlyDelete.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {t('yes')} - {t('deletePermanently')}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
    </>
  );
}

