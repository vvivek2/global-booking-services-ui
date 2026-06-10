import HeaderBar from '@/components/HeaderBar';
import ServicesDashboard from '../src/components/serviceDashboard/dashboard';
import AccountMenu from '../src/components/signIn-signUp/AccountMenu';

export default function DashboardPage() {
  return (
    <div className="w-full h-full">

      <HeaderBar showAvatar={true} />

      <div className="p-4">
        <ServicesDashboard />
      </div>
    </div>
  );
}
