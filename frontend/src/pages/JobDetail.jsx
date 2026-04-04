import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Briefcase, Calendar, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

const JobDetail = () => {
  const { id } = useParams();
  const { user, API } = useContext(AuthContext);
  const navigate = useNavigate();

  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchJob();
  }, [id]);

  const fetchJob = async () => {
    try {
      const res = await API.get(`/jobs/${id}`);
      setJob(res.data);
    } catch (error) {
      toast.error('Job not found');
      navigate('/jobs');
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }
    if (user.role !== 'seeker') {
      toast.error('Only Job Seekers can apply');
      return;
    }

    setApplying(true);

    const formData = new FormData();
    formData.append('jobId', id);
    if (resume) formData.append('resume', resume);

    try {
      await API.post('/applications/apply', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      toast.success('Application submitted successfully!');
      setResume(null);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to apply');
    } finally {
      setApplying(false);
    }
  };

  if (loading) return <div className="text-center py-20">Loading job details...</div>;
  if (!job) return <div>Job not found</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl">{job.title}</CardTitle>
          <p className="text-2xl text-blue-600 font-semibold">{job.company}</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center gap-3">
              <MapPin className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{job.location}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Briefcase className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Job Type</p>
                <p className="font-medium capitalize">{job.jobType}</p>
              </div>
            </div>

            {job.salary && (
              <div className="flex items-center gap-3">
                <DollarSign className="text-gray-500" />
                <div>
                  <p className="text-sm text-gray-500">Salary</p>
                  <p className="font-medium">₹{job.salary.toLocaleString()}</p>
                </div>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Calendar className="text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Posted</p>
                <p className="font-medium">{new Date(job.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-3">Job Description</h3>
            <p className="text-gray-700 whitespace-pre-line">{job.description}</p>
          </div>

          {job.requirements && job.requirements.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-3">Requirements</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                {job.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Apply Section */}
      {user?.role === 'seeker' && (
        <Card>
          <CardHeader>
            <CardTitle>Apply for this Job</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleApply} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Upload Resume (PDF)
                </label>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={(e) => setResume(e.target.files[0])}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                <p className="text-xs text-gray-500 mt-1">Only PDF files are allowed</p>
              </div>

              <Button type="submit" className="w-full" disabled={applying || !resume}>
                {applying ? 'Submitting Application...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {!user && (
        <div className="text-center mt-8">
          <p className="text-gray-600 mb-4">Please login as a Job Seeker to apply</p>
          <Button onClick={() => navigate('/login')}>Login to Apply</Button>
        </div>
      )}
    </div>
  );
};

export default JobDetail;