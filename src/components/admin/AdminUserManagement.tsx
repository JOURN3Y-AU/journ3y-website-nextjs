'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { supabase } from '@/lib/supabase/client'
import { useToast } from '@/hooks/use-toast';
import { User, UserPlus, Trash2, AlertCircle, InfoIcon } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface AdminUserManagementProps {
  onLogout: () => void;
}

type AdminUser = {
  id: string;
  email: string;
  created_at: string;
};

export default function AdminUserManagement({ onLogout }: AdminUserManagementProps) {
  const router = useRouter()
  const { toast } = useToast();
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        // At least show the current user if we can't list all users
        setUsers([{
          id: user.id,
          email: user.email || 'No email',
          created_at: new Date(user.created_at || '').toLocaleDateString()
        }]);
      }
      
      setError("Note: Admin API access is limited. Only your own user is displayed.");
    } catch (error: any) {
      console.error('Error fetching current user:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
      setError("Failed to load user data");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateUser = async () => {
    if (!newUserEmail || !newUserPassword) {
      toast({
        title: "Error",
        description: "Email and password are required",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: newUserEmail,
        password: newUserPassword,
        options: {
          emailRedirectTo: window.location.origin + '/admin'
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Success",
        description: "Admin user created successfully. Please ask them to check their email for verification.",
      });
      
      setIsDialogOpen(false);
      setNewUserEmail('');
      setNewUserPassword('');
      
      // Add the new user to the list if created successfully
      if (data.user) {
        setUsers([...users, {
          id: data.user.id,
          email: data.user.email || 'No email',
          created_at: new Date().toLocaleDateString()
        }]);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create user",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // This function won't work without admin privileges, but we'll keep a simplified version
  const handleDeleteUser = async (userId: string) => {
    const currentUser = await supabase.auth.getUser();
    
    if (currentUser.data.user?.id === userId) {
      toast({
        title: "Error",
        description: "You cannot delete your own account while logged in",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Information",
      description: "Admin API access is required to delete users. This feature is limited.",
    });
  };

  return (
    <div className="container mx-auto py-10 px-4 mt-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">Admin User Management</h1>
        <div className="flex flex-wrap gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="default" onClick={() => setIsDialogOpen(true)}>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Admin User
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new admin user with full access</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <Button variant="outline" onClick={() => router.push('/admin')}>
            Back
          </Button>
          <Button variant="outline" onClick={onLogout}>
            Logout
          </Button>
        </div>
      </div>
      
      <Alert className="mb-6 bg-blue-50 border-blue-200">
        <InfoIcon className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">Adding Admin Users</AlertTitle>
        <AlertDescription className="text-blue-700">
          You can add new admin users by clicking the "Add Admin User" button. New users will need to verify their email
          before they can log in. All admins have full access to the blog management system.
        </AlertDescription>
      </Alert>
      
      {error && (
        <Alert className="mb-6 bg-yellow-50 border-yellow-200">
          <AlertCircle className="h-4 w-4 text-yellow-600" />
          <AlertTitle className="text-yellow-800">Limited Access</AlertTitle>
          <AlertDescription className="text-yellow-700">
            {error}
          </AlertDescription>
        </Alert>
      )}
      
      {isLoading ? (
        <div className="text-center py-10">Loading users...</div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" />
            Admin Users
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-4">
                    No admin users found
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.created_at}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Admin User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={newUserEmail}
                onChange={(e) => setNewUserEmail(e.target.value)}
                placeholder="admin@example.com"
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={newUserPassword}
                onChange={(e) => setNewUserPassword(e.target.value)}
                placeholder="Secure password"
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                Password should be at least 6 characters long
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isLoading}>
              Cancel
            </Button>
            <Button onClick={handleCreateUser} disabled={isLoading}>
              {isLoading ? "Creating..." : "Create Admin User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
