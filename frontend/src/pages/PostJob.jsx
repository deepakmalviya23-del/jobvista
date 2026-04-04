import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const PostJob = () => {
  const { user, API } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    salary: '',
    jobType: 'full-time',
    experienceLevel: '',
    description: '',
    requirements: ''
  });

  const [loading, setLoading] = useState(false);

  // Redirect if not employer
  if (user && user.role !== 'employer') {
    return <div className="text-center py-20">Only employers can post jobs.</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleJobTypeChange = (value) => {
    setFormData({ ...formData, jobType: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const requirementsArray = formData.requirements
        .split('\n')
        .filter(req => req.trim() !== '');

      await API.post('/jobs', {
        ...formData,
        salary: formData.salary ? Number(formData.salary) : null,
        requirements: requirementsArray
      });

      toast.success('Job posted successfully!');
      navigate('/jobs');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl text-center">Post a New Job</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Job Title</Label>
                <Input
                  name="title"
                  placeholder="Senior React Developer"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Company Name</Label>
                <Input
                  name="company"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input
                  name="location"
                  placeholder="Bangalore, Remote"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Salary (per year)</Label>
                <Input
                  name="salary"
                  type="number"
                  placeholder="1200000"
                  value={formData.salary}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Job Type</Label>
              <Select value={formData.jobType} onValueChange={handleJobTypeChange}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full Time</SelectItem>
                  <SelectItem value="part-time">Part Time</SelectItem>
                  <SelectItem value="remote">Remote</SelectItem>
                  <SelectItem value="hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Experience Level</Label>
              <Input
                name="experienceLevel"
                placeholder="2-5 years"
                value={formData.experienceLevel}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Job Description</Label>
              <Textarea
                name="description"
                rows={6}
                placeholder="Write detailed job description..."
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Requirements (one per line)</Label>
              <Textarea
                name="requirements"
                rows={5}
                placeholder="• React.js\n• Node.js\n• 3+ years experience"
                value={formData.requirements}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Posting Job...' : 'Post Job'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostJob;