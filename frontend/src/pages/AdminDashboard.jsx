import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, FileText, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const { user, API } = useContext(AuthContext);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    totalApplications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'admin') {
      fetchDashboardData();
    }
  }, [user]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [usersRes, jobsRes, appsRes] = await Promise.all([
        API.get('/admin/users/count'),
        API.get('/admin/jobs/count'),
        API.get('/admin/applications/count')
      ]);

      setStats({
        totalUsers: usersRes.data.count || 0,
        totalJobs: jobsRes.data.count || 0,
        totalApplications: appsRes.data.count || 0
      });
    } catch (error) {
      console.error("Dashboard fetch error:", error);
      toast.error("Failed to load real data. Showing fallback numbers.");

      // Fallback in case of error
      setStats({
        totalUsers: 156,
        totalJobs: 94,
        totalApplications: 378
      });
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return <div className="text-center py-20 text-red-600">Access Denied. Admin only.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Platform Overview • JobVista</p>
        </div>
        <Button onClick={fetchDashboardData} variant="outline" className="flex items-center gap-2">
          <RefreshCw size={18} />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Users</CardTitle>
            <Users className="h-9 w-9 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold text-blue-600">
              {loading ? "..." : stats.totalUsers}
            </div>
            <p className="text-sm text-gray-500 mt-3">Registered on platform</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Total Jobs</CardTitle>
            <Briefcase className="h-9 w-9 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold text-green-600">
              {loading ? "..." : stats.totalJobs}
            </div>
            <p className="text-sm text-gray-500 mt-3">Jobs posted by employers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Applications</CardTitle>
            <FileText className="h-9 w-9 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-6xl font-bold text-purple-600">
              {loading ? "..." : stats.totalApplications}
            </div>
            <p className="text-sm text-gray-500 mt-3">Total applications received</p>
          </CardContent>
        </Card>
      </div>

      {/* Future Enhancement Note */}
      <div className="mt-12 text-center text-gray-500 text-sm">
        More features like User Management, Job Approval, and Analytics will be added soon.
      </div>
    </div>
  );
};

export default AdminDashboard;