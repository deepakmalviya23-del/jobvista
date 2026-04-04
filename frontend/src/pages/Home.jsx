import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Users, TrendingUp } from 'lucide-react';

const Home = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="text-center py-16 bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-3xl mb-16">
        <h1 className="text-5xl font-bold mb-6">
          Find Your Dream Job Today
        </h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Connect with top companies and opportunities. 
          Thousands of jobs are waiting for you.
        </p>
        <Link to="/jobs">
          <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100 text-lg px-8">
            Browse Jobs
          </Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <Card>
          <CardContent className="pt-8 text-center">
            <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <Briefcase className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Many Jobs</h3>
            <p className="text-gray-600">Find opportunities across different industries</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-8 text-center">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Users className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">For Everyone</h3>
            <p className="text-gray-600">Job Seekers, Employers & Admin</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-8 text-center">
            <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Easy Apply</h3>
            <p className="text-gray-600">Apply with one click</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Home;