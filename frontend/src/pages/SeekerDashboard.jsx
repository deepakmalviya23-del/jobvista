import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const SeekerDashboard = () => {
  const { user, API } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.role === 'seeker') {
      fetchApplications();
    }
  }, [user]);

  const fetchApplications = async () => {
    try {
      const res = await API.get('/applications/my-applications');
      setApplications(res.data);
    } catch (error) {
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'seeker') {
    return <div className="text-center py-20 text-red-600">Access Denied. This page is for Job Seekers only.</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">My Dashboard</h1>

      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>My Applications ({applications.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p>Loading your applications...</p>
            ) : applications.length === 0 ? (
              <p className="text-gray-500">You haven't applied to any jobs yet.</p>
            ) : (
              <div className="space-y-6">
                {applications.map((app) => (
                  <div key={app._id} className="border rounded-lg p-6 flex flex-col md:flex-row justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{app.job?.title}</h3>
                      <p className="text-blue-600">{app.job?.company}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        Applied on: {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium capitalize
                        ${app.status === 'applied' ? 'bg-blue-100 text-blue-700' : ''}
                        ${app.status === 'reviewed' ? 'bg-yellow-100 text-yellow-700' : ''}
                        ${app.status === 'interview' ? 'bg-green-100 text-green-700' : ''}
                        ${app.status === 'rejected' ? 'bg-red-100 text-red-700' : ''}`}>
                        {app.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SeekerDashboard;