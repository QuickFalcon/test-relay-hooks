import { usePreloadedQuery } from 'react-relay'

const People = (props) => {
    const { appQuery, appQueryRef } = props
    const data = usePreloadedQuery(appQuery, appQueryRef)

    console.log(data)

    return (
        <div>
            TODO
        </div>
    )
}

export default People