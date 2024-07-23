'use client'

import { useEffect } from 'react'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Heading } from '@/components/ui/heading'
import prismatic from '@prismatic-io/embedded'

import EmbeddedDesigner from './designer'

const breadcrumbItems = [
  { title: 'Dashboard', link: '/dashboard' },
  { title: 'Prismatic', link: '/dashboard/prismatic' },
]

const id = 'my-embedded-builder-div'

export default function Page() {
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:3000/api/prismatic`)
      const data = await res.json()

      await prismatic.authenticate({ token: data.token })
      prismatic.showMarketplace({ selector: '#marketplace' })
    }

    const showComponents = async () => {
      const res = await fetch(`http://localhost:3000/api/prismatic`)
      const data = await res.json()

      await prismatic.authenticate({ token: data.token })
      prismatic.showComponents({
        selector: `#builder`,
      })
    }

    prismatic.init()
    fetchData()
    showComponents()
  }, [])

  return (
    <>
      <div className="max-h-full flex-1 space-y-4 overflow-auto p-4 pt-6 md:p-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex items-start justify-between">
          <Heading title={`Prismatic`} description="Manage prismatic integrations" />
        </div>
        <h1>Prismatic</h1>
        <div className="h-[700px] w-full" id="marketplace"></div>
        <h1>Builder</h1>
        <div className="h-[700px] w-full" id={'builder'}></div>
        <h1>Designer</h1>
        <EmbeddedDesigner />
      </div>
    </>
  )
}
