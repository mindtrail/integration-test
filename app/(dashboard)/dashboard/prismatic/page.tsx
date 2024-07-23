'use client';

import { useEffect } from 'react';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { Heading } from '@/components/ui/heading';
import prismatic from '@prismatic-io/embedded';

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Prismatic', link: '/dashboard/prismatic' }
];

export default function Page() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/prismatic`);
      const data = await res.json();
      prismatic.init();
      await prismatic.authenticate({ token: data.token });
      prismatic.showMarketplace({ selector: '#marketplace' });
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading
            title={`Prismatic`}
            description="Manage prismatic integrations"
          />
        </div>
        <h1>Prismatic</h1>
        <div className="h-[800px] w-full" id="marketplace"></div>
      </div>
    </>
  );
}
