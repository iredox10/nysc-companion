'use client';

import { useState, useEffect } from 'react';
// import { account, databases } from '@/lib/appwrite';
import { useRouter } from 'next/navigation';
import { Models } from 'appwrite';
import { mockUser, mockStates, mockLgas } from '@/data/mock';

const ProfileSetupPage = () => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(mockUser);
  const [deploymentStateId, setDeploymentStateId] = useState('');
  const [deploymentLgaId, setDeploymentLgaId] = useState('');
  const [filteredLgas, setFilteredLgas] = useState<{ $id: string; name: string; }[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Mock user fetching
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  useEffect(() => {
    if (deploymentStateId) {
      setFilteredLgas(mockLgas.filter(lga => lga.stateId === deploymentStateId));
      setDeploymentLgaId('');
    } else {
      setFilteredLgas([]);
    }
  }, [deploymentStateId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    console.log('Saving profile with:', {
      userId: user.$id,
      name: user.name,
      deploymentStateId,
      deploymentLgaId,
    });
    
    // Redirect to the main corper page after setup
    router.push('/corper');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Setup Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
              Deployment State
            </label>
            <select
              id="state"
              value={deploymentStateId}
              onChange={(e) => setDeploymentStateId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            >
              <option value="">Select State</option>
              {mockStates.map(state => (
                <option key={state.$id} value={state.$id}>{state.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lga">
              Deployment LGA
            </label>
            <select
              id="lga"
              value={deploymentLgaId}
              onChange={(e) => setDeploymentLgaId(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              disabled={!deploymentStateId}
            >
              <option value="">Select LGA</option>
              {filteredLgas.map(lga => (
                <option key={lga.$id} value={lga.$id}>{lga.name}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetupPage;
