import prismatic from '@prismatic-io/embedded'
import { useEffect } from 'react'

const id = 'my-embedded-builder-div'

/**
 * Get an integration's ID given its name
 */
async function getIntegrationId(integrationName: string) {
  const query = `query getMyIntegration {
    integrations{
      nodes {
        id
        name
      }
  }
}`

  const variables = { integrationName }
  const result = await prismatic.graphqlRequest({ query, variables })
  console.log(222, result)

  if (!result.data.integrations.nodes?.length) {
    return 'null'
  }
  return result.data.integrations.nodes?.[0]?.id
}

function EmbeddedDesigner() {
  useEffect(() => {
    const showDesigner = async () => {
      const res = await fetch(`http://localhost:3000/api/prismatic`)
      const data = await res.json()
      await prismatic.authenticate({ token: data.token })

      const integrationId = await getIntegrationId('Integration 1')
      console.log(333, integrationId)
      prismatic.showDesigner({
        selector: `#${id}`,
        integrationId,
        theme: 'LIGHT',
      })
    }
    showDesigner()
  }, [])

  return (
    <div className="h-[700px] w-full" id={id}>
      Loading...
    </div>
  )
}

export default EmbeddedDesigner
