import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
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
  const [pinVerified, setPinVerified] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

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
      toast.success("PIN verified successfully");
    } else {
      setPinError("Incorrect PIN. Please try again.");
      setPinInput("");
    }
  };
  const { data: submissions, isLoading, refetch } = trpc.submissions.list.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });
  const { data: trashedSubmissions, isLoading: isLoadingTrashed, refetch: refetchTrashed } = trpc.submissions.listTrashed.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const updateStatus = trpc.submissions.updateStatus.useMutation({
    onSuccess: () => {
      toast.success("Status updated successfully");
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to update status: " + error.message);
    },
  });

  const deleteSubmission = trpc.submissions.delete.useMutation({
    onSuccess: () => {
      toast.success("Submission moved to trash");
      refetch();
    },
    onError: (error) => {
      toast.error("Failed to delete: " + error.message);
    },
  });

  const restoreSubmission = trpc.submissions.restore.useMutation({
    onSuccess: () => {
      toast.success("Submission restored");
      refetch();
      refetchTrashed();
    },
    onError: (error) => {
      toast.error("Failed to restore: " + error.message);
    },
  });

  const permanentlyDelete = trpc.submissions.permanentlyDelete.useMutation({
    onSuccess: () => {
      toast.success("Submission permanently deleted");
      refetchTrashed();
    },
    onError: (error) => {
      toast.error("Failed to permanently delete: " + error.message);
    },
  });

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
                <h1 className="text-2xl font-bold text-yellow-400">Divalaser Software Solutions</h1>
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
                <h1 className="text-2xl font-bold text-yellow-400">Divalaser Software Solutions</h1>
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
            <DialogTitle>Administrator PIN Required</DialogTitle>
            <DialogDescription>
              Please enter the administrator PIN to access the dashboard.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <Input
                type="password"
                placeholder="Enter PIN"
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
              Verify PIN
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
              <h1 className="text-2xl font-bold text-yellow-400">Divalaser Software Solutions</h1>
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
            <span className="text-sm text-yellow-300">Welcome, {user.name}</span>
            <Button variant="outline" size="sm" className="bg-yellow-400 text-black hover:bg-yellow-500 border-yellow-400" onClick={() => logout()}>Logout</Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Church Website Submissions</h2>
            <p className="text-gray-600 mt-1">Manage and track all website requests</p>
          </div>
          <Link href="/">
            <Button variant="outline">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Public Site
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="active" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="active">Active Submissions</TabsTrigger>
            <TabsTrigger value="trash">Trash ({trashedSubmissions?.length || 0})</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            {isLoading ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : submissions && submissions.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Church Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {submissions.map((submission) => (
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
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="in_progress">In Progress</SelectItem>
                                <SelectItem value="completed">Completed</SelectItem>
                                <SelectItem value="cancelled">Cancelled</SelectItem>
                              </SelectContent>
                            </Select>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteSubmission.mutate({ id: submission.id })}
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
                <p className="text-gray-600 text-lg">No submissions yet</p>
                <p className="text-gray-500 mt-2">New website requests will appear here</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="trash">
            {isLoadingTrashed ? (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              </div>
            ) : trashedSubmissions && trashedSubmissions.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Church Name</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Deleted</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trashedSubmissions.map((submission) => (
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
                              Restore
                            </Button>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                if (confirm('Are you sure you want to permanently delete this submission? This action cannot be undone.')) {
                                  permanentlyDelete.mutate({ id: submission.id });
                                }
                              }}
                              disabled={permanentlyDelete.isPending}
                            >
                              Delete Forever
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
                <p className="text-gray-600 text-lg">Trash is empty</p>
                <p className="text-gray-500 mt-2">Deleted submissions will appear here</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
    </div>
    </>
  );
}

