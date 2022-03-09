import './App.css'
import { graphql, useQueryLoader, RelayEnvironmentProvider } from 'react-relay'
import { Environment, Store, RecordSource, Network } from 'relay-runtime'
import People from './People'

async function fetchQuery(operation, variables) {
  const response = await fetch('http://localhost:4000/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables
    })
  })

  return response.json()
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
})

const appQuery = graphql`
  query AppQuery {
    allPersons {
      name
      phone
    }
  }
`

function App() {

  const [queyData, load] = useQueryLoader(appQuery)

  // if (!queyData) return <div>Loading.....</div>

  return (
    <div className="App">
      <RelayEnvironmentProvider environment={environment}>
        <People appQuery={appQuery} appQueryRef={queyData} />
      </RelayEnvironmentProvider>
    </div>
  );
}

export default App;
