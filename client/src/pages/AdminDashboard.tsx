import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { APP_TITLE, getLoginUrl } from "@/const";
import { trpc } from "@/lib/trpc";
import { Church, Loader2, ExternalLink } from "lucide-react";
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

export default function AdminDashboard() {
  const { user, loading, isAuthenticated, logout } = useAuth();
  const { data: submissions, isLoading, refetch } = trpc.submissions.list.useQuery(undefined, {
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
        <header className="border-b bg-white shadow-sm">
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
                <h1 className="text-2xl font-bold text-blue-900">Divalaser Software Solutions</h1>
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
        <header className="border-b bg-white shadow-sm">
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
                <h1 className="text-2xl font-bold text-blue-900">Divalaser Software Solutions</h1>
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
              <Button variant="outline" size="sm" onClick={() => logout()}>Logout</Button>
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="border-b bg-white shadow-sm sticky top-0 z-10">
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
              <h1 className="text-2xl font-bold text-blue-900">Divalaser Software Solutions</h1>
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
            <span className="text-sm text-gray-600">Welcome, {user.name}</span>
            <Button variant="outline" size="sm" onClick={() => logout()}>Logout</Button>
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
      </main>
    </div>
  );
}

