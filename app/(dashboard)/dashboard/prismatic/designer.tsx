import prismatic from '@prismatic-io/embedded'
import { useEffect } from 'react'

const id = 'my-embedded-builder-div'

/**
 * Get an integration's ID given its name
 */
async function getIntegrationId(integrationName: string) {
  const query = `query getMyIntegration($integrationName: String!) {
  integrations(name: $integrationName) {
    nodes {
      id
      name
    }
  }
}`

  const variables = { integrationName }
  const result = await prismatic.graphqlRequest({ query, variables })
  return result.data.integrations.nodes?.[0].id
}

const INTEGRATION_ID = 'SW50ZWdyYXRpb246ZmRjNGExOTEtNGIxOC00MTJhLTk3OWYtYjUxZWZjYzE2MmJj'

function EmbeddedDesigner() {
  useEffect(() => {
    const showDesigner = async () => {
      const integrationId = INTEGRATION_ID
      prismatic.showDesigner({
        selector: `#${id}`,
        integrationId,
        theme: 'LIGHT',
      })
    }
    showDesigner()
  }, [])

  return <div id={id}>Loading...</div>
}

export default EmbeddedDesigner
