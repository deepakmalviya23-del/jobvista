import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { MapPin, Briefcase, Clock } from 'lucide-react';
import { toast } from 'sonner';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const { API } = useContext(AuthContext);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (error) {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase()) ||
    job.company.toLowerCase().includes(search.toLowerCase()) ||
    job.location.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return <div className="text-center py-20">Loading jobs...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <h1 className="text-4xl font-bold mb-4 md:mb-0">Available Jobs</h1>
        
        <div className="w-full md:w-96">
          <Input
            placeholder="Search by job title, company or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="text-lg"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredJobs.length === 0 ? (
          <p className="col-span-3 text-center text-gray-500 py-10">No jobs found matching your search.</p>
        ) : (
          filteredJobs.map((job) => (
            <Card key={job._id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl">{job.title}</CardTitle>
                <p className="text-blue-600 font-medium">{job.company}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin size={18} />
                  <span>{job.location}</span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Briefcase size={18} />
                  <span className="capitalize">{job.jobType}</span>
                </div>

                {job.salary && (
                  <div className="text-green-600 font-semibold">
                    ₹{job.salary.toLocaleString()} / year
                  </div>
                )}

                <Link to={`/jobs/${job._id}`}>
                  <Button className="w-full mt-4">View Details & Apply</Button>
                </Link>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;